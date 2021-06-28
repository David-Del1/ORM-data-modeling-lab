import { Router } from 'express';
import Review from '../models/Review.js';

export default Router()
  .get('/api/v1/reviews', (req, res, next) => {
    Review.create(req.body)
      .then(review => res.send(review))
      .catch(next);
  });
