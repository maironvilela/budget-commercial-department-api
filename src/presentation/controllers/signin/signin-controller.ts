import { Authentication } from '@/domain';
import {
  Controller,
  HttpRequest,
  HttpResponse,
  badRequest,
  Validation,
  serverError,
  ok,
} from '@/presentation';

export class SignInController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly authentication: Authentication,
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const { email, password } = request.body;

      const error = this.validation.validate(request.body);
      if (error) {
        return badRequest(error);
      }
      const auth = await this.authentication.auth({ email, password });
      return ok(auth);
    } catch (error) {
      return serverError(error);
    }
  }
}
