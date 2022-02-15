import { Express } from 'express';

import { bodyParser, cors, contentType } from '@/main';

export default (app: Express): void => {
  app.use(bodyParser);
  app.use(cors);
  app.use(contentType);
};
