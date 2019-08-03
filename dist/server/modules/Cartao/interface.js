"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createCartao(_a) {
    var id = _a.id, nome = _a.nome, bandeira = _a.bandeira, Faturas = _a.Faturas;
    return {
        id: id, nome: nome, bandeira: bandeira, Faturas: Faturas
    };
}
exports.createCartao = createCartao;
function createCartoes(data) {
    return data.map(createCartao);
}
exports.createCartoes = createCartoes;
