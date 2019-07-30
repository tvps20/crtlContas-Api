module.exports = function () { return require("../../config/env/" + process.env.NODE_ENV.trim() + ".env.js"); };
