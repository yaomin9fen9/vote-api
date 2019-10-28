'use strict';

module.exports = app => {
    app.router.resources('candidate', '/admin/candidate', app.controller.admin.candidate);
};
