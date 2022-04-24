var _a = process.env.PORT, PORT = _a === void 0 ? 5000 : _a;
app = require("./app");
knex = require("./db/connection");
knex.migrate
    .latest()
    .then(function (migrations) {
    console.log("migrations", migrations);
    app.listen(PORT || 3000, listener);
})
    .catch(function (error) {
    console.error(error);
    knex.destroy();
});
function listener() {
    console.log("Listening on Port ".concat(PORT, "!"));
}
