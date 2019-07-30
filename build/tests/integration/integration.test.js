"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var helpers_1 = require("./config/helpers");
describe('Testes de Integração', function () {
    describe('GET /', function () {
        it('Deve retornar a mensagem Hello, world!', function (done) {
            helpers_1.request(helpers_1.app)
                .get('/')
                .end(function (error, res) {
                helpers_1.expect(res.status).to.equal(200);
                helpers_1.expect(res.text).to.equal('Hello, world!');
                done(error);
            });
        });
    });
    describe('GET /api/users', function () {
        it('Deve retornar um json com todos os usuários', function (done) {
            helpers_1.request(helpers_1.app)
                .get('/api/users')
                .end(function (error, res) {
                helpers_1.expect(res.status).to.equal(200);
                done(error);
            });
        });
    });
    describe('GET /api/users/:id', function () {
        it('Deve retornar um json com um usuário', function (done) {
            helpers_1.request(helpers_1.app)
                .get("/api/users/" + 1)
                .end(function (error, res) {
                helpers_1.expect(res.status).to.equal(200);
                done(error);
            });
        });
    });
    describe('POST /api/users', function () {
        it('Deve crair um usuário', function (done) {
            var user = { nome: 'test' };
            helpers_1.request(helpers_1.app)
                .post('/api/users')
                .send(user)
                .end(function (error, res) {
                helpers_1.expect(res.status).to.equal(200);
                done(error);
            });
        });
    });
    describe('PUT /api/users/:id', function () {
        it('Deve editar um usuário', function (done) {
            var user = { nome: 'testUpdate' };
            helpers_1.request(helpers_1.app)
                .put("/api/users/" + 1)
                .send(user)
                .end(function (error, res) {
                helpers_1.expect(res.status).to.equal(200);
                done(error);
            });
        });
    });
    describe('DELETE /api/users/:id', function () {
        it('Deve deletar um usuário', function (done) {
            helpers_1.request(helpers_1.app)
                .delete("/api/users/" + 1)
                .end(function (error, res) {
                helpers_1.expect(res.status).to.equal(200);
                done(error);
            });
        });
    });
});
