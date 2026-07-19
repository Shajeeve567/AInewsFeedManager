import { describe, it, expect, vi } from 'vitest';
import { getPersonalizedFeed } from '../../src/services/feed-service.js';
import { findByUser } from '../../src/repositories/user-preference.repository.js';
import { scoreArticleByRule } from '../../src/services/strategies/ruleBased/rule.js';
import { scoreArticleByEmbedding } from '../../src/services/strategies/embeddingBased/embedding.js';

// Mock dependencies
vi.mock('../../src/repositories/user-preference.repository.js', () => ({
  findByUser: vi.fn()
}));
vi.mock('../../src/services/strategies/ruleBased/rule.js', () => ({
  scoreArticleByRule: vi.fn()
}));
vi.mock('../../src/services/strategies/embeddingBased/embedding.js', () => ({
  scoreArticleByEmbedding: vi.fn()
}));

describe('Feed Service - getPersonalizedFeed', () => {
  it('should correctly combine and weight rule-based and embedding-based scores', async () => {
    findByUser.mockResolvedValue({});

    scoreArticleByRule.mockResolvedValue([
      { id: 1, title: 'Article 1', relevanceScore: 10 },
      { id: 2, title: 'Article 2', relevanceScore: 5 }
    ]);

    scoreArticleByEmbedding.mockResolvedValue([
      { id: 2, title: 'Article 2', embeddingScore: 20 },
      { id: 3, title: 'Article 3', embeddingScore: 10 }
    ]);

    const result = await getPersonalizedFeed('user-1', { page: 1, limit: 10 });
    
    // Calculations:
    // Article 1: Rule (10 * 0.4) = 4
    // Article 2: Rule (5 * 0.4) + Embedding (20 * 0.6) = 2 + 12 = 14
    // Article 3: Embedding (10 * 0.6) = 6
    // Order should be: Article 2, Article 3, Article 1

    expect(result.data).toHaveLength(3);
    expect(result.data[0].id).toBe(2);
    expect(result.data[0].finalScore).toBe(14);
    
    expect(result.data[1].id).toBe(3);
    expect(result.data[1].finalScore).toBe(6);
    
    expect(result.data[2].id).toBe(1);
    expect(result.data[2].finalScore).toBe(4);
  });
});
