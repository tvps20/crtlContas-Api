import { Request, Response } from 'express';
import { Strategy, ExtractJwt } from 'passport-jwt';
import * as passport from 'passport';
import * as _ from 'lodash';
import UserService from '../User/service';
import ResponseHandlers from '../../api/handlers/response-handlers';
import * as HttpStatus from 'http-status';
const config = require('../../config/env/config')();

export default class AuthService {

    config() {
        let opts = {
            jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
            secretOrKey: config.secret
        };

        passport.use(new Strategy(opts, (jwtPayload, done) => {
            UserService.getById(jwtPayload.id).then(user => {
                if (user) {
                    return done(null, {
                        id: user.id,
                        email: user.email
                    });
                }

                return done(null, false);
            })
                .catch(error => {
                    done(error, null);
                })
        }));

        return {
            initialize: () => passport.initialize(),
            authenticate: () => passport.authenticate('jwt', { session: false })
        }
    }

    async auth(req: Request, res: Response) {
        const { email, password } = req.body;

        if (email && password) {
            try {
                const user = await UserService.getByEmail(email);
                ResponseHandlers.authSuccess(res, { email, password }, user);
            } catch (error) {
                ResponseHandlers.authFail(req, res);
            }
        }
        else {
            ResponseHandlers.onError(res, HttpStatus.UNAUTHORIZED, 'Necessário informar email e senha', 'no-credentials');
        }
    }
}