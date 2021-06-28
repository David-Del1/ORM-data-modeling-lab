import { Router } from 'express';
import Reviewer from '../models/Reviewer.js';

export default Router()
  .post('/api/v1/reviewers', (req, res, next) => {
    Reviewer.create(req.body)
      .then(reviewer => res.send(reviewer))
      .catch(next);
  })

  .get('/api/v1/reviewers', (req, res, next) => {
    Reviewer.findAll({
      attributes: ['id', 'userName', 'company']
    })
      .then(reviewer => res.send(reviewer))
      .catch(next);
  })
  .get('/api/v1/reviewers/:id', (req, res, next) => {
    Reviewer.findByPk(req.params.id, {
      attributes: ['id', 'userName', 'company']
    })
      .then(reviewer => res.send(reviewer))
      .catch(next);
  })
  .put('/api/v1/reviewers/:id', (req, res, next) => {
    Reviewer.update(req.body, {
      where: { id: req.params.id },
      returning: true
    })
      .then(([, reviewers]) => res.send(reviewers[0]))
      .catch(next);
  })
  .delete('/api/v1/reviewers/:id', (req, res, next) => {
    Reviewer.destroy({
      where: { id: req.params.id },
      returning: true
    })
      .then(([, reviewers]) => res.send(reviewers[0]))
      .catch(next);
  });
