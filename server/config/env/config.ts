let variavelAmbiente: string = process.env.NODE_ENV;
let extension: string = 'js';
if (variavelAmbiente.trim() == 'development') {
  extension = 'ts';
}
if (variavelAmbiente.trim() == undefined) {
  process.env.NODE_ENV = 'test';
}
module.exports = () => require(`../env/${variavelAmbiente.trim()}.env.${extension}`);
