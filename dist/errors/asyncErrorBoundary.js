"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function asyncErrorBoundary(delegate, defaultStatus) {
    return function (request, response, next) {
        Promise.resolve()
            .then(function () { return delegate(request, response, next); })
            .catch(function (error) {
            var _a = error.status, status = _a === void 0 ? defaultStatus : _a, _b = error.message, message = _b === void 0 ? error : _b;
            next({
                status: status,
                message: message,
            });
        });
    };
}
module.exports = asyncErrorBoundary;
