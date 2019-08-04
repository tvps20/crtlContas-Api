import * as http from 'http';
import Api from '../api/api';
const config = require('../config/env/config')();


export default class Server {

    private db;
    private express;

    constructor(databaseConnector) {
        if (databaseConnector) {
            this.db = databaseConnector;
            this.express = new Api().express;
            this.syncDatabase();
        }
    }

    private async syncDatabase() {
        try {
            const syncData = await this.db.sync();
            this.databaseSyncHandler(syncData);
        } catch (error) {
            this.databaseSyncErrorHandler(error);
        }
    }

    private databaseSyncHandler(dataBaseInfo) {
        const { options, config, modelManager } = dataBaseInfo;
        const { models } = modelManager;
        this.upServer();
        this.logDatabaseConnection({ models, options, config })
    }

    private databaseSyncErrorHandler(error) {
        console.log(`Não conseguiu se conectar ao database porque ${error}`);
        this.upServer();
    }

    private upServer() {
        http
            .createServer(this.express)
            .listen(config.serverPort)
            .on('listening', this.onServerUp.bind(this, config.serverPort))
            .on('error', this.onServerStartupError.bind(this));
    }

    private onServerUp(port: number) {
        console.log(`O servidor está rodando na porta ${port}`);
    }

    private onServerStartupError(error: NodeJS.ErrnoException) {
        console.log(`ERROR ${error}`);
    }

    private logDatabaseConnection({ models, options, config }) {
        const { dialect, host } = options;
        const { database, port } = config;
        if (dialect && host && database && port && models) {
            console.log(`Database Dialect ${dialect}`);
            console.log(`Database Host ${host}`);
            console.log(`Database Name ${database}`);
            console.log(`Database Port ${port}`);
            console.log(`Created Table: ${models}`);
        }
    }
}