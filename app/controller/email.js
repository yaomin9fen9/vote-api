'use strict';

const BaseController = require('./base');

class EmailController extends BaseController {
    async index() {
        const { ctx, app } = this;
        const { email, code } = ctx.request.query;

        const redisCode = await app.redis.get(email)

        if (!code) {
            this.error(300, '验证码失效，请重新发送验证码！')
        } else if (Number(redisCode) === Number(code)) {
            const user = await ctx.model.User.findOne({ email })
            if (user) {
                user.is_active = 1
                await user.save()
                this.success('邮箱验证成功！')
            } else {
                this.error(300, '账号不存在！')
            }
        } else {
            this.error(300, '验证码错误！')
        }
    }
}

module.exports = EmailController;
