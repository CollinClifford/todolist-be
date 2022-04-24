var idleTimeoutMillis = require("pg/lib/defaults").idleTimeoutMillis;
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
        .then(function (createdRecords) { return createdRecords[0]; });
}
function readI(id) {
    return knex("todos").select("*").where({ id: id }).first();
}
function destroyI(id) {
    return knex("todos").where({ id: id }).del();
}
module.exports = {
    listI: listI,
    createI: createI,
    readI: readI,
    deleteI: destroyI,
};
