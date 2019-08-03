let extension: string = 'js';
if (process.env.NODE_ENV == 'development') {
  extension = 'ts';
}
if (process.env.NODE_ENV == 'undefined') {
  process.env.NODE_ENV = 'test';
}
module.exports = () => require(`../env/${process.env.NODE_ENV}.env.${extension}`);
