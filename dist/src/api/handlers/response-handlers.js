"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HttpStatus = require("http-status");
var jwt = require("jwt-simple");
var bcrypt = require("bcrypt");
var config = require('../../config/env/config')();
var ResponseHandlers = /** @class */ (function () {
    function ResponseHandlers() {
    }
    ResponseHandlers.prototype.authFail = function (req, res) {
        res.sendStatus(HttpStatus.UNAUTHORIZED);
    };
    ResponseHandlers.prototype.authSuccess = function (res, credential, data) {
        var isMatch = bcrypt.compareSync(credential.password, data.password);
        if (isMatch) {
            var payload = { id: data.id };
            res.json({
                token: jwt.encode(payload, config.secret)
            });
        }
        else {
            res.sendStatus(HttpStatus.UNAUTHORIZED);
        }
    };
    ResponseHandlers.prototype.onError = function (res, status, message, err) {
        console.log("Error: " + err);
        res.status(status).send(message);
    };
    ResponseHandlers.prototype.onSuccess = function (res, status, data) {
        res.status(status).json({ payload: data });
    };
    ResponseHandlers.prototype.errorHandlerApi = function (err, req, res, next) {
        console.log("Api error handler foi executada: " + err);
        res.status(500).json({
            errorCode: 'ERR-001',
            message: 'Error Interno do Servidor'
        });
    };
    ResponseHandlers.prototype.dbErrorHandler = function (res, status, err) {
        console.log("Error db: " + err);
        res.status(status).json({
            code: 'ERRO-01',
            message: 'Erro ao criar entidade'
        });
    };
    return ResponseHandlers;
}());
exports.default = new ResponseHandlers();
