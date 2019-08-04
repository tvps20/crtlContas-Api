import Server from './src/server/server';
const { sequelize } = require('./src/models');

// Função auto invocada
(function () {
    new Server(sequelize);
})();