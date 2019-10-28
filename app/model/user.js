'use strict';

module.exports = app => {
    const { STRING, DATE, INTEGER } = app.Sequelize;

    const User = app.model.define('user', {
        id: { type: INTEGER, primaryKey: true, autoIncrement: true },
        username: STRING,
        email: STRING,
        password: STRING,
        is_active: INTEGER(1),
        created_at: DATE,
        updated_at: DATE
    });

    return User;
};
