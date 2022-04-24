function methodNotAllowed(req, res, next) {
    next({
        status: 405,
        message: "".concat(req.method, " not allowed for ").concat(req.originalUrl),
    });
}
module.exports = methodNotAllowed;
