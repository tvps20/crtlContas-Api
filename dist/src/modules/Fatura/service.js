"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var interface_1 = require("./interface");
var db = require('../../models');
var FaturaService = /** @class */ (function () {
    function FaturaService() {
    }
    FaturaService.prototype.create = function (fatura) {
        return db.Fatura.create(fatura);
    };
    FaturaService.prototype.getAll = function () {
        return db.Fatura.findAll({
            order: ['valor'],
            include: [{ model: db.Cartao }]
        })
            .then(interface_1.createFaturas);
    };
    FaturaService.prototype.getById = function (id) {
        return db.Fatura.findOne({
            where: { id: id },
            include: [{ model: db.Cartao }]
        })
            .then(interface_1.createFatura);
    };
    // getByMes(nome: string): Bluebird<IFatura> {
    //     return db.Fatura.findOne({
    //         where: { mes }
    //     })
    //         .then(createFatura);
    // }
    FaturaService.prototype.update = function (id, fatura) {
        return db.Fatura.update(fatura, {
            where: { id: id },
            // Atualiza apenas esses campos
            fildes: ['valor', 'observacao', 'cartaoId'],
            // Criterio para o sequelize saber qual atualizar
            hooks: true,
            individualHooks: true
        });
    };
    FaturaService.prototype.delete = function (id) {
        return db.Fatura.destroy({
            where: { id: id }
        });
    };
    return FaturaService;
}());
exports.default = new FaturaService();
