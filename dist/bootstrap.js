"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = require("./src/server/server");
var sequelize = require('./src/models').sequelize;
// Função auto invocada
(function () {
    new server_1.default(sequelize);
})();
