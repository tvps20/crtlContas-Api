"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var http = require("http");
var api_1 = require("../api/api");
var config = require('../config/env/config')();
var Server = /** @class */ (function () {
    function Server(databaseConnector) {
        if (databaseConnector) {
            this.db = databaseConnector;
            this.express = new api_1.default().express;
            this.syncDatabase();
        }
    }
    Server.prototype.syncDatabase = function () {
        return __awaiter(this, void 0, void 0, function () {
            var syncData, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.db.sync()];
                    case 1:
                        syncData = _a.sent();
                        this.databaseSyncHandler(syncData);
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        this.databaseSyncErrorHandler(error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Server.prototype.databaseSyncHandler = function (dataBaseInfo) {
        var options = dataBaseInfo.options, config = dataBaseInfo.config, modelManager = dataBaseInfo.modelManager;
        var models = modelManager.models;
        this.upServer();
        this.logDatabaseConnection({ models: models, options: options, config: config });
    };
    Server.prototype.databaseSyncErrorHandler = function (error) {
        console.log("N\u00E3o conseguiu se conectar ao database porque " + error);
        this.upServer();
    };
    Server.prototype.upServer = function () {
        http
            .createServer(this.express)
            .listen(config.serverPort)
            .on('listening', this.onServerUp.bind(this, config.serverPort))
            .on('error', this.onServerStartupError.bind(this));
    };
    Server.prototype.onServerUp = function (port) {
        console.log("O servidor est\u00E1 rodando na porta " + port);
    };
    Server.prototype.onServerStartupError = function (error) {
        console.log("ERROR " + error);
    };
    Server.prototype.logDatabaseConnection = function (_a) {
        var models = _a.models, options = _a.options, config = _a.config;
        var dialect = options.dialect, host = options.host;
        var database = config.database, port = config.port;
        if (dialect && host && database && port && models) {
            console.log("Database Dialect " + dialect);
            console.log("Database Host " + host);
            console.log("Database Name " + database);
            console.log("Database Port " + port);
            console.log("Created Table: " + models);
        }
    };
    return Server;
}());
exports.default = Server;
