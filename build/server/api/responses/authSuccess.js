"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jwt = require("jwt-simple");
var HttpStatus = require("http-status");
var config = require('../../config/env/config')();
function authSuccess(res, credential, data) {
    var isMatch = (credential.password == data.password);
    if (isMatch) {
        var payload = { id: data.id };
        res.json({
            token: jwt.encode(payload, config.secret)
        });
    }
    else {
        res.sendStatus(HttpStatus.UNAUTHORIZED);
    }
}
exports.default = authSuccess;
