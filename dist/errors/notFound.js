function notFound(req, res, next) {
    next({ status: 404, message: "Path not found: ".concat(req.originalUrl) });
}
module.exports = notFound;
