export default function (sequelize, DataTypes) {

    const Cartao = sequelize.define('Cartao', {
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
    })

    return Cartao;
}