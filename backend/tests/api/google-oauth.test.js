import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import app from '../../src/app.js';
import jwt from 'jsonwebtoken';

// Mock the passport npm module directly
vi.mock('passport', () => ({
  default: {
    initialize: vi.fn(() => (req, res, next) => next()),
    use: vi.fn(),
    authenticate: vi.fn((strategy, options) => (req, res, next) => {
      // If it's the initial /google route, we usually redirect.
      // But for testing the callback, we simulate a successful login by attaching req.user.
      if (req.originalUrl === '/api/auth/google') {
        return res.redirect('https://accounts.google.com/o/oauth2/v2/auth');
      }
      
      // Simulate Google returning a user profile for the callback
      req.user = { id: 'google-user-id', email: 'test@google.com', role: 'USER' };
      next();
    })
  }
}));

describe('Google OAuth API Endpoints', () => {
  beforeEach(() => {
    process.env.JWT_SECRET = 'test_secret';
    process.env.FRONTEND_URL = 'http://localhost:3000';
    vi.clearAllMocks();
  });

  it('should redirect to Google for authentication on /api/auth/google', async () => {
    const res = await request(app).get('/api/auth/google');
    
    // Passport's default behavior (or our mock) should issue a 302 redirect
    expect(res.statusCode).toBe(302);
    expect(res.headers.location).toContain('accounts.google.com');
  });

  it('should handle the Google callback, sign a JWT, and redirect to the frontend dashboard', async () => {
    const res = await request(app).get('/api/auth/google/callback');
    
    expect(res.statusCode).toBe(302);
    
    // Check that it redirects to the frontend oauth callback page
    expect(res.headers.location).toContain('http://localhost:3000/oauth/callback?token=');
    
    // Extract the token from the redirect URL
    const token = res.headers.location.split('?token=')[1];
    expect(token).toBeDefined();
    
    // Verify the token contains the correct user payload
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    expect(decoded.userId).toBe('google-user-id');
    expect(decoded.email).toBe('test@google.com');
    expect(decoded.role).toBe('USER');
  });
});
