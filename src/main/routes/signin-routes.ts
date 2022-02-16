/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';

import { expressRouterAdapter } from '../adapters/express/express-routes-adapter';
import { makeSigninControllerFactory } from '../factors/controllers/signin-controller-factory';

export default (router: Router): void => {
  router.post('/signin', expressRouterAdapter(makeSigninControllerFactory()));
};
