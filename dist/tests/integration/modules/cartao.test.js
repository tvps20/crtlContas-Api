"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jwt = require("jwt-simple");
var HTTPStatus = require("http-status");
var helpers_1 = require("../config/helpers");
describe('Testando Cartões', function () {
    // Faz com que seja executado no modo extrito para a engine do node entenda as variaveis (let, const, var).
    'use strict';
    var config = require('../../../src/config/env/config')();
    var db = require('../../../src/models');
    var token;
    var userDefault = {
        id: 101,
        name: 'default',
        email: 'default@email.com',
        password: 'teste'
    };
    var cartaoDefault = {
        id: 101,
        nome: 'default',
        bandeira: 'default',
    };
    beforeEach(function (done) {
        db.User.destroy({
            where: {}
        })
            .then(function () {
            console.log("Default User created");
            return db.User.create(userDefault);
        })
            .then(function (user) {
            console.log("Gerando token");
            token = jwt.encode({ id: user.id }, config.secret);
        })
            .then(function () {
            db.Cartao.destroy({
                where: {}
            });
        })
            .then(function () {
            console.log("Default User created");
            db.Cartao.create(cartaoDefault);
            done();
        });
    });
    describe('GET /api/cartao', function () {
        it('Deve retornar um Array com todos os cartões', function (done) {
            helpers_1.request(helpers_1.app)
                .get('/api/cartao')
                .set('Content-Type', 'application/json')
                .set('Authorization', "jwt " + token)
                .end(function (error, res) {
                helpers_1.expect(res.status).to.equal(HTTPStatus.OK);
                helpers_1.expect(res.body.payload).to.be.an('array');
                helpers_1.expect(res.body.payload[0].nome).to.be.equal(cartaoDefault.nome);
                done(error);
            });
        });
    });
    describe('POST /api/cartao', function () {
        it('Deve crair um cartao', function (done) {
            var cartao = { id: 102, nome: 'cartao', bandeira: 'bandeira' };
            helpers_1.request(helpers_1.app)
                .post('/api/cartao')
                .set('Content-Type', 'application/json')
                .set('Authorization', "JWT " + token)
                .send(cartao)
                .end(function (error, res) {
                helpers_1.expect(res.status).to.equal(HTTPStatus.CREATED);
                helpers_1.expect(res.body.payload.id).to.eql(cartao.id);
                helpers_1.expect(res.body.payload.nome).to.eql(cartao.nome);
                helpers_1.expect(res.body.payload.bandeira).to.eql(cartao.bandeira);
                done(error);
            });
        });
    });
    describe('GET /api/cartao/:id', function () {
        it('Deve retornar um json com um cartao', function (done) {
            helpers_1.request(helpers_1.app)
                .get("/api/cartao/" + cartaoDefault.id)
                .set('Content-Type', 'application/json')
                .set('Authorization', "JWT " + token)
                .end(function (error, res) {
                helpers_1.expect(res.status).to.equal(HTTPStatus.OK);
                helpers_1.expect(res.body.payload.id).to.equal(cartaoDefault.id);
                helpers_1.expect(res.body.payload).to.have.all.keys([
                    'id', 'nome', 'bandeira', 'Faturas'
                ]);
                done(error);
            });
        });
    });
    describe('PUT /api/cartao/:id', function () {
        it('Deve editar um cartao', function (done) {
            var cartao = { nome: 'cartaoAtualizado' };
            helpers_1.request(helpers_1.app)
                .put("/api/cartao/" + cartaoDefault.id)
                .set('Content-Type', 'application/json')
                .set('Authorization', "JWT " + token)
                .send(cartao)
                .end(function (error, res) {
                helpers_1.expect(res.status).to.equal(HTTPStatus.OK);
                helpers_1.expect(res.body.payload[0]).to.eql(1);
                done(error);
            });
        });
    });
    describe('DELETE /api/cartao/:id', function () {
        it('Deve deletar um cartao', function (done) {
            helpers_1.request(helpers_1.app)
                .delete("/api/cartao/" + cartaoDefault.id)
                .set('Content-Type', 'application/json')
                .set('Authorization', "JWT " + token)
                .end(function (error, res) {
                helpers_1.expect(res.status).to.equal(HTTPStatus.OK);
                helpers_1.expect(res.body.payload).to.eql(1);
                done(error);
            });
        });
    });
});
