import { Application } from 'express';

class Routes {

    constructor(app: Application){
        this.getRoutes(app);
    }

    getRoutes(app: Application): void{
        app.route('/').get((req, res) => {
            res.send('Hello, world!');
        })
    }
}

export default Routes;