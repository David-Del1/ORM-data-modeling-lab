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

  it('creates a new reviewer via POST', async () => {

    const res = await request(app)
      .post('/api/v1/reviewers')
      .send({
        name: 'Tucker',
        company: 'NYT',
      });

    expect(res.body).toEqual({
      id: 1,
      name: 'Tucker',
      company: 'NYT',
    });

  });

  it('gets all reviewers via GET', async () => {

    await Reviewer.bulkCreate([
      {
        name: 'banana lover',
        company: 'banana land'
      },
      {
        name: 'banana enthusiast',
        company: 'banana republic'
      },
      {
        name: 'banana fanatic',
        company: 'banana inc'
      }
    ]);

    const res = await request(app)
      .get('/api/v1/reviewers');

    expect(res.body).toEqual(
      [{
        id: 1,
        name: 'banana lover',
        company: 'banana land',
      },
      {
        id: 2,
        name: 'banana enthusiast',
        company: 'banana republic',
      },
      {
        id: 3,
        name: 'banana fanatic',
        company: 'banana inc',
      }],
    );

  });

  it('selects one reviewer by id via GET', async () => {

    await Reviewer.create({
      name: 'Harry',
      company: 'Hogwarts',
    });

    await Film.create({
      title: 'Squishy Boy',
      released: 2007,
      reviewer: 1,
    });

    await Review.create(
      {
        rating: 3,
        reviewer: 1,
        film: 1,
        review: 'bleh'
      });

    const res = await request(app)
      .get('/api/v1/reviewers/1');

    expect(res.body).toEqual({
      id: 1,
      name: 'Harry',
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
      name: 'Bilbo',
      company: 'Shire'
    });

    const res = await request(app)
      .put(`/api/v1/reviewers/${reviewer.id}`)
      .send({
        name: 'Frodo',
        company: 'shire'
      });

    expect(res.body).toEqual({
      id: 1,
      name: 'Frodo',
      company: 'shire',
    });

    expect(res.body.updatedAt).not.toEqual(reviewer);
  });

  it('deletes a reviewer', async () => {

    const reviewer = await Reviewer.create({
      name: 'MermaidMan',
      company: 'Underwater Protection Agency'
    });

    // const review = await Review.create({
    //   id: 1,
    //   rating: 2,
    //   review: 'Not as advertised.'
    // });

    const res = await request(app)
      .delete(`/api/v1/reviewers/${reviewer.id}`);

    expect(res.body).not.toEqual({
      ...reviewer.toJSON(),
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

    const res = await request(app)
      .get('/api/v1/studios');

    expect(res.body).toEqual(
      [{
        id: 1,
        name: 'Chatta Studio',
      },
      {
        id: 2,
        name: 'Studio 54',
      },
      {
        id: 3,
        name: 'Unknown Inc.',
      }],
    );

  });

  it('gets a studio by id via GET', async () => {
    await Studio.create({
      name: 'Warner Bros.',
      city: 'Studio City',
      state: 'CA',
      country: 'USA'
    });

    await Film.create({
      title: 'Oculus',
      StudioId: '1',
      released: 2014
    });
    await Film.create({
      title: 'Cat in Hat',
      StudioId: '1',
      released: 2014
    });


    const res = await request(app)
      .get('/api/v1/studios/1');

    expect(res.body).toEqual({
      id: 1,
      name: 'Warner Bros.',
      city: 'Studio City',
      state: 'CA',
      country: 'USA',
      Films: [
        {
          id: 1,
          title: 'Oculus'
        },
        {
          id: 2,
          title: 'Cat in Hat',
  
        }
      ]
    });
  });

});

describe('Film tests', () => {

  beforeEach(() => {
    return sequelize.sync({ force: true });
  });

  it('creates a new film via POST', async () => {

    await Reviewer.create({
      name: 'new company',
      company: 'old name'
    });

    await Studio.create({
      name: 'Chatta Studio',
      city: 'Chattanooga',
      state: 'TN',
      country: 'USA'
    });

    const newFilm = {
      title: 'Spooky Bandit',
      StudioId: 1,
      released: 2009,
      reviewer: 1
    };

    const res = await request(app)
      .post('/api/v1/films')
      .send(newFilm);

    expect(res.body).toEqual({ ...newFilm, id: 1, studio: null });
    
  });

  it('gets all films', async () => {

    await Studio.create({
      name: 'Chatta Studio',
      city: 'Chattanooga',
      state: 'TN',
      country: 'USA'
    });

    await Studio.create({
      name: 'Test Studio',
      city: 'Mexico City',
      state: 'Mexico',
      country: 'Mexico'
    });

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

    const res = await request(app)
      .get('/api/v1/films');

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

  it('gets a film by id via GET', async () => {

    await Studio.create({
      name: 'Chatta Studio',
      city: 'Chattanooga',
      state: 'TN',
      country: 'USA'
    });

    await Film.create({
      title: 'Oculus',
      studio: 1,
      released: 2014
    });

    await Actor.create({
      name: 'Tom',
      dob: 1987,
      pob: 'Baltimore'
    });

    const res = await request(app)
      .get('/api/v1/films/1');

    expect(res.body).toEqual({
      title: 'Oculus',
      released: 2014,
      Studio: { id: 1, name: 'Chatta Studio' },
      cast: [{ id: 1, name: 'Tom' }],
      reviews: [{
        id: 1,
        rating: 5,
        review: 'hi',
        reviewer: { id: 1, name: 'no-one' } 
      }]
    });
  
  });

});

describe('actor routes', () => {

  beforeEach(() => {
    return sequelize.sync({ force: true });
  });

  it('creates an actor via POST', async () => {

    const res = await request(app)
      .post('/api/v1/actors')
      .send({
        name: 'Spongebob Squidpants',
        dob: '2001-12-14',
        pob: 'Krypton'
      });

    expect(res.body).toEqual({
      id: 1,
      name: 'Spongebob Squidpants',
      dob: '2001-12-14',
      pob: 'Krypton',
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

    const res = await request(app)
      .get('/api/v1/actors');

    expect(res.body).toEqual(
      [{
        id: 1,
        name: 'Spongebob Squidpants',
      },
      {
        id: 2,
        name: 'Lydia DoorBlocker',
      },
      {
        id: 3,
        name: 'Jason BourneTwoBeWild',
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
      id: 1,
      title: 'Spooky Bandit',
      released: 2009
    });

    const otherFilm = await Film.create({
      id: 2,
      title: 'Rooky Bandit',
      released: 20012
    });

    await actor.addFilm(film);
    await actor.addFilm(otherFilm);


    const res = await request(app)
      .get('/api/v1/actors/1');

    expect(res.body).toEqual({
      name: 'Spongebob Squidpants',
      dob: '2001-12-14',
      pob: 'Krypton',
      Films: [
        {
          id: 1,
          title: 'Spooky Bandit',
          released: 2009
        },
        {
          id: 2,
          title: 'Rooky Bandit',
          released: 20012
        }
      ]
    });
  });

});

describe('Review tests', () => {

  beforeEach(() => {
    return sequelize.sync({ force: true });
  });

  it('makes a review using POST', async () => {

    await Film.create({
      title: 'Big Showdown in little Durango',
      released: 2018
    });

    await Reviewer.create({
      name: 'Bob',
      company: 'Blah Inc.'
    });

    const res = await request(app)
      .post('/api/v1/reviews')
      .send({
        rating: 3,
        reviewer: 1,
        review: 'blah',
        film: 1
      });

    const resReviewTooLong = await request(app)
      .post('/api/v1/reviews')
      .send({
        rating: 3,
        reviewer: 1,
        review: 'blahlksldfdskjnfkjdsfns;kjfnbds;jnbdskjfbdsjfkbdsiufndsf;kjsdfnsd;kjf;kjvbiubrfiudsbfdjdajfdsfbdsjfhbsoudsfyudsodsfkjhfjdsffsdfhdspiufjdsfdsfiodsajffjsdkjsdj;kjdsbijnbdsfijkbdsfjdsbfdsfsdfdsfdsafdsa',
        film: 1
      });

    const resRatingTooHigh = await request(app)
      .post('/api/v1/reviews')
      .send({
        rating: 342,
        reviewer: 1,
        review: 'blsodsfkjhfjdsffsdfhdspiufjdsfdsfioa',
        film: 1
      });

    expect(res.body).toEqual({
      id: 1,
      rating: 3,
      reviewer: 1,
      review: 'blah',
      film: 1
    });
    
    expect(resReviewTooLong.body.message).toEqual('value too long for type character varying(140)');

    expect(resRatingTooHigh.body.message).toEqual('Validation error: Validation max on rating failed');

  });

  it('gets all reviews', async () => {

    await Film.bulkCreate([
      {
        title: 'Big Showdown in little Durango',
        released: 2017
      },
      {
        title: 'Big Showdown in big Durango',
        released: 2018
      },
      {
        title: 'Big Showdown in medium Durango',
        released: 2019
      }
    ]);

    await Review.bulkCreate([
      {
        rating: 2,
        review: 'Not as advertised.',
        film: 1
      },
      {
        rating: 4,
        review: 'As advertised.',
        film: 2
      },
      {
        rating: 5,
        review: 'Kind of as advertised.',
        film: 3
      }
    ]);

    const res = await request(app)
      .get('/api/v1/reviews');

    expect(res.body).toEqual(
      [{
        id: 3,
        rating: 5,
        review: 'Kind of as advertised.',
        Film: {
          id: 3,
          title: 'Big Showdown in medium Durango'
        },
      },
      {
        id: 2,
        rating: 4,
        review: 'As advertised.',
        Film: {
          id: 2,
          title: 'Big Showdown in big Durango'
        },
      },
      {
        id: 1,
        rating: 2,
        review: 'Not as advertised.',
        Film: {
          id: 1,
          title: 'Big Showdown in little Durango'
        }
      }
      ]);

  });

  it('deletes a review', async () => {
    const review = await Review.create({
      id: 1,
      rating: 2,
      review: 'Not as advertised.'
    });

    const res = await request(app)
      .delete(`/api/v1/reviews/${review.id}`);

    expect(res.body).not.toEqual({
      ...review.toJSON(),
    });
  });

});
