import {
  HttpRequest,
  HttpResponse,
  badRequest,
  Validation,
} from '@/presentation';

export class SignInController {
  constructor(private readonly validation: Validation) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const error = this.validation.validate(request.body);

    if (error) {
      return badRequest(error);
    }

    return {
      statusCode: 200,
    };
  }
}
