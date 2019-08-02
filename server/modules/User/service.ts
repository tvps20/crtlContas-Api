import { IUser, IUserDetail, createUsers, createUserById, createUserByEmail } from './interface';
import * as Bluebird from 'bluebird';
const db = require('../../models');

class UserService implements IUser {
    public id: number;
    public name: string;
    public email: string;
    public password: string;

    constructor(){}

    create(user: any){
        return db.User.create(user);
    }

    getAll(): Bluebird<IUser[]>{
        return db.User.findAll({
            order: ['email']
        })
        .then(createUsers);
    }

    getById(id: number): Bluebird<IUserDetail>{
        return db.User.findOne({
            where: {id}
        })
        .then(createUserById);
    }

    getByEmail(email: string): Bluebird<IUserDetail>{
        return db.User.findOne({
            where: {email}
        })
        .then(createUserByEmail);
    }

    update(id: number, user: any){
        return db.User.update(user, {
            where: {id},
            // Atualiza apenas esses campos
            fildes: ['name', 'email', 'password'],
            // Criterio para o sequelize saber qual atualizar
            hooks: true,
            individualHooks: true
        });
    }

    delete(id: number){
        return db.User.destroy({
            where: {id}
        });
    }
}

export default new UserService();