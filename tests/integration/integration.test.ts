import * as jwt from 'jwt-simple';
import * as HTTPStatus from 'http-status';
import { app, request, expect } from './config/helpers';
import user from '../../server/models/user';

describe('Testes de Integração', () => {

    // Faz com que seja executado no modo extrito para a engine do node entenda as variaveis (let, const, var).
    'use strict';
    const config = require('../../server/config/env/config')();
    const db = require('../../server/models');

    let id;
    let token;

    const userTest = {
        id: 100,
        name: 'test',
        email: 'test@email.com',
        password: '123'
    };

    const userDefault = {
        id: 101,
        name: 'default',
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
                        token = jwt.encode({id: user.id}, config.secret);
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

    describe('POST /login', () => {
        it('Deve receber um JWT', done => {
            const credentials = {
                email: userDefault.email,
                password: userDefault.password
            };

            request(app)
            .post('/login')
            .send(credentials)
            .end((error, res) => {
                expect(res.status).to.equal(HTTPStatus.OK);
                expect(res.body.token).to.equal(`${token}`);
                done(error);
            })
        });

        it('Não deve gerar Token', done => {
            const credentials = {
                email: 'errado@emal.com',
                password: 'errado'
            };

            request(app)
            .post('/login')
            .send(credentials)
            .end((error, res) => {
                expect(res.status).to.equal(HTTPStatus.UNAUTHORIZED);
                expect(res.body).to.empty;
                done(error);
            })
        })
    });


    describe('GET /api/users', () => {
        it('Deve retornar um Array com todos os usuários', done => {
            request(app)
                .get('/api/users')
                .set('Content-Type', 'application/json')
                .set('Authorization', `jwt ${token}`)
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
            const user = { id: 2, name: 'usuario', email: 'usuario@email.com', password: 'novouser' }

            request(app)
                .post('/api/users')
                .set('Content-Type', 'application/json')
                .set('Authorization', `JWT ${token}`)
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
                .set('Content-Type', 'application/json')
                .set('Authorization', `JWT ${token}`)
                .end((error, res) => {
                    expect(res.status).to.equal(HTTPStatus.OK);
                    expect(res.body.payload.id).to.equal(userDefault.id)
                    expect(res.body.payload).to.have.all.keys([
                        'id', 'name', 'email', 'password'
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
                .set('Content-Type', 'application/json')
                .set('Authorization', `JWT ${token}`)
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
                .set('Content-Type', 'application/json')
                .set('Authorization', `JWT ${token}`)
                .end((error, res) => {
                    expect(res.status).to.equal(HTTPStatus.OK);
                    expect(res.body.payload).to.eql(1);
                    done(error);
                })
        });
    });
})