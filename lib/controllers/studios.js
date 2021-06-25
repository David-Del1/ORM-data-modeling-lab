import { Router } from 'express';
import Studio from '../models/Studio.js';

export default Router()
  .post('/api/v1/studios', (req, res, next) => {
    Studio.create(req.body)
      .then(studio => res.send(studio))
      .catch(next);
  })
  .get('/api/v1/studios', (req, res, next) => {
    Studio.findAll({ 
      attributes: ['id', 'name']
    })
      .then(studio => res.send(studio))
      .catch(next);
  })
  .get('/api/v1/studios/:id', (req, res, next) => {
    Studio.findByPk(req.params.id)
      .then(studio => res.send(studio))
      .catch(next);
  });

