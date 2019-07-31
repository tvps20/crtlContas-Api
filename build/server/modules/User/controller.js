"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HTTPStatus = require("http-status");
var _ = require("lodash");
var errorHandler_1 = require("../../api/responses/errorHandler");
var successHandler_1 = require("../../api/responses/successHandler");
var dbErrorHandler_1 = require("../../config/dbErrorHandler");
var service_1 = require("./service");
var UserController = /** @class */ (function () {
    function UserController() {
        this.userService = new service_1.default();
    }
    UserController.prototype.getAll = function (req, res) {
        this.userService.getAll()
            .then(_.partial(successHandler_1.onSuccess, res, HTTPStatus.OK))
            .catch(_.partial(errorHandler_1.onError, res, HTTPStatus.INTERNAL_SERVER_ERROR, 'Erro ao buscar todos os usuários'));
    };
    UserController.prototype.createUser = function (req, res) {
        this.userService.create(req.body)
            .then(_.partial(successHandler_1.onSuccess, res, HTTPStatus.CREATED))
            .catch(_.partial(dbErrorHandler_1.dbErrorHandler, res, HTTPStatus.INTERNAL_SERVER_ERROR))
            .catch(_.partial(errorHandler_1.onError, res, HTTPStatus.INTERNAL_SERVER_ERROR, 'Erro ao inserir novo usuário'));
    };
    UserController.prototype.getById = function (req, res) {
        var userId = parseInt(req.params.id);
        this.userService.getById(userId)
            .then(_.partial(successHandler_1.onSuccess, res, HTTPStatus.OK))
            .catch(_.partial(errorHandler_1.onError, res, HTTPStatus.INTERNAL_SERVER_ERROR, 'Usuário não encontrado'));
    };
    UserController.prototype.updateUser = function (req, res) {
        var userId = parseInt(req.params.id);
        var props = req.body;
        this.userService.update(userId, props)
            .then(_.partial(successHandler_1.onSuccess, res, HTTPStatus.OK))
            .catch(_.partial(errorHandler_1.onError, res, HTTPStatus.INTERNAL_SERVER_ERROR, 'Falha ao atualizar usuário'));
    };
    UserController.prototype.deleteUser = function (req, res) {
        var userId = parseInt(req.params.id);
        this.userService.delete(userId)
            .then(_.partial(successHandler_1.onSuccess, res, HTTPStatus.OK))
            .catch(_.partial(errorHandler_1.onError, res, HTTPStatus.INTERNAL_SERVER_ERROR, 'Erro ao excluir usuário'));
    };
    return UserController;
}());
exports.default = UserController;
