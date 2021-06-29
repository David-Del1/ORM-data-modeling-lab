import { Router } from 'express';
import Review from '../models/Review.js';
import Film from '../models/Film.js';

export default Router()

  .post('/api/v1/reviews', (req, res, next) => {
    Review.create(req.body)
      .then(review => res.send(review))
      .catch(next);
  })
  
  .get('/api/v1/reviews', (req, res, next) => {
    Review.findAll({
      order: [['rating', 'DESC']],
      limit: 100,
      attributes: ['id', 'rating', 'review'],
      include: {
        model: Film,
        attributes: ['id', 'title']
      }
    })
      .then(review => res.send(review))
      .catch(next);
  })

  .delete('/api/v1/reviews/:id', (req, res, next) => {
    Review.destroy({
      where: { id: req.params.id },
      returning: true
    })
      .then(([, reviews]) => res.send(reviews[0]))
      .catch(next);
  });
