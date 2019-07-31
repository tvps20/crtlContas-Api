"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function dbErrorHandler(res, err, status) {
    console.log("Error db: " + err);
    res.status(status).json({
        code: 'ERRO-01',
        message: 'Erro ao criar usuário'
    });
}
exports.dbErrorHandler = dbErrorHandler;
