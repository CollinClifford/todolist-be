const { idleTimeoutMillis } = require("pg/lib/defaults");
const knex = require("../db/connection");
function list() {
  return knex("todos").select("*");
}

function read(id) {
  return knex("todos").select("*").where({ id }).then(console.log).first();
}

function create(todo) {
  return knex("todos")
    .insert(todo)
    .returning("*")
    .then((createdRecords) => createdRecords[0]);
}

function read(id) {
  return knex("todos").select("*").where({ id: id }).first();
}

function destroy(id) {
  return knex("todos").where({ id: id }).del();
}

module.exports = {
  list,
  create,
  read,
  delete: destroy,
};
