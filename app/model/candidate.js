'use strict';

module.exports = app => {
    const { DATE, INTEGER, STRING } = app.Sequelize;

    const Candidate = app.model.define('candidate', {
        id: { type: INTEGER, primaryKey: true, autoIncrement: true },
        name: STRING,
        status: INTEGER,
        created_at: DATE,
        updated_at: DATE
    });

    return Candidate;
};
