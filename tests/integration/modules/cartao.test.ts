import * as jwt from 'jwt-simple';
import * as HTTPStatus from 'http-status';
import { app, request, expect } from '../config/helpers';

describe('Testando Cartões', () => {

    // Faz com que seja executado no modo extrito para a engine do node entenda as variaveis (let, const, var).
    'use strict';
    const config = require('../../../src/config/env/config')();
    const db = require('../../../src/models');

    let token;

    const userDefault = {
        id: 101,
        name: 'default',
        email: 'default@email.com',
        password: 'teste'
    };

    const cartaoDefault = {
        id: 101,
        nome: 'default',
        bandeira: 'default',
    };

    beforeEach((done) => {
        db.User.destroy({
            where: {}
        })
            .then(() => {
                console.log(`Default User created`);
                return db.User.create(userDefault);
            })
            .then((user) => {
                console.log(`Gerando token`);
                token = jwt.encode({ id: user.id }, config.secret);
            })
            .then(() => {
                db.Cartao.destroy({
                    where: {}
                })
            })
            .then(() => {
                console.log(`Default User created`);
                db.Cartao.create(cartaoDefault);
                done();
            });  
    });


    describe('GET /api/cartao', () => {
        it('Deve retornar um Array com todos os cartões', done => {
            request(app)
                .get('/api/cartao')
                .set('Content-Type', 'application/json')
                .set('Authorization', `jwt ${token}`)
                .end((error, res) => {
                    expect(res.status).to.equal(HTTPStatus.OK);
                    expect(res.body.payload).to.be.an('array');
                    expect(res.body.payload[0].nome).to.be.equal(cartaoDefault.nome)
                    done(error);
                })
        });
    });

    describe('POST /api/cartao', () => {
        it('Deve crair um cartao', done => {
            const cartao = { id: 102, nome: 'cartao', bandeira: 'bandeira' }

            request(app)
                .post('/api/cartao')
                .set('Content-Type', 'application/json')
                .set('Authorization', `JWT ${token}`)
                .send(cartao)
                .end((error, res) => {
                    expect(res.status).to.equal(HTTPStatus.CREATED);
                    expect(res.body.payload.id).to.eql(cartao.id)
                    expect(res.body.payload.nome).to.eql(cartao.nome)
                    expect(res.body.payload.bandeira).to.eql(cartao.bandeira)
                    done(error);
                })
        });
    });

    describe('GET /api/cartao/:id', () => {
        it('Deve retornar um json com um cartao', done => {
            request(app)
                .get(`/api/cartao/${cartaoDefault.id}`)
                .set('Content-Type', 'application/json')
                .set('Authorization', `JWT ${token}`)
                .end((error, res) => {
                    expect(res.status).to.equal(HTTPStatus.OK);
                    expect(res.body.payload.id).to.equal(cartaoDefault.id)
                    expect(res.body.payload).to.have.all.keys([
                        'id', 'nome', 'bandeira', 'Faturas'
                    ])
                    done(error);
                })
        });
    });

    describe('PUT /api/cartao/:id', () => {
        it('Deve editar um cartao', done => {
            const cartao = { nome: 'cartaoAtualizado' }

            request(app)
                .put(`/api/cartao/${cartaoDefault.id}`)
                .set('Content-Type', 'application/json')
                .set('Authorization', `JWT ${token}`)
                .send(cartao)
                .end((error, res) => {
                    expect(res.status).to.equal(HTTPStatus.OK);
                    expect(res.body.payload[0]).to.eql(1);
                    done(error);
                })
        });
    });

    describe('DELETE /api/cartao/:id', () => {
        it('Deve deletar um cartao', done => {
            request(app)
                .delete(`/api/cartao/${cartaoDefault.id}`)
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