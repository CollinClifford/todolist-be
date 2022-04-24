function errorHandler(error, request, response, next) {
    var _a = error.status, status = _a === void 0 ? 500 : _a, _b = error.message, message = _b === void 0 ? "Something went wrong!" : _b;
    response.status(status).json({ error: message });
}
module.exports = errorHandler;
