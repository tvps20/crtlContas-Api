import * as express from 'express';
import { Application } from 'express';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';
import Routes from './routes/routes';
import ResponseHandlers from './handlers/response-handlers';
import Auth from '../auth';

class Api {
    public express: Application;

    constructor() {
        this.express = express();
        this.middleware();
    }

    middleware(): void {
        // O morgan gera log no console para cada requisição
        this.express.use(morgan('dev'));
        this.express.use(bodyParser.urlencoded({ extended: true }));
        this.express.use(bodyParser.json());
        this.express.use(ResponseHandlers.errorHandlerApi);
        this.express.use(Auth.config().initialize());
        this.router(this.express, Auth);
    }

    private router(app: Application, auth: any): void {
        Routes.initRoutes(app, auth);
    }
}

export default new Api().express;