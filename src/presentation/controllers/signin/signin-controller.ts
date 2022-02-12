import {
  HttpRequest,
  HttpResponse,
  badRequest,
  Validation,
  serverError,
  ok,
} from '@/presentation';
import { Authentication } from '@/domain';

export class SignInController {
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
