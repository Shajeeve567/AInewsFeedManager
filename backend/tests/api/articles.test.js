import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import app from '../../src/app.js';
import prisma from '../../src/database/prisma.js';
import { summaryQueue } from '../../src/queues/summaryQueue.js';

// Mock Prisma
vi.mock('../../src/database/prisma.js', () => ({
  default: {
    article: {
      findUnique: vi.fn(),
      findMany: vi.fn(),
      count: vi.fn()
    }
  }
}));

// Mock BullMQ queue
vi.mock('../../src/queues/summaryQueue.js', () => ({
  summaryQueue: {
    add: vi.fn()
  }
}));

describe('Articles API Endpoints', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return 404 if article not found for summarization', async () => {
    prisma.article.findUnique.mockResolvedValue(null);

    const res = await request(app).post('/api/articles/999/summarize');
    
    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe('Article not found');
  });

  it('should enqueue summarization successfully', async () => {
    prisma.article.findUnique.mockResolvedValue({
      id: 1,
      title: 'Test Article',
      summary: null
    });

    summaryQueue.add.mockResolvedValue(true);

    const res = await request(app).post('/api/articles/1/summarize');
    
    expect(res.statusCode).toBe(202);
    expect(res.body.message).toBe('Summarization queued successfully');
    expect(summaryQueue.add).toHaveBeenCalledWith('summarize-article', { articleId: 1 });
  });

  it('should return 200 if article is already summarized', async () => {
    prisma.article.findUnique.mockResolvedValue({
      id: 2,
      title: 'Summarized Article',
      summary: 'This is an existing summary.'
    });

    const res = await request(app).post('/api/articles/2/summarize');
    
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Article already summarized');
    expect(summaryQueue.add).not.toHaveBeenCalled();
  });
});
