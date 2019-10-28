'use strict';

const BaseController = require('./base');
const jwt = require('jsonwebtoken')

class UserController extends BaseController {
    async create() {
        const { ctx, app } = this;
        const { email, password } = ctx.request.body;

        checkParams(ctx, email, password);

        const exist = await ctx.model.User.findOne({ email });
        if (exist) {
            this.error(300, '邮箱已被注册！');
            return;
        }

        const user = await ctx.model.User.create({ email, password, is_active: 0 });

        ctx.service.email.sendEmail(email);

        const token = jwt.sign({ id: user.id, email: user.email }, app.config.jwt.secret);

        this.success({ token });
    }
}

module.exports = UserController;

function checkParams(ctx, email, password) {
    const createRule = {
        email: {
            type: 'email',
            require: true,
        },
        password: {
            type: 'password',
            require: true,
        },
    };

    ctx.validate(createRule, { email, password });
}
