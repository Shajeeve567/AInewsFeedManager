import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import app from '../../src/app.js';
import prisma from '../../src/database/prisma.js';
import bcrypt from 'bcryptjs';

// Mock Prisma
vi.mock('../../src/database/prisma.js', () => ({
  default: {
    user: {
      findUnique: vi.fn(),
      create: vi.fn()
    }
  }
}));

describe('Auth API Endpoints', () => {
  beforeEach(() => {
    process.env.JWT_SECRET = 'test_secret';
    vi.clearAllMocks();
  });

  it('should return 404 if user not found (missing fields or wrong email)', async () => {
    prisma.user.findUnique.mockResolvedValue(null);
    const res = await request(app).post('/api/auth/login').send({ email: 'test@example.com' });
    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe('Invalid credentials');
  });

  it('should authenticate valid user', async () => {
    const hashedPassword = await bcrypt.hash('password123', 10);
    
    // Mock prisma response
    prisma.user.findUnique.mockResolvedValue({
      id: 'mock-uuid',
      email: 'test@example.com',
      password: hashedPassword
    });

    const res = await request(app).post('/api/auth/login').send({
      email: 'test@example.com',
      password: 'password123'
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
    expect(res.body.message).toBe('Login successful!');
  });
});
