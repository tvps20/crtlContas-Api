import { Application } from 'express';
import AuthService from '../../modules/Auth/service';
import UserController from '../../modules/User/controller';
import CartaoController from '../../modules/Cartao/controller';
import FaturaController from '../../modules/Fatura/controller';

export default class Routes {

    private app: Application;
    private authService: AuthService;

    constructor(app: Application, auth: AuthService) {
        this.app = app;
        this.authService = auth;
    }

    initRoutes(): void {
        this.app.route('/').get((req, res) => res.send('Hello, world!'));
        this.app.route('/login').post(this.authService.auth);
        this.getUserRoutes();
        this.getCartaoRoutes();
        this.getFaturaoRoutes();
    }

    private getUserRoutes(): void {
        this.app.route('/api/users').post(UserController.createUser);
        this.app.route('/api/users').all(this.authService.config().authenticate()).get(UserController.getAll);
        this.app.route('/api/users/:id').all(this.authService.config().authenticate()).get(UserController.getById);
        this.app.route('/api/users/:id').all(this.authService.config().authenticate()).put(UserController.updateUser);
        this.app.route('/api/users/:id').all(this.authService.config().authenticate()).delete(UserController.deleteUser);
    }

    private getCartaoRoutes(): void {
        this.app.route('/api/cartao').get(CartaoController.getAll);
        this.app.route('/api/cartao').post(CartaoController.createCartao);
        this.app.route('/api/cartao/:id').get(CartaoController.getById);
        this.app.route('/api/cartao/:id').put(CartaoController.updateCartao);
        this.app.route('/api/cartao/:id').delete(CartaoController.deleteCartao);
    }

    private getFaturaoRoutes(): void {
        this.app.route('/api/Fatura').get(FaturaController.getAll);
        this.app.route('/api/Fatura').post(FaturaController.createCartao);
        this.app.route('/api/Fatura/:id').get(FaturaController.getById);
        this.app.route('/api/Fatura/:id').put(FaturaController.updateCartao);
        this.app.route('/api/Fatura/:id').delete(FaturaController.deleteCartao);
    }
}