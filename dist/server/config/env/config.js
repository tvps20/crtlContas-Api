var variavelAmbiente = process.env.NODE_ENV;
var extension = 'js';
if (variavelAmbiente.trim() == 'development') {
    extension = 'ts';
}
if (variavelAmbiente.trim() == undefined) {
    process.env.NODE_ENV = 'test';
}
module.exports = function () { return require("../env/" + variavelAmbiente.trim() + ".env." + extension); };
