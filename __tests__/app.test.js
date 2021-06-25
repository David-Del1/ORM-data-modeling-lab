import sequelize from '../lib/utils/db.js';
import request from 'supertest';
import app from '../lib/app.js';

describe('demo routes', () => {
  beforeEach(() => {
    return sequelize.sync({ force: true });
  }); 
  it('creates a user via POST', async () => {
    const res = await request(app)
      .post('/api/v1/reviewers')
      .send({
        userName: 'Tucker',
        company: 'NYT'
      });

    expect(res.body).toEqual({
      id: 1,
      userName: 'Tucker',
      company: 'NYT',
      updatedAt: expect.any(String),
      createdAt: expect.any(String) 
    });
  });
});
