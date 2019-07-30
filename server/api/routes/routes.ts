import { Application } from 'express';
import UserRoutes from '../../modules/User/routes';

class Routes {

    private userRoutes: UserRoutes;

    constructor(app: Application){
        this.userRoutes = new UserRoutes();
        this.getRoutes(app);
    }

    getRoutes(app: Application): void{
        app.route('/').get((req, res) => res.send('Hello, world!'));
        this.getUserRoutes(app);
    }

    getUserRoutes(app: Application): void {
        app.route('/api/users').get(this.userRoutes.index);
        app.route('/api/users').post(this.userRoutes.create);
        app.route('/api/users/:id').get(this.userRoutes.findOnde);
        app.route('/api/users/:id').put(this.userRoutes.update);
        app.route('/api/users/:id').delete(this.userRoutes.delete);
    }
}

export default Routes;