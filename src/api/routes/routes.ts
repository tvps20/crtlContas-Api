import { Application } from 'express';
import UserRouter from '../../modules/User/routes';
import AuthService from '../../modules/Auth/service';
import CartaoRouter from '../../modules/Cartao/routes';
import FaturaRouter from '../../modules/Fatura/routes';

class Routes {

    constructor() { }

    initRoutes(app: Application, auth: any): void {
        app.route('/').get((req, res) => res.send('Hello, world!'));
        app.route('/login').post(AuthService.auth);
        this.getUserRoutes(app, auth);
        this.getCartaoRoutes(app, auth);
        this.getFaturaoRoutes(app, auth);
    }

    private getUserRoutes(app: Application, auth: any): void {
        app.route('/api/users').post(UserRouter.create);
        app.route('/api/users').all(auth.config().authenticate()).get(UserRouter.index);
        app.route('/api/users/:id').all(auth.config().authenticate()).get(UserRouter.findOnde);
        app.route('/api/users/:id').all(auth.config().authenticate()).put(UserRouter.update);
        app.route('/api/users/:id').all(auth.config().authenticate()).delete(UserRouter.delete);
    }

    private getCartaoRoutes(app: Application, auth: any): void {
        app.route('/api/cartao').get(CartaoRouter.index);
        app.route('/api/cartao').post(CartaoRouter.create);
        app.route('/api/cartao/:id').get(CartaoRouter.findOnde);
        app.route('/api/cartao/:id').put(CartaoRouter.update);
        app.route('/api/cartao/:id').delete(CartaoRouter.delete);
    }

    private getFaturaoRoutes(app: Application, auth: any): void {
        app.route('/api/Fatura').get(FaturaRouter.index);
        app.route('/api/Fatura').post(FaturaRouter.create);
        app.route('/api/Fatura/:id').get(FaturaRouter.findOnde);
        app.route('/api/Fatura/:id').put(FaturaRouter.update);
        app.route('/api/Fatura/:id').delete(FaturaRouter.delete);
    }
}

export default new Routes();