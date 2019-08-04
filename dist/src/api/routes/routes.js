"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var controller_1 = require("../../modules/User/controller");
var controller_2 = require("../../modules/Cartao/controller");
var controller_3 = require("../../modules/Fatura/controller");
var Routes = /** @class */ (function () {
    function Routes(app, auth) {
        this.app = app;
        this.authService = auth;
    }
    Routes.prototype.initRoutes = function () {
        this.app.route('/').get(function (req, res) { return res.send('Hello, world!'); });
        this.app.route('/login').post(this.authService.auth);
        this.getUserRoutes();
        this.getCartaoRoutes();
        this.getFaturaoRoutes();
    };
    Routes.prototype.getUserRoutes = function () {
        this.app.route('/api/users').post(controller_1.default.createUser);
        this.app.route('/api/users').all(this.authService.config().authenticate()).get(controller_1.default.getAll);
        this.app.route('/api/users/:id').all(this.authService.config().authenticate()).get(controller_1.default.getById);
        this.app.route('/api/users/:id').all(this.authService.config().authenticate()).put(controller_1.default.updateUser);
        this.app.route('/api/users/:id').all(this.authService.config().authenticate()).delete(controller_1.default.deleteUser);
    };
    Routes.prototype.getCartaoRoutes = function () {
        this.app.route('/api/cartao').get(controller_2.default.getAll);
        this.app.route('/api/cartao').post(controller_2.default.createCartao);
        this.app.route('/api/cartao/:id').get(controller_2.default.getById);
        this.app.route('/api/cartao/:id').put(controller_2.default.updateCartao);
        this.app.route('/api/cartao/:id').delete(controller_2.default.deleteCartao);
    };
    Routes.prototype.getFaturaoRoutes = function () {
        this.app.route('/api/Fatura').get(controller_3.default.getAll);
        this.app.route('/api/Fatura').post(controller_3.default.createCartao);
        this.app.route('/api/Fatura/:id').get(controller_3.default.getById);
        this.app.route('/api/Fatura/:id').put(controller_3.default.updateCartao);
        this.app.route('/api/Fatura/:id').delete(controller_3.default.deleteCartao);
    };
    return Routes;
}());
exports.default = Routes;
