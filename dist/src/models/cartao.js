"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(sequelize, DataTypes) {
    var Cartao = sequelize.define('Cartao', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        bandeira: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    });
    return Cartao;
}
exports.default = default_1;
