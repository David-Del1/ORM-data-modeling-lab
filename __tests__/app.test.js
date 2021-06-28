import sequelize from '../lib/utils/db.js';
import request from 'supertest';
import app from '../lib/app.js';
import Reviewer from '../lib/models/Reviewer.js';
import Studio from '../lib/models/Studio.js';
import Film from '../lib/models/Film.js';
import Actor from '../lib/models/Actor.js';
import Review from '../lib/models/Review.js';

describe('reviewer routes', () => {

  beforeEach(() => {
    return sequelize.sync({ force: true });
  });
  it('creates a user via POST', async () => {
    const res = await request(app)
      .post('/api/v1/reviewers')
      .send({
        userName: 'Tucker',
        company: 'NYT',
        FilmId: null
      });

    expect(res.body).toEqual({
      id: 1,
      userName: 'Tucker',
      company: 'NYT',
      FilmId: null,
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
        FilmId: null,
        updatedAt: expect.any(String),
        createdAt: expect.any(String)
      },
      {
        id: expect.any(Number),
        userName: 'banana enthusiast',
        company: 'banana republic',
        FilmId: null,
        updatedAt: expect.any(String),
        createdAt: expect.any(String)
      },
      {
        id: expect.any(Number),
        userName: 'banana fanatic',
        company: 'banana inc',
        FilmId: null,
        updatedAt: expect.any(String),
        createdAt: expect.any(String)
      }],

    );

  });

  it('selects one reviewer by id via GET', async () => {

    await Film.create({
      title: 'Squishy Boy',
      released: 2007
    });

    await Reviewer.create({
      userName: 'Harry',
      company: 'Hogwarts',
      FilmId: 1
    });

    await Review.create({
      rating: 3,
      reviewer: '1',
      review: 'bleh'
    });

    

    const res = await request(app).get('/api/v1/reviewers/1');

    expect(res.body).toEqual({
      id: 1,
      userName: 'Harry',
      company: 'Hogwarts',
      Reviews: [{
        id: 1,
        rating: 3,
        review: 'bleh',
        Film: { id: 1, title: 'Squishy Boy' }
      }]
    });
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
      .send({
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
      createdAt: expect.any(String)
    });
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
      .send({
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

    await Studio.create(
      {
        name: 'Test Studio',
        city: 'Mexico City',
        state: 'Mexico',
        country: 'Mexico'
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
        studio: 2,
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
        Studio: { id: 2, name: 'Test Studio' }
      }

    ]);
  });

  it('gets film by id via GET', async () => {

    await Studio.create(
      {
        name: 'Chatta Studio',
        city: 'Chattanooga',
        state: 'TN',
        country: 'USA'
      }
    );

    await Film.create({
      title: 'Oculus',
      studio: 1,
      released: 2014
    });

    const res = await request(app).get('/api/v1/films/1');
    expect(res.body).toEqual({
      title: 'Oculus',
      released: 2014,
      Studio: { id: 1, name: 'Chatta Studio' }
    });
  });
});

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

    await Actor.bulkCreate([
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

  it('selects one actor by id via GET', async () => {
    const actor = await Actor.create({

      name: 'Spongebob Squidpants',
      dob: '2001-12-14',
      pob: 'Krypton'

    });

    const film = await Film.create({
      id: '1',
      title: 'Spooky Bandit',
      released: 2009
    });

    await actor.addFilm(film);

    const res = await request(app).get('/api/v1/actors/1');
    expect(res.body).toEqual({
      name: 'Spongebob Squidpants',
      dob: '2001-12-14',
      pob: 'Krypton',
      Films: [{
        id: 1,
        title: 'Spooky Bandit',
        released: 2009

      }]
    });
  });

});

describe('Review tests', () => {

  beforeEach(() => {
    return sequelize.sync({ force: true });
  });

  it('makes a review using POST', async () => {

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

    await Film.create({
      title: 'Big Showdown in little Durango',
      released: 2018
    });

    await Reviewer.create({
      userName: 'Bob',
      company: 'Blah Inc.'
    });

    const res = await request(app)
      .post('/api/v1/reviews')
      .send({
        rating: 3,
        reviewer: 1,
        review: 'blah',
      });

    expect(res.body).toEqual({
      id: 1,
      rating: 3,
      reviewer: 1,
      review: 'blah',
      updatedAt: expect.any(String),
      createdAt: expect.any(String),
      film: null, // come back to this
    });
  });

  it('gets review from Review', async () => {

    await Film.create({
      title: 'Big Showdown in little Durango',
      released: 2018
    });

    await Film.create({
      title: 'Big Showdown in big Durango',
      released: 2018
    });

    await Reviewer.create({
      userName: 'Bob',
      company: 'Blah Inc.'
    });

    await Reviewer.create({
      userName: 'Miranda',
      company: 'Blah Inc.'
    });

    await Review.create({
      rating: 2,
      review: 'Not as advertised.',
      reviewer: 1,
      film: 1
    });

    await Review.create({
      rating: 4,
      review: 'As advertised.',
      reviewer: 2,
      film: 2
    });

    const res = await request(app).get('/api/v1/reviews');

    expect(res.body).toEqual(
      [{
        id: 1,
        rating: 2,
        review: 'Not as advertised.',
        Film: {
          id: 1,
          title: 'Big Showdown in little Durango'
        },
      },
      {
        id: 2,
        rating: 4,
        review: 'As advertised.',
        Film: {
          id: 2,
          title: 'Big Showdown in big Durango'
        }
      }]
    );

  });

});
