import { IFatura, createFatura, createFaturas } from './interface';
import * as Bluebird from 'bluebird';
import { ICartao } from '../Cartao/interface';
const db = require('../../models');

class FaturaService implements IFatura {
    public id: number;
    public valor: number;
    public observacao: string;
    public cartaoId?: number;
    public Cartao?: ICartao[];

    create(fatura: any) {
        return db.Fatura.create(fatura);
    }

    getAll(): Bluebird<IFatura[]> {
        return db.Fatura.findAll({
            order: ['valor'],
            include: [{ model: db.Cartao }]
        })
            .then(createFaturas);
    }

    getById(id: number): Bluebird<IFatura> {
        return db.Fatura.findOne({
            where: { id },
            include: [{ model: db.Cartao }]
        })
            .then(createFatura);
    }

    // getByMes(nome: string): Bluebird<IFatura> {
    //     return db.Fatura.findOne({
    //         where: { mes }
    //     })
    //         .then(createFatura);
    // }

    update(id: number, fatura: any) {
        return db.Fatura.update(fatura, {
            where: { id },
            // Atualiza apenas esses campos
            fildes: ['valor', 'observacao', 'cartaoId'],
            // Criterio para o sequelize saber qual atualizar
            hooks: true,
            individualHooks: true
        });
    }

    delete(id: number) {
        return db.Fatura.destroy({
            where: { id }
        });
    }
}

export default new FaturaService();