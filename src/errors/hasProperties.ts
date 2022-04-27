import { Request, Response, NextFunction } from "express";
import { Err } from "../helpers";
import { toDo } from "../helpers";

// makes sure all exisiting properties are accounted for.
function hasProperties(...properties) {
  return function (res, req: Request, next: NextFunction) {
    const { data = {} }: Record<string, {}> = res.body;
    try {
      properties.forEach((property) => {
        if (!data[property]) {
          const error: Err = {
            name: "missing property",
            message: `A ${property} property is required`,
            status: 400,
          };
          throw error;
        }
      });
      next();
    } catch (error) {
      next(error);
    }
  };
}

module.exports = hasProperties;
