import express from 'express';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';
import reviewersController from './controllers/reviewers.js';
import actorsController from './controllers/actors.js';
import studiosController from './controllers/studios.js';
import filmController from './controllers/films.js';
import reviewsController from './controllers/reviews.js';
import './models';



const app = express();

app.use(express.json());

app.use(reviewersController);
app.use(actorsController);
app.use(studiosController);
app.use(filmController);
app.use(reviewsController);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
