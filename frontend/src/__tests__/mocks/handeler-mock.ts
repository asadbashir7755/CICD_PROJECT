// src/mocks/handlers.js
import { http, HttpResponse } from 'msw';

export const handlers = [
  // Signup endpoint
  http.post('http://localhost:8000/api/auth/email-password/signup', () => {
    return HttpResponse.json(
      {
        message: 'New user created',
        user: {
          _id: '123',
          userName: 'testuser',
          email: 'test@example.com',
          fullName: 'Test User',
        },
      },
      { status: 200 }
    );
  }),

  // Signin endpoint
  http.post('http://localhost:8000/api/auth/email-password/signin', () => {
    return HttpResponse.json(
      {
        message: 'Successfully signed in',
        user: {
          _id: '123',
          userName: 'testuser',
          email: 'test@example.com',
          fullName: 'Test User',
        },
      },
      { status: 200 }
    );
  }),

  // Get current user endpoint
  http.get('http://localhost:8000/api/auth/user', () => {
    return HttpResponse.json(
      {
        user: {
          _id: '123',
          userName: 'testuser',
          email: 'test@example.com',
          fullName: 'Test User',
        },
      },
      { status: 200 }
    );
  }),

  // Signout endpoint
  http.post('http://localhost:8000/api/auth/signout', () => {
    return HttpResponse.json(
      {
        message: 'Successfully signed out',
      },
      { status: 200 }
    );
  }),
];
