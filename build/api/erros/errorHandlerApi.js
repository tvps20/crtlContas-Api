"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function errorHandlerApi(err, req, res, next) {
    console.log("Api error handler foi executada: " + err);
    res.status(500).json({
        errorCode: 'ERR-001',
        message: 'Error Interno do Servidor'
    });
}
exports.errorHandlerApi = errorHandlerApi;
