import {
  HttpRequest,
  HttpResponse,
  badRequest,
  Validation,
} from '@/presentation';
import { Authentication } from '@/domain';

export class SignInController {
  constructor(
    private readonly validation: Validation,
    private readonly authentication: Authentication,
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { email, password } = request.body;

    const error = this.validation.validate(request.body);

    if (error) {
      return badRequest(error);
    }

    await this.authentication.auth({ email, password });

    return {
      statusCode: 200,
    };
  }
}
