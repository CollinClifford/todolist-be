var router = require("express").Router();
var controller = require("./todos.controller");
var notAllowed = require("../errors/methodNotAllowed");
router
    .route("/")
    .get(controller.list)
    .post(controller.create)
    .all(notAllowed);
router
    .route("/:id([0-9]+)")
    .get(controller.read)
    .delete(controller.delete)
    .all(notAllowed);
module.exports = router;
