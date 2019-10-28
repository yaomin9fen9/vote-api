'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  require('./router/user')(app);
  require('./router/email')(app);
  require('./router/vote')(app);
  require('./router/admin/candidate')(app);
  require('./router/admin/vote')(app);
  require('./router/admin/voteCandidate')(app);
};
