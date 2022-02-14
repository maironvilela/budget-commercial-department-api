import { SignInController } from '@/presentation';

import { makeDbAuthentication } from '../data/db-authentication-factory';
import { makeSignInControllerValidationFactory } from './signin-controller-validation-factory';

export const makeSigninControllerFactory = (): SignInController => {
  const validation = makeSignInControllerValidationFactory();
  const authentication = makeDbAuthentication();

  return new SignInController(validation, authentication);
};
