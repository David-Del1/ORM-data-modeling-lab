import sequelize from '../lib/utils/db.js';
import request from 'supertest';
import app from '../lib/app.js';
import Actor from '../lib/models/Actor.js';

describe.only('actor routes', () => {
  beforeEach(() => {
    return sequelize.sync({ force: true });
  });
  it('creates and actor via POST', async () => {
    const res = await request(app)
      .post('/api/v1/actors')
      .send({
        name: 'Spongebob Squidpants',
        dob: '2001-12-14',
        pob: 'Krypton'
      });

    expect(res.body).toEqual({
      id: expect.any(Number),
      name: 'Spongebob Squidpants',
      dob: '2001-12-14',
      pob: 'Krypton',
      updatedAt: expect.any(String),
      createdAt: expect.any(String)
    });
  });
});
