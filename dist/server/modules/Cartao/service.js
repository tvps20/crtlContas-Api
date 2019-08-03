"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var interface_1 = require("./interface");
var db = require('../../models');
var CartaoService = /** @class */ (function () {
    function CartaoService() {
    }
    CartaoService.prototype.create = function (cartao) {
        return db.Cartao.create(cartao);
    };
    CartaoService.prototype.getAll = function () {
        return db.Cartao.findAll({
            order: ['nome']
        })
            .then(interface_1.createCartoes);
    };
    CartaoService.prototype.getById = function (id) {
        return db.Cartao.findOne({
            where: { id: id }
        })
            .then(interface_1.createCartao);
    };
    CartaoService.prototype.getByNome = function (nome) {
        return db.Cartao.findOne({
            where: { nome: nome }
        })
            .then(interface_1.createCartao);
    };
    CartaoService.prototype.update = function (id, cartao) {
        return db.Cartao.update(cartao, {
            where: { id: id },
            // Atualiza apenas esses campos
            fildes: ['nome', 'bandeira'],
            // Criterio para o sequelize saber qual atualizar
            hooks: true,
            individualHooks: true
        });
    };
    CartaoService.prototype.delete = function (id) {
        return db.Cartao.destroy({
            where: { id: id }
        });
    };
    return CartaoService;
}());
exports.default = new CartaoService();
