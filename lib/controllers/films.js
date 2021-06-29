import { Router } from 'express';
import Actor from '../models/Actor.js';
import Film from '../models/Film.js';
import Review from '../models/Review.js';
import Reviewer from '../models/Reviewer.js';
import Studio from '../models/Studio.js';

export default Router()

  .post('/api/v1/films', (req, res, next) => {
    Film.create(req.body)
      .then(film => res.send(film))
      .catch(next);
  })

  .get('/api/v1/films', (req, res, next) => {
    Film.findAll({
      attributes: ['id', 'title', 'released'],
      include: {
        model: Studio,
        attributes: ['id', 'name']
      },
    })
      .then(film => res.send(film))
      .catch(next);
  })

  .get('/api/v1/films/:id', (req, res, next) => {
    Film.findByPk(req.params.id, {
      attributes: ['title', 'released'], 
      include: [{
        model: Studio,
        attributes: ['id', 'name']
      },
      {
        model: Actor,
        attributes: ['id', 'name']
      },
      {
        model: Review,
        attributes: ['id', 'rating', 'review'],
        include: {
          model: Reviewer,
          attributes: ['id', 'name']
        }
      }]
    })
      .then(film => res.send(film))
      .catch(next);
  });
