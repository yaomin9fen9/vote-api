'use strict';

module.exports = app => {
    app.router.post('/user', app.controller.user.create);
};
