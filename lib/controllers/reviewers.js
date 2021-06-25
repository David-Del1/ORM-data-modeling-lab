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
  });
