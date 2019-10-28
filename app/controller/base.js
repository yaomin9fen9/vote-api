'use strict';

const Controller = require('egg').Controller;

class BaseController extends Controller {
    success(data) {
        this.ctx.body = { code: 200, data };
    }

    error(code, message) {
        this.ctx.body = { code, message };
    }

    notFind() {
        this.ctx.body = { code: 301, message: '没有找到记录!' }
    }
}

module.exports = BaseController;
