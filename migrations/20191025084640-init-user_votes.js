'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE } = Sequelize;
    await queryInterface.createTable('user_votes', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      user_id: INTEGER, // 用户id
      vote_id: INTEGER, // 投票id
      candidate_id: INTEGER, // 候选人id
      count: INTEGER, //票数
      created_at: DATE,
      updated_at: DATE
    });
  },

  down: async queryInterface => {
    await queryInterface.dropTable('user_votes');
  },
};
