var idleTimeoutMillis = require("pg/lib/defaults").idleTimeoutMillis;
knex = require("../db/connection");
function listI() {
    return knex("todos").select("*");
}
function createI(todo) {
    return knex("todos")
        .insert(todo)
        .returning("*")
        .then(function (createdRecords) { return createdRecords[0]; });
}
function readI(id) {
    return knex("todos").select("*").where({ id: id }).first();
}
function updateI(updatedToDo) {
    return knex("todos")
        .where({ id: updatedToDo.id })
        .update(updatedToDo, "*")
        .returning("*")
        .then(function (updatedToDo) { return updatedToDo[0]; });
}
function destroyI(id) {
    return knex("todos").where({ id: id }).del();
}
module.exports = {
    listI: listI,
    createI: createI,
    readI: readI,
    updateI: updateI,
    deleteI: destroyI,
};
