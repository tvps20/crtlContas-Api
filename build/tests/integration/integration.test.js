"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HTTPStatus = require("http-status");
var helpers_1 = require("./config/helpers");
describe('Testes de Integração', function () {
    // Faz com que seja executado no modo extrito para a engine do node entenda as variaveis (let, const, var).
    'use strict';
    var config = require('../../server/config/env/config')();
    var db = require('../../server/models');
    var id;
    var userTest = {
        id: 100,
        name: 'test',
        email: 'test@email.com',
        password: 'teste'
    };
    var userDefault = {
        id: 101,
        name: 'default',
        email: 'default@email.com',
        password: 'teste'
    };
    beforeEach(function (done) {
        db.User.destroy({
            where: {}
        })
            .then(function () {
            return db.User.create(userDefault);
        })
            .then(function (user) {
            db.User.create(userTest)
                .then(function () {
                done();
            });
        });
    });
    describe('GET /', function () {
        it('Deve retornar a mensagem Hello, world!', function (done) {
            helpers_1.request(helpers_1.app)
                .get('/')
                .end(function (error, res) {
                helpers_1.expect(res.status).to.equal(HTTPStatus.OK);
                helpers_1.expect(res.text).to.equal('Hello, world!');
                done(error);
            });
        });
    });
    describe('GET /api/users', function () {
        it('Deve retornar um Array com todos os usuários', function (done) {
            helpers_1.request(helpers_1.app)
                .get('/api/users')
                .end(function (error, res) {
                helpers_1.expect(res.status).to.equal(HTTPStatus.OK);
                helpers_1.expect(res.body.payload).to.be.an('array');
                helpers_1.expect(res.body.payload[0].email).to.be.equal(userDefault.email);
                done(error);
            });
        });
    });
    describe('POST /api/users', function () {
        it('Deve crair um usuário', function (done) {
            var user = { id: 2, name: 'usuario', email: 'usuario@email.com', password: 'novouser' };
            helpers_1.request(helpers_1.app)
                .post('/api/users')
                .send(user)
                .end(function (error, res) {
                helpers_1.expect(res.status).to.equal(HTTPStatus.CREATED);
                helpers_1.expect(res.body.payload.id).to.eql(user.id);
                helpers_1.expect(res.body.payload.email).to.eql(user.email);
                done(error);
            });
        });
    });
    describe('GET /api/users/:id', function () {
        it('Deve retornar um json com um usuário', function (done) {
            helpers_1.request(helpers_1.app)
                .get("/api/users/" + userDefault.id)
                .end(function (error, res) {
                helpers_1.expect(res.status).to.equal(HTTPStatus.OK);
                helpers_1.expect(res.body.payload.id).to.equal(userDefault.id);
                helpers_1.expect(res.body.payload).to.have.all.keys([
                    'id', 'name', 'email', 'password'
                ]);
                id = res.body.payload.id;
                done(error);
            });
        });
    });
    describe('PUT /api/users/:id', function () {
        it('Deve editar um usuário', function (done) {
            var user = { email: 'emailAtualizado.email.com' };
            helpers_1.request(helpers_1.app)
                .put("/api/users/" + id)
                .send(user)
                .end(function (error, res) {
                helpers_1.expect(res.status).to.equal(HTTPStatus.OK);
                helpers_1.expect(res.body.payload[0]).to.eql(1);
                done(error);
            });
        });
    });
    describe('DELETE /api/users/:id', function () {
        it('Deve deletar um usuário', function (done) {
            helpers_1.request(helpers_1.app)
                .delete("/api/users/" + id)
                .end(function (error, res) {
                helpers_1.expect(res.status).to.equal(HTTPStatus.OK);
                helpers_1.expect(res.body.payload).to.eql(1);
                done(error);
            });
        });
    });
});
