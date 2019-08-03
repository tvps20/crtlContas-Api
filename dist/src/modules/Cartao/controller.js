"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HttpStatus = require("http-status");
var _ = require("lodash");
var response_handlers_1 = require("../../api/handlers/response-handlers");
var service_1 = require("./service");
var CartaoController = /** @class */ (function () {
    function CartaoController() {
    }
    CartaoController.prototype.getAll = function (req, res) {
        service_1.default
            .getAll()
            .then(_.partial(response_handlers_1.default.onSuccess, res, HttpStatus.OK))
            .catch(_.partial(response_handlers_1.default.onError, res, HttpStatus.INTERNAL_SERVER_ERROR, 'Erro ao buscar todos os cartões'));
    };
    CartaoController.prototype.createCartao = function (req, res) {
        service_1.default.create(req.body)
            .then(_.partial(response_handlers_1.default.onSuccess, res, HttpStatus.CREATED))
            .catch(_.partial(response_handlers_1.default.dbErrorHandler, res, HttpStatus.INTERNAL_SERVER_ERROR))
            .catch(_.partial(response_handlers_1.default.onError, res, HttpStatus.INTERNAL_SERVER_ERROR, 'Erro ao inserir novo cartão'));
    };
    CartaoController.prototype.getById = function (req, res) {
        var cartaoId = parseInt(req.params.id);
        service_1.default.getById(cartaoId)
            .then(_.partial(response_handlers_1.default.onSuccess, res, HttpStatus.OK))
            .catch(_.partial(response_handlers_1.default.onError, res, HttpStatus.INTERNAL_SERVER_ERROR, 'Cartão não encontrado'));
    };
    CartaoController.prototype.updateCartao = function (req, res) {
        var cartaoId = parseInt(req.params.id);
        var props = req.body;
        service_1.default.update(cartaoId, props)
            .then(_.partial(response_handlers_1.default.onSuccess, res, HttpStatus.OK))
            .catch(_.partial(response_handlers_1.default.onError, res, HttpStatus.INTERNAL_SERVER_ERROR, 'Falha ao atualizar cartão'));
    };
    CartaoController.prototype.deleteCartao = function (req, res) {
        var cartaoId = parseInt(req.params.id);
        service_1.default.delete(cartaoId)
            .then(_.partial(response_handlers_1.default.onSuccess, res, HttpStatus.OK))
            .catch(_.partial(response_handlers_1.default.onError, res, HttpStatus.INTERNAL_SERVER_ERROR, 'Erro ao excluir cartão'));
    };
    return CartaoController;
}());
exports.default = new CartaoController();
