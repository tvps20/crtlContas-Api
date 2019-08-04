"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var morgan = require("morgan");
var bodyParser = require("body-parser");
var routes_1 = require("./routes/routes");
var response_handlers_1 = require("./handlers/response-handlers");
var service_1 = require("../modules/Auth/service");
var Api = /** @class */ (function () {
    function Api() {
        this.authService = new service_1.default;
        this._express = express();
        this.configureExpress();
        this.routes = new routes_1.default(this.express, this.authService);
        this.routes.initRoutes();
    }
    Object.defineProperty(Api.prototype, "express", {
        get: function () {
            return this._express;
        },
        enumerable: true,
        configurable: true
    });
    Api.prototype.configureExpress = function () {
        this.express.use(this.configHeaders.bind(this));
        // O morgan gera log no console para cada requisição
        this.express.use(morgan('dev'));
        this.express.use(bodyParser.urlencoded({ extended: true }));
        this.express.use(bodyParser.json());
        this.express.use(response_handlers_1.default.errorHandlerApi);
        this.express.use(this.authService.config().initialize());
    };
    Api.prototype.configHeaders = function (req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        next();
    };
    return Api;
}());
exports.default = Api;
