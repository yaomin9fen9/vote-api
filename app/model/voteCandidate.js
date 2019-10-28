'use strict';

module.exports = app => {
    const { DATE, INTEGER } = app.Sequelize;

    const VoteCandidate = app.model.define('vote_candidate', {
        id: { type: INTEGER, primaryKey: true, autoIncrement: true },
        vote_id: INTEGER,
        candidate_id: INTEGER,
        count: INTEGER,
        created_at: DATE,
        updated_at: DATE
    });

    VoteCandidate.associate = function () {
        app.model.VoteCandidate.belongsTo(app.model.Candidate, { as: 'candidate', foreignKey: 'candidate_id' });
    }

    return VoteCandidate;
};
