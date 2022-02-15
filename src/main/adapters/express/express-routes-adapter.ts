import { Request, Response } from 'express';

import { Controller, HttpRequest } from '@/presentation';

export const expressRouterAdapter = (controller: Controller) => {
  return async (req: Request, resp: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body,
    };

    const httpResponse = await controller.handle(httpRequest);

    if (httpResponse.statusCode === 200) {
      resp.status(httpResponse.statusCode).json(httpResponse.body);
    } else {
      resp
        .status(httpResponse.statusCode)
        .json({ error: httpResponse.body.message });
    }
  };
};
