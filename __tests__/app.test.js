import sequelize from '../lib/utils/db.js';
import request from 'supertest';
import app from '../lib/app.js';
import Reviewer from '../lib/models/Reviewer.js';
import Studio from '../lib/models/Studio.js';

describe('reviewer routes', () => {
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

  it('selects one user by id via GET', async () => {
    const reviewer = await Reviewer.create({
      userName: 'Harry',
      company: 'Hogwarts',
      
    });

    const res = await request(app).get('/api/v1/reviewers/1');
    expect(res.body).toEqual({ 
      ...reviewer.toJSON(), 
      updatedAt: expect.any(String),
      createdAt: expect.any(String) });
  });

  it('updates a reviewer via PUT', async () => {

    const reviewer = await Reviewer.create({
      userName: 'Bilbo',
      company: 'Shire'
    });

    const res = await request(app)
      .put('/api/v1/reviewers/1')
      .send({
        userName: 'Frodo',
        company: 'Shire'
      });

    expect(res.body).toEqual({
      ...reviewer.toJSON(),
      userName: 'Frodo',
      company: 'Shire',
      updatedAt: expect.any(String),
      createdAt: expect.any(String)
    });

    expect(res.body.updatedAt).not.toEqual(reviewer.updatedAt.toISOString());
  });

  it('deletes a reviewer', async () => {
    const reviewer = await Reviewer.create({
      userName: 'MermaidMan',
      company: 'Underwater Protection Agency'
    });
    
    const res = await request(app)
      .delete('/api/v1/reviewers/1');
    expect(res.body).not.toEqual({
      ...reviewer.toJSON(),
      updatedAt: expect.any(String),
      createdAt: expect.any(String)
    });
  });
});

describe('studio routes', () => {
  
  beforeEach(() => {
    return sequelize.sync({ force: true });
  });

  it('adds a studio with POST', async () => {

    const res = await request(app)
      .post('/api/v1/studios')
      .send ({
        name: 'Hollywood',
        city: 'Orlando',
        state: 'FL',
        country: 'USA'
      });

    expect(res.body).toEqual({
      id: 1,
      name: 'Hollywood',
      city: 'Orlando',
      state: 'FL',
      country: 'USA',
      updatedAt: expect.any(String),
      createdAt: expect.any(String) 
    });
  });

  it('gets all studios via GET', async () => {
    
    await Studio.bulkCreate([
      {
        name: 'Chatta Studio',
        city: 'Chattanooga',
        state: 'TN',
        country: 'USA'
      },
      {
        name: 'Studio 54',
        city: 'New York',
        state: 'NY',
        country: 'USA'
      },
      {
        name: 'Unknown Inc.',
        city: '',
        state: '',
        country: ''
      }
    ]);

    const res = await request(app).get('/api/v1/studios');
    expect(res.body).toEqual(
      [{
        id: expect.any(Number),
        name: 'Chatta Studio',
      },
      {
        id: expect.any(Number),
        name: 'Studio 54',
      },
      {
        id: expect.any(Number),
        name: 'Unknown Inc.',
      }],
    
    );
  
  });


}); 
