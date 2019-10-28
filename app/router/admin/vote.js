'use strict';

module.exports = app => {
    app.router.resources('vote', '/admin/vote', app.controller.admin.vote);
};
