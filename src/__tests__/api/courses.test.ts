import { createMocks } from 'node-mocks-http';
import { NextApiRequest, NextApiResponse } from 'next';

// This is a placeholder for when you create your actual API handler
// import handler from '@/pages/api/courses';

// Mock handler for now
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    return res.status(200).json([
      { id: 1, title: 'Introduction to Data Science', price: 299 },
      { id: 2, title: 'Advanced Machine Learning', price: 499 },
      { id: 3, title: 'Data Visualization with Python', price: 349 }
    ]);
  }
  return res.status(405).end(`Method ${req.method} Not Allowed`);
};

describe('/api/courses', () => {
  test('returns a list of courses', async () => {
    const { req, res } = createMocks({
      method: 'GET',
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    
    const data = JSON.parse(res._getData());
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBeGreaterThan(0);
    expect(data[0]).toHaveProperty('id');
    expect(data[0]).toHaveProperty('title');
    expect(data[0]).toHaveProperty('price');
  });

  test('returns 405 for non-GET methods', async () => {
    const { req, res } = createMocks({
      method: 'POST',
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(405);
  });
});
