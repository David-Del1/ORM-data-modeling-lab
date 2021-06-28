import { Router } from 'express';
import Film from '../models/Film.js';
import Review from '../models/Review.js';
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
  .get('/api/v1/reviewers/:id', (req, res, next) => {
    Reviewer.findByPk(req.params.id, {
      attributes: ['id', 'userName', 'company'],
      include: [
        {
          model: Review,
          attributes: ['id', 'rating', 'review']
        },
        {
          model: Film,
          attributes: ['id', 'title']
        },
        
      ]
  
    
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
