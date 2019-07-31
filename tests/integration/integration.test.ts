import * as HTTPStatus from 'http-status';
import { app, request, expect } from './config/helpers';

describe('Testes de Integração', () => {

    // Faz com que seja executado no modo extrito para a engine do node entenda as variaveis (let, const, var).
    'use strict';
    const config = require('../../server/config/env/config')();
    const db = require('../../server/models');

    let id;

    const userTest = {
        id: 100,
        email: 'test@email.com',
        password: 'teste'
    };

    const userDefault = {
        id: 101,
        email: 'default@email.com',
        password: 'teste'
    };

    beforeEach((done) => {
        db.User.destroy({
            where: {}
        })
            .then(() => {
                return db.User.create(userDefault);
            })
            .then(user => {
                db.User.create(userTest)
                    .then(() => {
                        done();
                    })
            })
    });

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
        it('Deve retornar um Array com todos os usuários', done => {
            request(app)
                .get('/api/users')
                .end((error, res) => {
                    expect(res.status).to.equal(HTTPStatus.OK);
                    expect(res.body.payload).to.be.an('array');
                    expect(res.body.payload[0].email).to.be.equal(userDefault.email)
                    done(error);
                })
        });
    });

    describe('POST /api/users', () => {
        it('Deve crair um usuário', done => {
            const user = { id: 2, email: 'usuario@email.com', password: 'novouser' }

            request(app)
                .post('/api/users')
                .send(user)
                .end((error, res) => {
                    expect(res.status).to.equal(HTTPStatus.CREATED);
                    expect(res.body.payload.id).to.eql(user.id)
                    expect(res.body.payload.email).to.eql(user.email)
                    done(error);
                })
        });
    });

    describe('GET /api/users/:id', () => {
        it('Deve retornar um json com um usuário', done => {
            request(app)
                .get(`/api/users/${userDefault.id}`)
                .end((error, res) => {
                    expect(res.status).to.equal(HTTPStatus.OK);
                    expect(res.body.payload.id).to.equal(userDefault.id)
                    expect(res.body.payload).to.have.all.keys([
                        'id', 'email', 'password'
                    ])
                    id = res.body.payload.id;
                    done(error);
                })
        });
    });

    describe('PUT /api/users/:id', () => {
        it('Deve editar um usuário', done => {
            const user = { email: 'emailAtualizado.email.com' }

            request(app)
                .put(`/api/users/${id}`)
                .send(user)
                .end((error, res) => {
                    expect(res.status).to.equal(HTTPStatus.OK);
                    expect(res.body.payload[0]).to.eql(1);
                    done(error);
                })
        });
    });

    describe('DELETE /api/users/:id', () => {
        it('Deve deletar um usuário', done => {
            request(app)
                .delete(`/api/users/${id}`)
                .end((error, res) => {
                    expect(res.status).to.equal(HTTPStatus.OK);
                    expect(res.body.payload).to.eql(1);
                    done(error);
                })
        });
    });
})