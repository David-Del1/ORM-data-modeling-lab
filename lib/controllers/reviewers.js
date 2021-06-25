import { Router } from 'express';
import Reviewer from '../models/Reviewer.js';

export default Router()
  .post('/api/v1/reviewers', (req, res, next) => {
    Reviewer.create(req.body)
      .then(reviewer => res.send(reviewer))
      .catch(next);
  })

  .get('/api/v1/reviewers', async (req, res) => {
    try{
      const reviewer = await Reviewer.findAll();
      res.send(reviewer);
    } catch (err) {
      res.send.status(500).send({ error: err.message });
    }
  })
  .get('/api/v1/reviewers/:id', async (req, res, next) => {
    Reviewer.findByPk(req.params.id)
      .then(reviewer => res.send(reviewer))
      .catch(next);
  })
  .put('/api/v1/reviewers/:id', async (req, res, next) => {
    Reviewer.update(req.body, {
      where: { id: req.params.id },
      returning: true
    })
      .then(([, reviewers]) => res.send(reviewers[0]))
      .catch(next);
  });
