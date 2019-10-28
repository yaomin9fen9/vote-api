/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1571814535406_5316';

  // add your middleware config here
  config.middleware = [
    'errorHandler',
    'jwt'
  ];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.security = {
    csrf: {
      enable: false,
    },
  };

  config.validate = {
    convert: true,
    widelyUndefined: true,
  };

  config.jwt = {
    enable: true,
    secret: 'jwt-secret',
    expiresIn: 7200,
    ignore: ['/email', '/user']
  };

  config.sequelize = {
    dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
    database: 'vote',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root'
  };

  config.redis = {
    client: {
      port: 6379,
      host: '127.0.0.1',
      password: '',
      db: 0
    }
  }

  return {
    ...config,
    ...userConfig,
  };
};
