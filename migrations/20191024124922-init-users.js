'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING } = Sequelize;
    await queryInterface.createTable('users', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      username: STRING, // 用户名
      email: STRING, // 邮箱
      password: STRING, // 密码
      is_active: INTEGER(1), // 账号激活状态 0：未激活 1：已激活
      created_at: DATE,
      updated_at: DATE
    });
  },

  down: async queryInterface => {
    await queryInterface.dropTable('users');
  },
};
