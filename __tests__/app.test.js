import sequelize from '../lib/utils/db.js';
import request from 'supertest';
import app from '../lib/app.js';
import Reviewer from '../lib/models/Reviewer.js';
import Studio from '../lib/models/Studio.js';
import Film from '../lib/models/Film.js';

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
    
    await Reviewer.bulkCreate([
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

  it('gets a studio by id via GET', async () => {
    const studio = await Studio.create({
      name: 'Warner Bros.',
      city: 'Studio City',
      state: 'CA',
      country: 'USA'
    });

    const res = await request(app).get('/api/v1/studios/1');
    expect(res.body).toEqual({ 
      ...studio.toJSON(), 
      updatedAt: expect.any(String),
      createdAt: expect.any(String) });
  });

});

describe('Film tests', () => {

  beforeEach(() => {
    return sequelize.sync({ force: true });
  }); 

  it('creates a new film via POST', async () => {

    const testingStudio = await Studio.create(
      {
        name: 'Chatta Studio',
        city: 'Chattanooga',
        state: 'TN',
        country: 'USA'
      }
    );

    const res = await request(app)
      .post('/api/v1/films')
      .send ({
        title: 'Spooky Bandit',
        studio: testingStudio.id,
        released: 2009
      });

    expect(res.body).toEqual({
      id: 1,
      title: 'Spooky Bandit',
      studio: 1,
      released: 2009,
      updatedAt: expect.any(String),
      createdAt: expect.any(String),
    });
  });

  it('gets all films', async () => {

    await Studio.create(
      {
        name: 'Chatta Studio',
        city: 'Chattanooga',
        state: 'TN',
        country: 'USA'
      }
    );

    await Film.bulkCreate([
      {
        title: 'Oculus',
        studio: 1,
        released: 2014
      },
      {
        title: 'Tenet',
        studio: 1,
        released: 2020
      },
      {
        title: 'Cronos',
        studio: 1,
        released: 1993
      }
    ]);

    const res = await request(app).get('/api/v1/films');

    expect(res.body).toEqual([

      {
        id: 1,
        title: 'Oculus',
        released: 2014,
        Studio: { id: 1, name: 'Chatta Studio' }
      },
      {
        id: 2,
        title: 'Tenet',
        released: 2020,
        Studio: { id: 1, name: 'Chatta Studio' }
      },
      {
        id: 3,
        title: 'Cronos',
        released: 1993,
        Studio: { id: 1, name: 'Chatta Studio' }
      }

    ]
    );
  });
});
