"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var interface_1 = require("./interface");
var model = require('../../models');
var UserService = /** @class */ (function () {
    function UserService() {
    }
    UserService.prototype.create = function (user) {
        return model.User.create(user);
    };
    UserService.prototype.getAll = function () {
        return model.User.findAll({
            order: ['email']
        })
            .then(interface_1.createUsers);
    };
    UserService.prototype.getById = function (id) {
        return model.Users.findOne({
            where: { id: id }
        })
            .then(interface_1.createUserById);
    };
    UserService.prototype.getByEmail = function (email) {
        return model.User.findOne({
            where: { email: email }
        })
            .then(interface_1.createUserByEmail);
    };
    UserService.prototype.update = function (id, user) {
        return model.User.update(user, {
            where: { id: id },
            // Atualiza apenas esses campos
            fildes: [
                'email', 'password'
            ]
        });
    };
    UserService.prototype.delete = function (id) {
        return model.User.destroy({
            where: { id: id }
        });
    };
    return UserService;
}());
exports.default = UserService;
