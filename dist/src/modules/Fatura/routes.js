"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var controller_1 = require("./controller");
var FaturaRouter = /** @class */ (function () {
    function FaturaRouter() {
    }
    FaturaRouter.prototype.index = function (req, res) {
        return controller_1.default.getAll(req, res);
    };
    FaturaRouter.prototype.create = function (req, res) {
        return controller_1.default.createCartao(req, res);
    };
    FaturaRouter.prototype.findOnde = function (req, res) {
        return controller_1.default.getById(req, res);
    };
    FaturaRouter.prototype.update = function (req, res) {
        return controller_1.default.updateCartao(req, res);
    };
    FaturaRouter.prototype.delete = function (req, res) {
        return controller_1.default.deleteCartao(req, res);
    };
    return FaturaRouter;
}());
exports.default = new FaturaRouter();
