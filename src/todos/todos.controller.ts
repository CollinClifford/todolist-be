const service = require("./todos.service.js");
const properties = require("../errors/hasProperties");
const errorBoundary = require("../errors/asyncErrorBoundary");

const VALID_PROPERTIES = ["title", "description", "due_date", "tags"];

function hasOnlyValidProperties(req, res, next) {
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

const hasRequiredProperties = properties("title", "description");

async function toDoExists(req, res, next) {
  const todo = await service.readI(req.params.id);
  if (todo) {
    res.locals.todo = todo;
    return next();
  }
  next({ status: 404, message: `To Do Item cannot be found.` });
}

function readItem(req, res) {
  const { todo: data } = res.locals;
  res.json({ data });
}

async function listItems(req, res) {
  const data = await service.listI();
  res.json({ data });
}

async function createItem(req, res) {
  const data = await service.createI(req.body.data);
  res.status(201).json({ data });
}

async function updateItem(req, res) {
  const updatedToDo = {
    ...req.body.data,
    id: res.locals.todo.id,
  };
  const data = await service.updateI(updatedToDo);
  res.json({ data });
}

async function destroyItem(req, res) {
  const { todo } = res.locals;
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
