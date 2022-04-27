"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// simple error handling that returns message for requests not allowed.
function methodNotAllowed(req, res, next) {
    next({
        status: 405,
        message: "".concat(req.method, " not allowed for ").concat(req.originalUrl),
    });
}
module.exports = methodNotAllowed;
