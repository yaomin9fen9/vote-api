'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE } = Sequelize;
    await queryInterface.createTable('vote_candidates', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      vote_id: INTEGER, // 投票id
      candidate_id: INTEGER, // 候选人id
      count: INTEGER, // 票数
      created_at: DATE,
      updated_at: DATE
    });
  },

  down: async queryInterface => {
    await queryInterface.dropTable('vote_candidates');
  },
};
