export default function (sequelize, DataTypes) {

    const Fatura = sequelize.define('Fatura', {
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
    })

    return Fatura;
}