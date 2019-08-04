"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var routes_1 = require("../../modules/User/routes");
var service_1 = require("../../modules/Auth/service");
var routes_2 = require("../../modules/Cartao/routes");
var routes_3 = require("../../modules/Fatura/routes");
var Routes = /** @class */ (function () {
    function Routes() {
    }
    Routes.prototype.initRoutes = function (app, auth) {
        app.route('/').get(function (req, res) { return res.send('Hello, world!'); });
        app.route('/login').post(service_1.default.auth);
        this.getUserRoutes(app, auth);
        this.getCartaoRoutes(app, auth);
        this.getFaturaoRoutes(app, auth);
    };
    Routes.prototype.getUserRoutes = function (app, auth) {
        app.route('/api/users').post(routes_1.default.create);
        app.route('/api/users').all(auth.config().authenticate()).get(routes_1.default.index);
        app.route('/api/users/:id').all(auth.config().authenticate()).get(routes_1.default.findOnde);
        app.route('/api/users/:id').all(auth.config().authenticate()).put(routes_1.default.update);
        app.route('/api/users/:id').all(auth.config().authenticate()).delete(routes_1.default.delete);
    };
    Routes.prototype.getCartaoRoutes = function (app, auth) {
        app.route('/api/cartao').get(routes_2.default.index);
        app.route('/api/cartao').post(routes_2.default.create);
        app.route('/api/cartao/:id').get(routes_2.default.findOnde);
        app.route('/api/cartao/:id').put(routes_2.default.update);
        app.route('/api/cartao/:id').delete(routes_2.default.delete);
    };
    Routes.prototype.getFaturaoRoutes = function (app, auth) {
        app.route('/api/Fatura').get(routes_3.default.index);
        app.route('/api/Fatura').post(routes_3.default.create);
        app.route('/api/Fatura/:id').get(routes_3.default.findOnde);
        app.route('/api/Fatura/:id').put(routes_3.default.update);
        app.route('/api/Fatura/:id').delete(routes_3.default.delete);
    };
    return Routes;
}());
exports.default = new Routes();
