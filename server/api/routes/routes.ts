import { Application } from 'express';
import UserRoutes from '../../modules/User/routes';
import TokenRoute from '../../modules/Auth/auth';
import CartaoRoute from '../../modules/Cartao/routes';

class Routes {

    constructor(){}

    initRoutes(app: Application, auth: any): void{
        app.route('/').get((req, res) => res.send('Hello, world!'));
        app.route('/login').post(TokenRoute.auth);
        this.getUserRoutes(app, auth);
        this.getCartaoRoutes(app, auth);
    }

    private getUserRoutes(app: Application, auth: any): void {
        app.route('/api/users').all(auth.config().authenticate()).get(UserRoutes.index);
        app.route('/api/users').all(auth.config().authenticate()).post(UserRoutes.create);
        app.route('/api/users/:id').all(auth.config().authenticate()).get(UserRoutes.findOnde);
        app.route('/api/users/:id').all(auth.config().authenticate()).put(UserRoutes.update);
        app.route('/api/users/:id').all(auth.config().authenticate()).delete(UserRoutes.delete);
    }

    private getCartaoRoutes(app: Application, auth: any): void {
        app.route('/api/cartao').get(CartaoRoute.index);
        app.route('/api/cartao').post(CartaoRoute.create);
        app.route('/api/cartao/:id').get(CartaoRoute.findOnde);
        app.route('/api/cartao/:id').put(CartaoRoute.update);
        app.route('/api/cartao/:id').delete(CartaoRoute.delete);
    }
}

export default new Routes();