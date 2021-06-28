import { Router } from 'express';
import Actor from '../models/Actor.js';
import Film from '../models/Film.js';

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
  })
  .get('/api/v1/actors/:id', (req, res, next) => {
    Actor.findByPk(req.params.id, {
      attributes: ['name', 'dob', 'pob'],
      include: {
        model: Film,
        attributes: ['id', 'title', 'released'],
        through: {
          attributes: []
        }
      }
    })
      .then(actor => res.send(actor))
      .catch(next);
  });
