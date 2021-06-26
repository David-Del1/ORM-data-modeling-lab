import sequelize from '../lib/utils/db.js';
import request from 'supertest';
import app from '../lib/app.js';
import Actor from '../lib/models/Actor.js';

describe('actor routes', () => {
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

  it('gets all actors via GET', async () => {

    const actor1 = await Actor.bulkCreate([
      {
        name: 'Spongebob Squidpants',
        dob: '2001-12-14',
        pob: 'Krypton'
      },
      {
        name: 'Lydia DoorBlocker',
        dob: '1801-12-14',
        pob: 'Denial of Entry'
      },
      {
        name: 'Jason BourneTwoBeWild',
        dob: '2101-12-14',
        pob: 'Your lovely nightmares'
      },
    ]);

    const res = await request(app).get('/api/v1/actors');
    expect(res.body).toEqual(
      [{
        id: expect.any(Number),
        name: 'Spongebob Squidpants',
        dob: '2001-12-14',
        pob: 'Krypton',
        updatedAt: expect.any(String),
        createdAt: expect.any(String)
      },
      {
        id: expect.any(Number),
        name: 'Lydia DoorBlocker',
        dob: '1801-12-14',
        pob: 'Denial of Entry',
        updatedAt: expect.any(String),
        createdAt: expect.any(String)
      },
      {
        id: expect.any(Number),
        name: 'Jason BourneTwoBeWild',
        dob: '2101-12-14',
        pob: 'Your lovely nightmares',
        updatedAt: expect.any(String),
        createdAt: expect.any(String)

      }]
    );
  });
});
