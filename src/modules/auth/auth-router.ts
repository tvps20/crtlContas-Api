import { Request, Response } from 'express';
import { BaseRouterModule, ModuleEndpointMap } from "../../core/router/base-routes-module";
// import UserService from '../user/user-service';
// import ResponseHandlers from '../../core/handlers/response-handlers';

export class AuthRouterModule extends BaseRouterModule {

    constructor() {
        super('auth');
    }

    protected MODULES_ENDPOINT_MAP: ModuleEndpointMap = {
        [this.mdouleName]: {
            post: [
                {
                    endpoint: `${this.context}/${this.version}/${this.mdouleName}/token`,
                    callback: this.auth,
                    isProtected: false
                }
            ]
        }
    }

    async auth(req: Request, res: Response) {
        const { email, password } = req.body;
        console.log(email, password);
        // if (email && password) {

        //     try {
        //         const user = await UserService.getByEmail(email);
        //         ResponseHandlers.authSuccess(res, password, user);
        //     } catch (error) {
        //         ResponseHandlers.authFail(req, res);
        //     }
        // } else {
        //     ResponseHandlers.onError(res, 'Necessário informar email e senha', 'no-credentials');
        // }
    }
}