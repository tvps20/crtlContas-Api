"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var interface_1 = require("./interface");
var db = require('../../models');
var UserService = /** @class */ (function () {
    function UserService() {
    }
    UserService.prototype.create = function (user) {
        return db.User.create(user);
    };
    UserService.prototype.getAll = function () {
        return db.User.findAll({
            order: ['email']
        })
            .then(interface_1.createUsers);
    };
    UserService.prototype.getById = function (id) {
        return db.User.findOne({
            where: { id: id }
        })
            .then(interface_1.createUserById);
    };
    UserService.prototype.getByEmail = function (email) {
        return db.User.findOne({
            where: { email: email }
        })
            .then(interface_1.createUserByEmail);
    };
    UserService.prototype.update = function (id, user) {
        return db.User.update(user, {
            where: { id: id },
            // Atualiza apenas esses campos
            fildes: ['name', 'email', 'password'],
            // Criterio para o sequelize saber qual atualizar
            hooks: true,
            individualHooks: true
        });
    };
    UserService.prototype.delete = function (id) {
        return db.User.destroy({
            where: { id: id }
        });
    };
    return UserService;
}());
exports.default = UserService;
