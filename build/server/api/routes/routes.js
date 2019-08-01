"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var routes_1 = require("../../modules/User/routes");
var auth_1 = require("../../modules/Auth/auth");
var Routes = /** @class */ (function () {
    function Routes(app, auth) {
        this.userRoutes = new routes_1.default();
        this.tokenRoute = new auth_1.default();
        this.auth = auth;
        this.getRoutes(app);
    }
    Routes.prototype.getRoutes = function (app) {
        app.route('/').get(function (req, res) { return res.send('Hello, world!'); });
        app.route('/token').post(this.tokenRoute.auth);
        this.getUserRoutes(app);
    };
    Routes.prototype.getUserRoutes = function (app) {
        app.route('/api/users').all(this.auth.authenticate()).get(this.userRoutes.index);
        app.route('/api/users').all(this.auth.authenticate()).post(this.userRoutes.create);
        app.route('/api/users/:id').all(this.auth.authenticate()).get(this.userRoutes.findOnde);
        app.route('/api/users/:id').all(this.auth.authenticate()).put(this.userRoutes.update);
        app.route('/api/users/:id').all(this.auth.authenticate()).delete(this.userRoutes.delete);
    };
    return Routes;
}());
exports.default = Routes;
