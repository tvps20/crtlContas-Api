import * as HTTPStatus from 'http-status';
import { app, request, expect } from './config/helpers';

describe('Testes de Integração', () => {
    describe('GET /', () => {
        it('Deve retornar a mensagem Hello, world!', done => {
            request(app)
            .get('/')
            .end((error, res) => {
                expect(res.status).to.equal(HTTPStatus.OK);
                expect(res.text).to.equal('Hello, world!');
                done(error);
            })
        });
    });

    describe('GET /api/users', () => {
        it('Deve retornar um json com todos os usuários', done => {
            request(app)
            .get('/api/users')
            .end((error, res) => {
                expect(res.status).to.equal(HTTPStatus.OK);
                done(error);
            })
        });
    });

    describe('POST /api/users', () => {
        it('Deve crair um usuário', done => {
            const user = { nome: 'test'}

            request(app)
            .post('/api/users')
            .send(user)
            .end((error, res) => {
                expect(res.status).to.equal(HTTPStatus.CREATED);
                done(error);
            })
        });
    });

    describe('GET /api/users/:id', () => {
        it('Deve retornar um json com um usuário', done => {
            request(app)
            .get(`/api/users/${1}`)
            .end((error, res) => {
                expect(res.status).to.equal(HTTPStatus.OK);
                done(error);
            })
        });
    });

    describe('PUT /api/users/:id', () => {
        it('Deve editar um usuário', done => {
            const user = { nome: 'testUpdate'}

            request(app)
            .put(`/api/users/${1}`)
            .send(user)
            .end((error, res) => {
                expect(res.status).to.equal(HTTPStatus.OK);
                done(error);
            })
        });
    });

    describe('DELETE /api/users/:id', () => {
        it('Deve deletar um usuário', done => {
            request(app)
            .delete(`/api/users/${1}`)
            .end((error, res) => {
                expect(res.status).to.equal(HTTPStatus.OK);
                done(error);
            })
        });
    });
})