import { NextFunction, Request, Response } from "express";
import { validateOrReject } from "class-validator";
import { httpStatus } from "../utils/httpStatus";

export async function validatorMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
  validatorSchema: any
) {
  try {
    const measure = new validatorSchema(req.body);

    await validateOrReject(measure);

    next();
  } catch (e: any) {
    const description = Object.values(e[0].constraints)[0];
    res.status(httpStatus.BadRequest).send({
      error: description,
    });
  }
}
