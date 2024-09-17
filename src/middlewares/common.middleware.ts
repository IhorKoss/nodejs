import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { isObjectIdOrHexString } from "mongoose";

import { ApiError } from "../errors/api-error";
// import { IUser } from "../interfaces/user.interface";

const bodyValidator = Joi.object({
  name: Joi.string().min(3),
  age: Joi.string().pattern(/^[0-9]+$/),
  email: Joi.string()
    .pattern(/(^[a-zA-Z0-9_.]+[@]{1}[a-z0-9]+[\.][a-z]+$)/)
    .message("Wrong email format"),
  password: Joi.string()
    .min(8)
    .max(16)
    .pattern(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/)
    .message(
      "Password must contain at least 1 uppercase letter, 1 lowercase letter and 1 special symbol",
    ),
});
class CommonMiddleware {
  public isIdValid(key: string) {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        if (!isObjectIdOrHexString(req.params[key])) {
          throw new ApiError("Invalid ID", 400);
        }
        next();
      } catch (e) {
        next(e);
      }
    };
  }
  public isBodyValid() {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        const { error } = bodyValidator.validate(req.body);
        if (error) {
          throw new ApiError(error.details[0].message, 400);
        }
        next();
      } catch (e) {
        next(e);
      }
    };
  }
}

export const commonMiddleware = new CommonMiddleware();
