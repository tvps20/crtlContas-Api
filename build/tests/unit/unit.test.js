"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var helpers_1 = require("./config/helpers");
var service_1 = require("../../server/modules/User/service");
describe('Testes Unitarios do Controller', function () {
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
    describe('Metodo getById', function () {
        it('Deve retornar um usuario de acorto com o ID passado', function () {
            var userService = new service_1.default();
            return userService.getById(1).then(function (data) {
                helpers_1.expect(data.id).to.be.equal(1);
                helpers_1.expect(data.email).to.be.equal('teste@email.com');
            });
        });
    });
    describe('Metodo getByEmail', function () {
        it('Deve retornar um usuario de acorto com o EMAIL passado', function () {
            var userService = new service_1.default();
            return userService.getByEmail('teste@email.com').then(function (data) {
                helpers_1.expect(data.id).to.be.equal(1);
                helpers_1.expect(data.email).to.be.equal('teste@email.com');
            });
        });
    });
    describe('Metodo Delete', function () {
        it('Deve deletar um usuario', function () {
            var userService = new service_1.default();
            return userService.delete(1).then(function (data) {
                helpers_1.expect(data).to.be.equal(1);
            });
        });
    });
});
