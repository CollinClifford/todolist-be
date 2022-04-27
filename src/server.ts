const { PORT = 5000 } = process.env;

const app = require("./app");
knex = require("./db/connection");

//migrates database before starting server
knex.migrate
  .latest()
  .then((migrations) => {
    console.log("migrations", migrations);
    app.listen(PORT || 3000, listener);
  })
  .catch((error) => {
    console.error(error);
    knex.destroy();
  });

function listener() {
  console.log(`Listening on Port ${PORT}!`);
}
