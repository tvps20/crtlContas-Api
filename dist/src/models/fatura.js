"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(sequelize, DataTypes) {
    var Fatura = sequelize.define('Fatura', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        valor: {
            type: DataTypes.DECIMAL,
            allowNull: true
        },
        observacao: {
            type: DataTypes.STRING,
            allowNull: true
        },
        cartaoId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });
    return Fatura;
}
exports.default = default_1;
