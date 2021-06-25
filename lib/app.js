import express from 'express';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';
import reviewersController from './controllers/reviewers.js';
import studiosController from './controllers/studios.js';

const app = express();

app.use(express.json());
app.use(reviewersController);
app.use(studiosController);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
