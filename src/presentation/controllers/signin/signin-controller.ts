import {
  HttpRequest,
  HttpResponse,
  Validation,
  badRequest,
} from '@/presentation';

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
