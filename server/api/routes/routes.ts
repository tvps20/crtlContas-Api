import { Application } from 'express';
import UserRoutes from '../../modules/User/routes';
import TokenRoute from '../../modules/Auth/auth';

class Routes {

    private userRoutes: UserRoutes;
    private tokenRoute;
    private auth;

    constructor(app: Application, auth: any){
        this.userRoutes = new UserRoutes();
        this.tokenRoute = new TokenRoute();
        this.auth = auth;
        this.getRoutes(app);
    }

    getRoutes(app: Application): void{
        app.route('/').get((req, res) => res.send('Hello, world!'));
        app.route('/token').post(this.tokenRoute.auth);
        this.getUserRoutes(app);
    }

    getUserRoutes(app: Application): void {
        app.route('/api/users').all(this.auth.authenticate()).get(this.userRoutes.index);
        app.route('/api/users').all(this.auth.authenticate()).post(this.userRoutes.create);
        app.route('/api/users/:id').all(this.auth.authenticate()).get(this.userRoutes.findOnde);
        app.route('/api/users/:id').all(this.auth.authenticate()).put(this.userRoutes.update);
        app.route('/api/users/:id').all(this.auth.authenticate()).delete(this.userRoutes.delete);
    }
}

export default Routes;