import { badRequest } from '../../helpers/http-helpers';
import { HttpRequest, HttpResponse } from './signin-controller-protocols';

export class SignInController {
  async handle(request: HttpRequest): Promise<HttpResponse> {
    const inputs = request.body;

    console.log(inputs);

    const fields = ['username', 'password'];

    for (const field of fields) {
      if (!inputs[field]) {
        return badRequest(new Error());
      }
    }

    return {
      statusCode: 200,
    };
  }
}
