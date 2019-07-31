"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HTTPStatus = require("http-status");
var service_1 = require("./service");
var UserController = /** @class */ (function () {
    function UserController() {
        this.userService = new service_1.default();
    }
    UserController.prototype.getAll = function (req, res) {
        this.userService.getAll().then(function (data) {
            res.status(HTTPStatus.OK).json({
                payload: data
            });
        })
            .catch(function (err) {
            res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({
                payload: 'Erro ao buscar todos os usuários'
            });
        });
    };
    UserController.prototype.createUser = function (req, res) {
        this.userService.create(req.body).then(function (data) {
            res.status(HTTPStatus.CREATED).json({
                payload: data
            });
        })
            .catch(function (err) {
            res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({
                payload: 'Erro ao criar um novo usuário'
            });
        });
    };
    UserController.prototype.getById = function (req, res) {
        var userId = parseInt(req.params.id);
        this.userService.getById(userId).then(function (data) {
            res.status(HTTPStatus.OK).json({ payload: data });
        })
            .catch(function (err) {
            res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({
                payload: 'Erro ao buscar usuário'
            });
        });
    };
    UserController.prototype.updateUser = function (req, res) {
        var userId = parseInt(req.params.id);
        var props = req.body;
        this.userService.update(userId, props).then(function (data) {
            res.status(HTTPStatus.OK).json({ payload: data });
        })
            .catch(function (err) {
            res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({
                payload: 'Erro ao atualizar usuário'
            });
        });
    };
    UserController.prototype.deleteUser = function (req, res) {
        var userId = parseInt(req.params.id);
        this.userService.delete(userId).then(function (data) {
            res.status(HTTPStatus.OK).json({ payload: data });
        })
            .catch(function (err) {
            res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({
                payload: 'Erro ao deletar usuário'
            });
        });
    };
    return UserController;
}());
exports.default = UserController;
