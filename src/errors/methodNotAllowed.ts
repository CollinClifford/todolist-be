import { Request, Response, NextFunction } from "express";

function methodNotAllowed(req: Request, res: Response, next: NextFunction) { // <-- update this
  next({
    status: 405,
    message: `${req.method} not allowed for ${req.originalUrl}`,
  });
}

module.exports = methodNotAllowed;
