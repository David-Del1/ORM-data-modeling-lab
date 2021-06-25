import sequelize from '../lib/utils/db.js';
import request from 'supertest';
import app from '../lib/app.js';
import Reviewer from '../lib/models/Reviewer.js';


describe.skip('demo routes', () => {
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

  it('gets all users via GET', async () => {
    
    const user1 = await Reviewer.bulkCreate([
      {
        userName: 'banana lover',
        company: 'banana land'
      },
      {
        userName: 'banana enthusiast',
        company: 'banana republic'
      },
      {
        userName: 'banana fanatic',
        company: 'banana inc'
      }
    ]);

    

    const res = await request(app).get('/api/v1/reviewers');
    expect(res.body).toEqual(
      [{
        id: expect.any(Number),
        userName: 'banana lover',
        company: 'banana land',
        updatedAt: expect.any(String),
        createdAt: expect.any(String) 
      },
      {
        id: expect.any(Number),
        userName: 'banana enthusiast',
        company: 'banana republic',
        updatedAt: expect.any(String),
        createdAt: expect.any(String) 
      },
      {
        id: expect.any(Number),
        userName: 'banana fanatic',
        company: 'banana inc',
        updatedAt: expect.any(String),
        createdAt: expect.any(String) 
      }],
      
    );
  
  });
});
