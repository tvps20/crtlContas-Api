"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HTTPStatus = require("http-status");
var UserController = /** @class */ (function () {
    function UserController() {
    }
    UserController.prototype.getAll = function (req, res) {
        res.status(HTTPStatus.OK).json({
            message: 'Ok'
        });
    };
    UserController.prototype.createUser = function (req, res) {
        res.status(HTTPStatus.CREATED).json({
            message: 'Ok'
        });
    };
    UserController.prototype.getById = function (req, res) {
        res.status(HTTPStatus.OK).json({
            message: 'Ok'
        });
    };
    UserController.prototype.updateUser = function (req, res) {
        res.status(HTTPStatus.OK).json({
            message: 'Ok'
        });
    };
    UserController.prototype.deleteUser = function (req, res) {
        res.status(HTTPStatus.OK).json({
            message: 'Ok'
        });
    };
    return UserController;
}());
exports.default = UserController;
