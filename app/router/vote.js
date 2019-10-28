'use strict';

module.exports = app => {
    app.router.resources('vote', '/vote', app.controller.vote);
};
