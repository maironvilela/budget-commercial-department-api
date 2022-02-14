import { HttpRequest, HttpResponse } from '@/presentation';

export interface Controller {
  handle: (request: HttpRequest) => Promise<HttpResponse>;
}
