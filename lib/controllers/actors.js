import { Router } from 'express';
import Actor from '../models/Actor.js';

export default Router()
  .post('/api/v1/actors', (req, res, next) => {
    Actor.create(req.body)
      .then(actor => res.send(actor))
      .catch(next);
  })

  .get('/api/v1/actors', async (req, res) => {
    try {
      const actor = await Actor.findAll();
      res.send(actor);
    } catch (err) {
      res.send.status(500).send({
        error: err.message
      });
    }
  });
