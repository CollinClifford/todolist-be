const { idleTimeoutMillis } = require("pg/lib/defaults");
knex = require("../db/connection");

function listI() {
  return knex("todos").select("*");
}

// function readI(id) {
//   return knex("todos").select("*").where({ id }).then(console.log).first();
// }

function createI(todo) {
  return knex("todos")
    .insert(todo)
    .returning("*")
    .then((createdRecords) => createdRecords[0]);
}

function readI(id) {
  return knex("todos").select("*").where({ id: id }).first();
}

function destroyI(id) {
  return knex("todos").where({ id: id }).del();
}

module.exports = {
  listI,
  createI,
  readI,
  deleteI: destroyI,
};
