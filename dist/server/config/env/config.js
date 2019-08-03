var variavelAmbiente = process.env.NODE_ENV || 'integration';
var extension = 'js';
if (variavelAmbiente == 'integration') {
    module.exports = function () { return require("../env/" + variavelAmbiente + ".env." + extension); };
}
else {
    if (variavelAmbiente.trim() == 'development') {
        extension = 'ts';
    }
    module.exports = function () { return require("../env/" + variavelAmbiente.trim() + ".env." + extension); };
}
