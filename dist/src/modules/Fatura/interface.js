"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createFatura(_a) {
    var id = _a.id, valor = _a.valor, observacao = _a.observacao, Cartao = _a.Cartao;
    return {
        id: id, valor: valor, observacao: observacao, Cartao: Cartao
    };
}
exports.createFatura = createFatura;
function createFaturas(data) {
    return data.map(createFatura);
}
exports.createFaturas = createFaturas;
