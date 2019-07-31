import { IUser, IUserDetail, createUsers, createUserById, createUserByEmail } from './interface';
import * as Bluebird from 'bluebird';
const model = require('../../models');

class UserService implements IUser {
    public id: number;
    public email: string;
    public password: string;

    constructor(){}

    create(user: any){
        return model.User.create(user);
    }

    getAll(): Bluebird<IUser[]>{
        return model.User.findAll({
            order: ['email']
        })
        .then(createUsers);
    }

    getById(id: number): Bluebird<IUserDetail>{
        return model.User.findOne({
            where: {id}
        })
        .then(createUserById);
    }

    getByEmail(email: string): Bluebird<IUserDetail>{
        return model.User.findOne({
            where: {email}
        })
        .then(createUserByEmail);
    }

    update(id: number, user: any){
        return model.User.update(user, {
            where: {id},
            // Atualiza apenas esses campos
            fildes: [
                'email', 'password'
            ]
        });
    }

    delete(id: number){
        return model.User.destroy({
            where: {id}
        });
    }
}

export default UserService;