const Relations = (db) => {
    db.Cartao.hasMany(db.Fatura, {as: 'faturas', foreignKey: 'cartaoId'})
    db.Fatura.belongsTo(db.Cartao, { foreignKey: 'cartaoId'})
}

module.exports = Relations;