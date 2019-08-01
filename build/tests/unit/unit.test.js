"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var helpers_1 = require("./config/helpers");
var service_1 = require("../../server/modules/User/service");
var db = require('../../server/models');
describe('Testes Unitarios do Controller', function () {
    var defaultUser = {
        id: 1,
        name: 'default',
        email: 'defaultuser@email.com',
        password: '1234'
    };
    beforeEach(function (done) {
        db.User.destroy({
            where: {}
        })
            .then(function () {
            db.User.create(defaultUser).then(function () {
                console.log("Default User created");
                done();
            });
        });
    });
    describe('Metodo create', function () {
        it('Deve criar um novo usuários', function () {
            var userService = new service_1.default();
            return userService.create({
                id: 2,
                name: 'novo Usuario',
                email: 'novousuario@email.com',
                password: '1234'
            }).then(function (data) {
                helpers_1.expect(data.dataValues).to.have.all.keys([
                    'email', 'id', 'name', 'password', 'updatedAt', 'createdAt'
                ]);
            });
        });
    });
    describe('Metodo Update', function () {
        it('Deve atualizar um usuários', function () {
            var usuarioAtualizado = {
                email: 'emailAtualizado@email.com',
            };
            var userService = new service_1.default();
            return userService.update(defaultUser.id, usuarioAtualizado).then(function (data) {
                helpers_1.expect(data[0]).to.be.equal(1);
            });
        });
    });
    describe('Metodo GET Users', function () {
        it('Deve retornar uma lista com todos os usuários', function () {
            var userService = new service_1.default();
            return userService.getAll().then(function (data) {
                helpers_1.expect(data).to.be.an('array');
                helpers_1.expect(data[0]).to.have.all.keys([
                    'id', 'email', 'name', 'password'
                ]);
            });
        });
    });
    describe('Metodo getById', function () {
        it('Deve retornar um usuario de acorto com o ID passado', function () {
            var userService = new service_1.default();
            return userService.getById(defaultUser.id).then(function (data) {
                helpers_1.expect(data).to.have.all.keys(['email', 'id', 'name', 'password']);
            });
        });
    });
    describe('Metodo getByEmail', function () {
        it('Deve retornar um usuario de acorto com o EMAIL passado', function () {
            var userService = new service_1.default();
            return userService.getByEmail(defaultUser.email).then(function (data) {
                helpers_1.expect(data).to.have.all.keys(['email', 'id', 'name', 'password']);
            });
        });
    });
    describe('Metodo Delete', function () {
        it('Deve deletar um usuario', function () {
            var userService = new service_1.default();
            return userService.delete(defaultUser.id).then(function (data) {
                helpers_1.expect(data).to.be.equal(1);
            });
        });
    });
});
