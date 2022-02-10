import { HttpResponse } from '@/presentation/protocols/http-response';

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error,
});
