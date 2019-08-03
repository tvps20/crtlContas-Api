"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var helpers_1 = require("./config/helpers");
var service_1 = require("../../src/modules/User/service");
var db = require('../../src/models');
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
            return service_1.default.create({
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
            return service_1.default.update(defaultUser.id, usuarioAtualizado).then(function (data) {
                helpers_1.expect(data[0]).to.be.equal(1);
            });
        });
    });
    describe('Metodo GET Users', function () {
        it('Deve retornar uma lista com todos os usuários', function () {
            return service_1.default.getAll().then(function (data) {
                helpers_1.expect(data).to.be.an('array');
            });
        });
    });
    describe('Metodo getById', function () {
        it('Deve retornar um usuario de acorto com o ID passado', function () {
            return service_1.default.getById(defaultUser.id).then(function (data) {
                helpers_1.expect(data).to.have.all.keys(['email', 'id', 'name', 'password']);
            });
        });
    });
    describe('Metodo getByEmail', function () {
        it('Deve retornar um usuario de acorto com o EMAIL passado', function () {
            return service_1.default.getByEmail(defaultUser.email).then(function (data) {
                helpers_1.expect(data).to.have.all.keys(['email', 'id', 'name', 'password']);
            });
        });
    });
    describe('Metodo Delete', function () {
        it('Deve deletar um usuario', function () {
            return service_1.default.delete(defaultUser.id).then(function (data) {
                helpers_1.expect(data).to.be.equal(1);
            });
        });
    });
});
