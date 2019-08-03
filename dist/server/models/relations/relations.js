var Relations = function (db) {
    db.Cartao.hasMany(db.Fatura, { foreignKey: 'cartaoId' });
    db.Fatura.belongsTo(db.Cartao, { foreignKey: 'cartaoId' });
};
module.exports = Relations;
