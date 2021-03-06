"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var service = require("./todos.service.js");
var properties = require("../errors/hasProperties");
var errorBoundary = require("../errors/asyncErrorBoundary");
// simple error handling to make sure all required fields are presented before going to the database.
var VALID_PROPERTIES = ["id", "title", "description", "due_date", "tags", "created_at", "updated_at"];
function hasOnlyValidProperties(req, res, next) {
    var _a = req.body.data, data = _a === void 0 ? {} : _a;
    var invalidFields = Object.keys(data).filter(function (field) { return !VALID_PROPERTIES.includes(field); });
    if (invalidFields.length)
        return next({
            status: 400,
            message: "Invalid field(s): ".concat(invalidFields.join(", ")),
        });
    next();
}
var hasRequiredProperties = properties("title", "description");
// simple error handling to make sure id exists
function toDoExists(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var todo;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, service.readI(req.params.id)];
                case 1:
                    todo = _a.sent();
                    if (todo) {
                        res.locals.todo = todo;
                        return [2 /*return*/, next()];
                    }
                    next({ status: 404, message: "To Do Item cannot be found." });
                    return [2 /*return*/];
            }
        });
    });
}
// CRUD
function readItem(req, res) {
    var data = res.locals.todo;
    res.json({ data: data });
}
function listItems(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, service.listI()];
                case 1:
                    data = _a.sent();
                    res.json({ data: data });
                    return [2 /*return*/];
            }
        });
    });
}
function createItem(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, service.createI(req.body.data)];
                case 1:
                    data = _a.sent();
                    res.status(201).json({ data: data });
                    return [2 /*return*/];
            }
        });
    });
}
function updateItem(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var updatedToDo, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    updatedToDo = __assign(__assign({}, req.body.data), { id: res.locals.todo.id });
                    return [4 /*yield*/, service.updateI(updatedToDo)];
                case 1:
                    data = _a.sent();
                    res.json({ data: data });
                    return [2 /*return*/];
            }
        });
    });
}
function destroyItem(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var todo;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    todo = res.locals.todo;
                    return [4 /*yield*/, service.deleteI(todo.id)];
                case 1:
                    _a.sent();
                    res.sendStatus(204);
                    return [2 /*return*/];
            }
        });
    });
}
module.exports = {
    list: errorBoundary(listItems),
    read: [errorBoundary(toDoExists), readItem],
    create: [
        hasOnlyValidProperties,
        hasRequiredProperties,
        errorBoundary(createItem),
    ],
    update: [
        errorBoundary(toDoExists),
        hasOnlyValidProperties,
        hasRequiredProperties,
        errorBoundary(updateItem),
    ],
    delete: [errorBoundary(toDoExists), errorBoundary(destroyItem)],
};
