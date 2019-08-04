import * as express from 'express';
import { Application, Request, Response, NextFunction } from 'express';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';
import Routes from './routes/routes';
import ResponseHandlers from './handlers/response-handlers';
import AuthService from '../modules/Auth/service';

export default class Api {

    private _express: Application;
    private authService: AuthService;
    private routes: Routes;

    constructor() {
        this.authService = new AuthService;
        this._express = express();
        this.configureExpress();
        this.routes = new Routes(this.express, this.authService);
        this.routes.initRoutes();
    }

    public get express(): Application {
        return this._express;
    }

    configureExpress(): void {
        this.express.use(this.configHeaders.bind(this));
        // O morgan gera log no console para cada requisição
        this.express.use(morgan('dev'));
        this.express.use(bodyParser.urlencoded({ extended: true }));
        this.express.use(bodyParser.json());
        this.express.use(ResponseHandlers.errorHandlerApi);
        this.express.use(this.authService.config().initialize());
    }

    private configHeaders(req: Request, res: Response, next: NextFunction) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        next();
    }
}