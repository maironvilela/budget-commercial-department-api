import { Validation } from '../../../validators';
import { badRequest } from '../../helpers/http-helpers';
import { HttpRequest, HttpResponse } from './signin-controller-protocols';

export class SignInController {
  constructor(private readonly validation: Validation) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const inputs = request.body;

    const error = this.validation.validate(inputs);

    if (error) {
      return badRequest(new Error());
    }

    return {
      statusCode: 200,
    };
  }
}
