// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Mock Next.js router
jest.mock('next/router', () => require('next-router-mock'));
jest.mock('next/navigation', () => require('next-router-mock/next-navigation'));

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => {
  if (typeof window !== 'undefined') {
    // Clean up any global variables or mocks
  }
});
