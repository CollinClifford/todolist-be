"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var idleTimeoutMillis = require("pg/lib/defaults").idleTimeoutMillis;
var knex = require("../db/connection");
// lists all todos
function listI() {
    return knex("todos").select("*");
}
// creates new
function createI(todo) {
    return knex("todos")
        .insert(todo)
        .returning("*")
        .then(function (createdRecords) { return createdRecords[0]; });
}
// finds one
function readI(id) {
    return knex("todos").select("*").where({ id: id }).first();
}
// updates existing
function updateI(updatedToDo) {
    return knex("todos")
        .where({ id: updatedToDo.id })
        .update(updatedToDo, "*")
        .returning("*")
        .then(function (updatedToDo) { return updatedToDo[0]; });
}
// deletes existing
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
