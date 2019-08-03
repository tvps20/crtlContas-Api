import { Server } from "./src/server/server";
// const { sequelize } = require("./src/entities");

// Função auto invocada
(function () {
    new Server();
})();