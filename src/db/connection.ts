const environment = process.env.NODE_ENV || "production";
const config = require("../../knexfile")[environment];
let knex = require("knex")(config);

module.exports = knex;
