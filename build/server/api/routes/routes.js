"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var routes_1 = require("../../modules/User/routes");
var Routes = /** @class */ (function () {
    function Routes(app) {
        this.userRoutes = new routes_1.default();
        this.getRoutes(app);
    }
    Routes.prototype.getRoutes = function (app) {
        app.route('/').get(function (req, res) { return res.send('Hello, world!'); });
        this.getUserRoutes(app);
    };
    Routes.prototype.getUserRoutes = function (app) {
        app.route('/api/users').get(this.userRoutes.index);
        app.route('/api/users').post(this.userRoutes.create);
        app.route('/api/users/:id').get(this.userRoutes.findOnde);
        app.route('/api/users/:id').put(this.userRoutes.update);
        app.route('/api/users/:id').delete(this.userRoutes.delete);
    };
    return Routes;
}());
exports.default = Routes;
