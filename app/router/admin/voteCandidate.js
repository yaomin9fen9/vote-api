'use strict';

module.exports = app => {
    app.router.resources('voteCandidate', '/admin/voteCandidate', app.controller.admin.voteCandidate);
};
