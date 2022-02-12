import { HttpResponse } from '@/presentation/protocols/http-response';
import { ServerError } from '@/presentation/errors';

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error,
});

export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(error.stack),
});
