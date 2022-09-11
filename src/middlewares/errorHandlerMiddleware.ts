import { NextFunction, Request, Response } from 'express';

const ERRORS = {
  bad_request: 400,
  unauthorized: 401,
  not_found: 404,
  conflict: 409
};

export default function errorHandlerMiddleware(err, req: Request, res: Response, next: NextFunction) {
  console.log(err)
  const type: string = err.type;
  let statusCode = ERRORS[type];
  if (!statusCode) return res.sendStatus(500);

  return res.status(statusCode).send(err.message);
}