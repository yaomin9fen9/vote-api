'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE } = Sequelize;
    await queryInterface.createTable('votes', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      status: INTEGER, // 状态 0：未开始投票 1：开始投票 2：结束投票
      created_at: DATE,
      updated_at: DATE
    });
  },

  down: async queryInterface => {
    await queryInterface.dropTable('votes');
  },
};
