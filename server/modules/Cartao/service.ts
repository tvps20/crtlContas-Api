import { ICartao, createCartao, createCartoes } from './interface';
import * as Bluebird from 'bluebird';
const db = require('../../models');

class CartaoService implements ICartao {
    public id: number;
    public nome: string;
    public bandeira: string;

    create(cartao: any) {
        return db.Cartao.create(cartao);
    }

    getAll(): Bluebird<ICartao[]> {
        return db.Cartao.findAll({
            order: ['nome']
        })
            .then(createCartoes);
    }

    getById(id: number): Bluebird<ICartao> {
        return db.Cartao.findOne({
            where: { id }
        })
            .then(createCartao);
    }

    getByNome(nome: string): Bluebird<ICartao> {
        return db.Cartao.findOne({
            where: { nome }
        })
            .then(createCartao);
    }

    update(id: number, cartao: any) {
        return db.Cartao.update(cartao, {
            where: { id },
            // Atualiza apenas esses campos
            fildes: ['nome', 'bandeira'],
            // Criterio para o sequelize saber qual atualizar
            hooks: true,
            individualHooks: true
        });
    }

    delete(id: number) {
        return db.Cartao.destroy({
            where: { id }
        });
    }
}

export default new CartaoService();