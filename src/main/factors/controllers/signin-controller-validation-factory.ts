import {
  RequiredFieldsValidations,
  Validation,
  ValidationComposite,
} from '@/validators';

import { makeEmailValidatorValidation } from '../validations/email-validator-validation-factory';

export const makeSignInControllerValidationFactory =
  (): ValidationComposite => {
    let validations: Validation[];

    const fields = ['email, password'];

    for (const field of fields) {
      validations.push(new RequiredFieldsValidations(field));
    }

    validations.push(makeEmailValidatorValidation('email'));

    return new ValidationComposite(validations);
  };
