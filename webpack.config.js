const configProduction = require('./config/webpack/production');
const configDevelopment = require( './config/webpack/dev');

let config;

switch (process.env.NODE_ENV) {
    case 'production' : config = configProduction;break;
    case 'development' : config = configDevelopment;break;
    case 'test' : config = configDevelopment;break;

    default : config = configDevelopment;
}

module.exports = config;