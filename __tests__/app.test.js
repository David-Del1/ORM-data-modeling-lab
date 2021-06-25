import pool from '../lib/utils/db.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';

describe('demo routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a user via POST', async () => {
    const res = await request(app)
      .post('/api/v1/reviewer')
      .send({
        userName: 'Tucker',
        company: 'NYT'
      });

    expect(res.body).toEqual({
      id: 1,
      userName: 'Tucker',
      company: 'NYT'
    });
  });
});
