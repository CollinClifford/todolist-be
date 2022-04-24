/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("todos", (table) => {
    table.increments("id").primary(); // sets supplier_id as the primary key
    table.string("title");
    table.string("description");
    table.string("due_date");
    table.string("tags");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */ 
exports.down = function (knex) {
  return knex.schema.dropTable("todos");
};
