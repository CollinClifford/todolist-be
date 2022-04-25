"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });
var express = require("express");
var cors = require("cors");
var router = require("./todos/todos.router");
var app = express();
app.use(cors());
app.use(express.json());
app.use("/todos", router);
app.use(function (req, res, next) {
    next({ status: 404, message: "Path not found: ".concat(req.originalUrl) });
});
app.use(function (error, req, res, next) {
    var _a = error.status, status = _a === void 0 ? 500 : _a, _b = error.message, message = _b === void 0 ? "Something went wrong!" : _b;
    res.status(status).json({ error: message });
});
module.exports = app;
