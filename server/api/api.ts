import * as express from 'express';
import { Application } from 'express';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';
import Routes from './routes/routes';
import { errorHandlerApi } from './erros/errorHandlerApi';
import AuthConfing from '../auth';

class Api {
    public express: Application;
    public auth;

    constructor(){
        this.express = express();
        this.auth = AuthConfing();
        this.middleware();
    }

    middleware(): void {
        // O morgan gera log no console para cada requisição
        this.express.use(morgan('dev'));
        this.express.use(bodyParser.urlencoded({ extended: true}));
        this.express.use(bodyParser.json());
        this.express.use(errorHandlerApi);
        this.express.use(this.auth.initialize());
        this.router(this.express, this.auth);
    }

    private router(app: Application, auth: any): void{
        new Routes(app, auth);
    }
}

export default new Api().express;