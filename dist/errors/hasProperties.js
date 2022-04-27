"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// makes sure all exisiting properties are accounted for.
function hasProperties() {
    var properties = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        properties[_i] = arguments[_i];
    }
    return function (res, req, next) {
        var _a = res.body.data, data = _a === void 0 ? {} : _a;
        try {
            properties.forEach(function (property) {
                if (!data[property]) {
                    var error = {
                        name: "missing property",
                        message: "A ".concat(property, " property is required"),
                        status: 400,
                    };
                    throw error;
                }
            });
            next();
        }
        catch (error) {
            next(error);
        }
    };
}
module.exports = hasProperties;
