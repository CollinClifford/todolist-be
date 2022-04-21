const service = require("./todos.service.js");
const hasProperties = require("../errors/hasProperties");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

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

const hasRequiredProperties = hasProperties("title", "description");

async function toDoExists(req, res, next) {
  const todo = await service.read(req.params.id);
  if (todo) {
    res.locals.todo = todo;
    return next();
  }
  next({ status: 404, message: `To Do Item cannot be found.` });
}

function read(req, res) {
  const { todo: data } = res.locals;
  console.log({ data });
  res.json({ data });
}

async function list(req, res) {
  const data = await service.list();
  res.json({ data });
}

async function create(req, res) {
  const data = await service.create(req.body.data);
  res.status(201).json({ data });
}

async function destroy(req, res) {
  const { todo } = res.locals;
  await service.delete(todo.id);
  res.sendStatus(204);
}

module.exports = {
  list: asyncErrorBoundary(list),
  read: [asyncErrorBoundary(toDoExists), read],
  create: [
    hasOnlyValidProperties,
    hasRequiredProperties,
    asyncErrorBoundary(create),
  ],
  delete: [asyncErrorBoundary(toDoExists), asyncErrorBoundary(destroy)],
};
