let extension: string = 'js';
if(process.env.NODE_ENV.trim() == 'development') {
  extension = 'ts';
}
module.exports = () => require(`../env/${ process.env.NODE_ENV.trim() }.env.${ extension }`);
