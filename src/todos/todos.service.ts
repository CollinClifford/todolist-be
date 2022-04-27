const { idleTimeoutMillis } = require("pg/lib/defaults");
const knex = require("../db/connection");
import { toDo } from "../helpers";

// lists all todos
function listI() {
  return knex("todos").select("*");
}

// creates new
function createI(todo: toDo) {
  return knex("todos")
    .insert(todo)
    .returning("*")
    .then((createdRecords: Array<toDo>) => createdRecords[0]);
}

// finds one
function readI(id: number) {
  return knex("todos").select("*").where({ id: id }).first();
}

// updates existing
function updateI(updatedToDo: toDo) {
  return knex("todos")
    .where({ id: updatedToDo.id })
    .update(updatedToDo, "*")
    .returning("*")
    .then((updatedToDo: Array<toDo>) => updatedToDo[0]);
}

// deletes existing
function destroyI(id: number) {
  return knex("todos").where({ id: id }).del();
}

module.exports = {
  listI,
  createI,
  readI,
  updateI,
  deleteI: destroyI,
};
