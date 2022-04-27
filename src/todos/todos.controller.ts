const service = require("./todos.service.js");
const properties = require("../errors/hasProperties");
const errorBoundary = require("../errors/asyncErrorBoundary");
import { Request, Response, NextFunction } from "express";
import { toDo } from "../helpers";

// simple error handling to make sure all required fields are presented before going to the database.
const VALID_PROPERTIES: string[] = ["id", "title", "description", "due_date", "tags", "created_at", "updated_at"];

function hasOnlyValidProperties(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { data = {} } = req.body;

  const invalidFields = Object.keys(data).filter(
    (field) => !VALID_PROPERTIES.includes(field)
  );

  if (invalidFields.length)
    return next({
      status: 400,
      message: `Invalid field(s): ${invalidFields.join(", ")}`,
    });
  next();
}

const hasRequiredProperties: object = properties("title", "description");

// simple error handling to make sure id exists
async function toDoExists(req: Request, res: Response, next: NextFunction) {
  const todo: toDo = await service.readI(req.params.id);
  if (todo) {
    res.locals.todo = todo;
    return next();
  }
  next({ status: 404, message: `To Do Item cannot be found.` });
}

// CRUD
function readItem(req: Request, res: Response) {
  const { todo: data }: Record<string, toDo> = res.locals;
  res.json({ data });
}

async function listItems(req: Request, res: Response) {
  const data: toDo = await service.listI();
  res.json({ data });
}

async function createItem(req: Request, res: Response) {
  const data: toDo = await service.createI(req.body.data);
  res.status(201).json({ data });
}

async function updateItem(req: Request, res: Response) {
  const updatedToDo = {
    ...req.body.data,
    id: res.locals.todo.id,
  };
  const data = await service.updateI(updatedToDo);
  res.json({ data });
}

async function destroyItem(req: Request, res: Response) {
  const { todo }: Record<string, toDo> = res.locals;
  await service.deleteI(todo.id);
  res.sendStatus(204);
}

module.exports = {
  list: errorBoundary(listItems),
  read: [errorBoundary(toDoExists), readItem],
  create: [
    hasOnlyValidProperties,
    hasRequiredProperties,
    errorBoundary(createItem),
  ],
  update: [
    errorBoundary(toDoExists),
    hasOnlyValidProperties,
    hasRequiredProperties,
    errorBoundary(updateItem),
  ],
  delete: [errorBoundary(toDoExists), errorBoundary(destroyItem)],
};
