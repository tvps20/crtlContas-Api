import * as jwt from 'jwt-simple';
import * as HTTPStatus from 'http-status';
import { app, request, expect } from './config/helpers';

describe('Testes de Integração', () => {

    // Faz com que seja executado no modo extrito para a engine do node entenda as variaveis (let, const, var).
    'use strict';
    const config = require('../../src/config/env/config')();
    const db = require('../../src/models');

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
                console.log(`Default User created`);
                return db.User.create(userDefault);
            })
            .then((user) => {
                console.log(`Gerando token`);
                console.log(user.id);
                token = jwt.encode({ id: user.id }, config.secret);
                done();
            });
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
})