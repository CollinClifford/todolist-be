import { Request, Response, NextFunction } from "express";
import { Err } from "../helpers";

function asyncErrorBoundary(delegate: any, defaultStatus: number) {
  return (request: Request, response: Response, next: NextFunction) => {
    Promise.resolve()
      .then(() => delegate(request, response, next))
      .catch((error: Err) => {
        const { status = defaultStatus, message = error } = error;
        next({
          status,
          message,
        });
      });
  };
}

module.exports = asyncErrorBoundary;
