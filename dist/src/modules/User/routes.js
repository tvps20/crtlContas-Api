"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var controller_1 = require("./controller");
var UserRouter = /** @class */ (function () {
    function UserRouter() {
    }
    UserRouter.prototype.index = function (req, res) {
        return controller_1.default.getAll(req, res);
    };
    UserRouter.prototype.create = function (req, res) {
        return controller_1.default.createUser(req, res);
    };
    UserRouter.prototype.findOnde = function (req, res) {
        return controller_1.default.getById(req, res);
    };
    UserRouter.prototype.update = function (req, res) {
        return controller_1.default.updateUser(req, res);
    };
    UserRouter.prototype.delete = function (req, res) {
        return controller_1.default.deleteUser(req, res);
    };
    return UserRouter;
}());
exports.default = new UserRouter();
