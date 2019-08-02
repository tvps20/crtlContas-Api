"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var controller_1 = require("./controller");
var CartaoRoutes = /** @class */ (function () {
    function CartaoRoutes() {
    }
    CartaoRoutes.prototype.index = function (req, res) {
        return controller_1.default.getAll(req, res);
    };
    CartaoRoutes.prototype.create = function (req, res) {
        return controller_1.default.createCartao(req, res);
    };
    CartaoRoutes.prototype.findOnde = function (req, res) {
        return controller_1.default.getById(req, res);
    };
    CartaoRoutes.prototype.update = function (req, res) {
        return controller_1.default.updateCartao(req, res);
    };
    CartaoRoutes.prototype.delete = function (req, res) {
        return controller_1.default.deleteCartao(req, res);
    };
    return CartaoRoutes;
}());
exports.default = new CartaoRoutes();
