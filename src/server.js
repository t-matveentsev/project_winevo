import express from 'express';
import cors from 'cors';

import winesRouter from './routers/wines.js';
import authRouter from './routers/auth.js';

import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { getEnvVar } from './utils/getEnvVar.js';
import { logger } from './middlewares/logger.js';

export const setupServer = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(logger);

  app.use('/auth', authRouter);
  app.use('/wines', winesRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  const port = Number(getEnvVar('PORT', 8080));
  app.listen(port, () => console.log(`Server is running on port ${port}`));
};
