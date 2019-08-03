"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HTTPStatus = require("http-status");
var _ = require("lodash");
var handlers_1 = require("../../api/responses/handlers");
var service_1 = require("./service");
var UserController = /** @class */ (function () {
    function UserController() {
    }
    UserController.prototype.getAll = function (req, res) {
        service_1.default.getAll()
            .then(_.partial(handlers_1.default.onSuccess, res, HTTPStatus.OK))
            .catch(_.partial(handlers_1.default.onError, res, HTTPStatus.INTERNAL_SERVER_ERROR, 'Erro ao buscar todos os usuários'));
    };
    UserController.prototype.createUser = function (req, res) {
        service_1.default.create(req.body)
            .then(_.partial(handlers_1.default.onSuccess, res, HTTPStatus.CREATED))
            .catch(_.partial(handlers_1.default.dbErrorHandler, res, HTTPStatus.INTERNAL_SERVER_ERROR))
            .catch(_.partial(handlers_1.default.onError, res, HTTPStatus.INTERNAL_SERVER_ERROR, 'Erro ao inserir novo usuário'));
    };
    UserController.prototype.getById = function (req, res) {
        var userId = parseInt(req.params.id);
        service_1.default.getById(userId)
            .then(_.partial(handlers_1.default.onSuccess, res, HTTPStatus.OK))
            .catch(_.partial(handlers_1.default.onError, res, HTTPStatus.INTERNAL_SERVER_ERROR, 'Usuário não encontrado'));
    };
    UserController.prototype.updateUser = function (req, res) {
        var userId = parseInt(req.params.id);
        var props = req.body;
        service_1.default.update(userId, props)
            .then(_.partial(handlers_1.default.onSuccess, res, HTTPStatus.OK))
            .catch(_.partial(handlers_1.default.onError, res, HTTPStatus.INTERNAL_SERVER_ERROR, 'Falha ao atualizar usuário'));
    };
    UserController.prototype.deleteUser = function (req, res) {
        var userId = parseInt(req.params.id);
        service_1.default.delete(userId)
            .then(_.partial(handlers_1.default.onSuccess, res, HTTPStatus.OK))
            .catch(_.partial(handlers_1.default.onError, res, HTTPStatus.INTERNAL_SERVER_ERROR, 'Erro ao excluir usuário'));
    };
    return UserController;
}());
exports.default = new UserController();
