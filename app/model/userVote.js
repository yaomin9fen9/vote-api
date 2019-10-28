'use strict';

module.exports = app => {
    const { DATE, INTEGER } = app.Sequelize;

    const UserVote = app.model.define('user_vote', {
        id: { type: INTEGER, primaryKey: true, autoIncrement: true },
        user_id: INTEGER,
        vote_id: INTEGER,
        candidate_id: INTEGER,
        count: INTEGER,
        created_at: DATE,
        updated_at: DATE
    });

    return UserVote;
};
