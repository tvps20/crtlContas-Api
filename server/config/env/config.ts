module.exports = () => require(`../../config/env/${process.env.NODE_ENV.trim()}.env.js`)
