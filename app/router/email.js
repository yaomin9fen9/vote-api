'use strict';

module.exports = app => {
    app.router.get('/email', app.controller.email.index);
};
