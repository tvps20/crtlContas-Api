const Relations = (db: any) => {
    db.Cartao.hasMany(db.Fatura, { as: 'faturas', foreignKey: 'cartaoId' })
    db.Fatura.belongsTo(db.Cartao, { foreignKey: 'cartaoId' })
}

module.exports = Relations;