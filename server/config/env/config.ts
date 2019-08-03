let variavelAmbiente = process.env.NODE_ENV;
let extension: string = 'js';
if (variavelAmbiente.toString().trim() == 'development') {
  extension = 'ts';
}
if (variavelAmbiente.toString().trim() == undefined) {
  process.env.NODE_ENV = 'test';
}
module.exports = () => require(`../env/${variavelAmbiente.toString().trim()}.env.${extension}`);
