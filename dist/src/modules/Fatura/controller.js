"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HttpStatus = require("http-status");
var _ = require("lodash");
var response_handlers_1 = require("../../api/handlers/response-handlers");
var service_1 = require("./service");
var FaturaController = /** @class */ (function () {
    function FaturaController() {
    }
    FaturaController.prototype.getAll = function (req, res) {
        service_1.default
            .getAll()
            .then(_.partial(response_handlers_1.default.onSuccess, res, HttpStatus.OK))
            .catch(_.partial(response_handlers_1.default.onError, res, HttpStatus.INTERNAL_SERVER_ERROR, 'Erro ao buscar todas as faturas'));
    };
    FaturaController.prototype.createCartao = function (req, res) {
        service_1.default.create(req.body)
            .then(_.partial(response_handlers_1.default.onSuccess, res, HttpStatus.CREATED))
            .catch(_.partial(response_handlers_1.default.dbErrorHandler, res, HttpStatus.INTERNAL_SERVER_ERROR))
            .catch(_.partial(response_handlers_1.default.onError, res, HttpStatus.INTERNAL_SERVER_ERROR, 'Erro ao inserir nova fatura'));
    };
    FaturaController.prototype.getById = function (req, res) {
        var faturaId = parseInt(req.params.id);
        service_1.default.getById(faturaId)
            .then(_.partial(response_handlers_1.default.onSuccess, res, HttpStatus.OK))
            .catch(_.partial(response_handlers_1.default.onError, res, HttpStatus.INTERNAL_SERVER_ERROR, 'Fatura não encontrada'));
    };
    FaturaController.prototype.updateCartao = function (req, res) {
        var faturaId = parseInt(req.params.id);
        var props = req.body;
        service_1.default.update(faturaId, props)
            .then(_.partial(response_handlers_1.default.onSuccess, res, HttpStatus.OK))
            .catch(_.partial(response_handlers_1.default.onError, res, HttpStatus.INTERNAL_SERVER_ERROR, 'Falha ao atualizar fatura'));
    };
    FaturaController.prototype.deleteCartao = function (req, res) {
        var faturaId = parseInt(req.params.id);
        service_1.default.delete(faturaId)
            .then(_.partial(response_handlers_1.default.onSuccess, res, HttpStatus.OK))
            .catch(_.partial(response_handlers_1.default.onError, res, HttpStatus.INTERNAL_SERVER_ERROR, 'Erro ao excluir fatura'));
    };
    return FaturaController;
}());
exports.default = new FaturaController();
