import { testDouble, expect } from './config/helpers';
import UserService from '../../server/modules/User/service';

describe('Testes Unitarios do Controller', () => {
    // describe('Metodo create', () => {
    //     it('Deve criar um novo usuários', () => {
    //         const novoUsuario = {
    //             id: 1,
    //             email: 'novo Usuario',
    //             password: '1234'
    //         }

    //         const userService = new UserService();

    //         return userService.create(novoUsuario).then(data => {
    //             expect(data.dataValues).to.have.all.keys([
    //                 'email', 'id', 'password', 'updatedAt', 'createdAt'
    //             ])
    //         });
    //     })
    // })

    // describe('Metodo Update', () => {
    //     it('Deve atualizar um usuários', () => {
    //         const usuarioAtualizado = {
    //             email: 'emailAtualizado@email.com',
    //         }

    //         const userService = new UserService();

    //         return userService.update(1, usuarioAtualizado).then(data => {
    //             expect(data[0]).to.be.equal(1);
    //         })
    //     })
    // })

    // describe('Metodo GET Users', () => {
    //     it('Deve retornar uma lista com todos os usuários', () => {
    //       const userService = new UserService();   

    //       return userService.getAll().then(data => {
    //         expect(data).to.be.an('array');
    //         expect(data[0]).to.have.all.keys([
    //             'id', 'email', 'password'
    //         ])
    //       })
    //     })
    // })

    describe('Metodo getById', () => {
        it('Deve retornar um usuario de acorto com o ID passado', () => {
            const userService = new UserService();

            return userService.getById(1).then(data => {
                expect(data.id).to.be.equal(1);
                expect(data.email).to.be.equal('teste@email.com');
            })
        })
    })

    describe('Metodo getByEmail', () => {
        it('Deve retornar um usuario de acorto com o EMAIL passado', () => {
            const userService = new UserService();

            return userService.getByEmail('teste@email.com').then(data => {
                expect(data.id).to.be.equal(1);
                expect(data.email).to.be.equal('teste@email.com');
            })
        })
    })

    describe('Metodo Delete', () => {
        it('Deve deletar um usuario', () => {
            const userService = new UserService();

            return userService.delete(1).then(data => {
                expect(data).to.be.equal(1);
            })
        })
    })
})