"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var controller_1 = require("./controller");
var CartaoRouter = /** @class */ (function () {
    function CartaoRouter() {
    }
    CartaoRouter.prototype.index = function (req, res) {
        return controller_1.default.getAll(req, res);
    };
    CartaoRouter.prototype.create = function (req, res) {
        return controller_1.default.createCartao(req, res);
    };
    CartaoRouter.prototype.findOnde = function (req, res) {
        return controller_1.default.getById(req, res);
    };
    CartaoRouter.prototype.update = function (req, res) {
        return controller_1.default.updateCartao(req, res);
    };
    CartaoRouter.prototype.delete = function (req, res) {
        return controller_1.default.deleteCartao(req, res);
    };
    return CartaoRouter;
}());
exports.default = new CartaoRouter();
