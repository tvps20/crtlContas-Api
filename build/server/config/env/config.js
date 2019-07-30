module.exports = function () { return require("../../../build/config/env/" + process.env.NODE_ENV.trim() + ".env.js"); };
