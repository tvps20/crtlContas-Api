import { testDouble, expect } from './config/helpers';
import UserService from '../../server/modules/User/service';
const db = require('../../server/models');

describe('Testes Unitarios do Controller', () => {

    const defaultUser = {
        id: 1,
        name: 'default',
        email: 'defaultuser@email.com',
        password: '1234'
    }

    beforeEach((done) => {
        db.User.destroy({
            where: {}
        })
            .then(() => {
                db.User.create(defaultUser).then(() => {
                    console.log(`Default User created`)
                    done();
                });
            })
    });

    describe('Metodo create', () => {
        it('Deve criar um novo usuários', () => {
            return UserService.create({
                id: 2,
                name: 'novo Usuario',
                email: 'novousuario@email.com',
                password: '1234'
            }).then(data => {
                expect(data.dataValues).to.have.all.keys([
                    'email', 'id', 'name', 'password', 'updatedAt', 'createdAt'
                ])
            });
        })
    })

    describe('Metodo Update', () => {
        it('Deve atualizar um usuários', () => {
            const usuarioAtualizado = {
                email: 'emailAtualizado@email.com',
            }

            return UserService.update(defaultUser.id, usuarioAtualizado).then(data => {
                expect(data[0]).to.be.equal(1);
            })
        })
    })

    describe('Metodo GET Users', () => {
        it('Deve retornar uma lista com todos os usuários', () => {
            return UserService.getAll().then(data => {
                expect(data).to.be.an('array');
            })
        })
    })

    describe('Metodo getById', () => {
        it('Deve retornar um usuario de acorto com o ID passado', () => {
            return UserService.getById(defaultUser.id).then(data => {
                expect(data).to.have.all.keys(
                    ['email', 'id', 'name', 'password']
                )
            })
        })
    })

    describe('Metodo getByEmail', () => {
        it('Deve retornar um usuario de acorto com o EMAIL passado', () => {
            return UserService.getByEmail(defaultUser.email).then(data => {
                expect(data).to.have.all.keys(
                    ['email', 'id', 'name', 'password']
                )
            })
        })
    })

    describe('Metodo Delete', () => {
        it('Deve deletar um usuario', () => {
            return UserService.delete(defaultUser.id).then(data => {
                expect(data).to.be.equal(1);
            })
        })
    })
})