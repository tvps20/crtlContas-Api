import { Request, Response } from 'express';
import * as _ from 'lodash';
import UserService from '../User/service';
import ResponseHandlers from '../../api/handlers/response-handlers';
import * as HttpStatus from 'http-status';

class TokenRouter {

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

export default new TokenRouter();