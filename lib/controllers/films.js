import { Router } from 'express';
import  Film from '../models/Film.js';
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
      }
    })
      .then(film => res.send(film))
      .catch(next);
  });
