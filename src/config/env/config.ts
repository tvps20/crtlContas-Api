let variavelAmbiente: string = process.env.NODE_ENV || 'integration';
let extension: string = 'js';

if (variavelAmbiente == 'integration') {

  module.exports = () => require(`../env/${variavelAmbiente}.env.${extension}`);
}
else {

  if (variavelAmbiente.trim() == 'development') {
    extension = 'ts';
  }

  module.exports = () => require(`../env/${variavelAmbiente.trim()}.env.${extension}`);
}
