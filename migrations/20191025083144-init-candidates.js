'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING } = Sequelize;
    await queryInterface.createTable('candidates', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      name: STRING, // 候选人名称
      status: INTEGER, // 状态 -1：删除 1：正常
      created_at: DATE,
      updated_at: DATE
    });
  },

  down: async queryInterface => {
    await queryInterface.dropTable('candidates');
  },
};
