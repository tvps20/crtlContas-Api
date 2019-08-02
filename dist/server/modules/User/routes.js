"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var controller_1 = require("./controller");
var UserRoutes = /** @class */ (function () {
    function UserRoutes() {
    }
    UserRoutes.prototype.index = function (req, res) {
        return controller_1.default.getAll(req, res);
    };
    UserRoutes.prototype.create = function (req, res) {
        return controller_1.default.createUser(req, res);
    };
    UserRoutes.prototype.findOnde = function (req, res) {
        return controller_1.default.getById(req, res);
    };
    UserRoutes.prototype.update = function (req, res) {
        return controller_1.default.updateUser(req, res);
    };
    UserRoutes.prototype.delete = function (req, res) {
        return controller_1.default.deleteUser(req, res);
    };
    return UserRoutes;
}());
exports.default = new UserRoutes();
