"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var controller_1 = require("./controller");
var FaturaRoutes = /** @class */ (function () {
    function FaturaRoutes() {
    }
    FaturaRoutes.prototype.index = function (req, res) {
        return controller_1.default.getAll(req, res);
    };
    FaturaRoutes.prototype.create = function (req, res) {
        return controller_1.default.createCartao(req, res);
    };
    FaturaRoutes.prototype.findOnde = function (req, res) {
        return controller_1.default.getById(req, res);
    };
    FaturaRoutes.prototype.update = function (req, res) {
        return controller_1.default.updateCartao(req, res);
    };
    FaturaRoutes.prototype.delete = function (req, res) {
        return controller_1.default.deleteCartao(req, res);
    };
    return FaturaRoutes;
}());
exports.default = new FaturaRoutes();
