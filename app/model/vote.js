'use strict';

module.exports = app => {
    const { DATE, INTEGER } = app.Sequelize;

    const Vote = app.model.define('vote', {
        id: { type: INTEGER, primaryKey: true, autoIncrement: true },
        status: INTEGER,
        created_at: DATE,
        updated_at: DATE
    });

    Vote.associate = function () {
        app.model.Vote.hasMany(app.model.VoteCandidate, { as: 'voteCandidates', foreignKey: 'vote_id' });
    }

    return Vote;
};
