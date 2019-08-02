import { Application } from 'express';
import UserRoutes from '../../modules/User/routes';
import TokenRoute from '../../modules/Auth/auth';

class Routes {

    constructor(){}

    initRoutes(app: Application, auth: any): void{
        app.route('/').get((req, res) => res.send('Hello, world!'));
        app.route('/login').post(TokenRoute.auth);
        this.getUserRoutes(app, auth);
    }

    private getUserRoutes(app: Application, auth: any): void {
        app.route('/api/users').all(auth.config().authenticate()).get(UserRoutes.index);
        app.route('/api/users').all(auth.config().authenticate()).post(UserRoutes.create);
        app.route('/api/users/:id').all(auth.config().authenticate()).get(UserRoutes.findOnde);
        app.route('/api/users/:id').all(auth.config().authenticate()).put(UserRoutes.update);
        app.route('/api/users/:id').all(auth.config().authenticate()).delete(UserRoutes.delete);
    }
}

export default new Routes();