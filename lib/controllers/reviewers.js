import { Router } from 'express';
import Reviewer from '../models/Reviewer.js';

export default Router()
  .post('/api/v1/reviewers', (req, res, next) => {
    Reviewer.create(req.body)
      .then(reviewer => res.send(reviewer))
      .catch(next);
  });

const sequelize = new Sequelize('database', 'username', 'password', {
  dialect: 'postgres',
  dialectOptions: {
    // Your pg options here
  }
});
