const jwt = require('jsonwebtoken');

module.exports = options => {
    return async function (ctx, next) {
        let token = ctx.request.header.authorization;
        if (!token) {
            ctx.throw(401, '未登录， 请先登录！');
        }

        token = token.replace('Bearer ', '');

        let decode;
        try {
            decode = jwt.verify(token, options.secret);
        } catch (e) {
            ctx.throw(401, '请重新登录！');
        }

        if (decode && decode.id && decode.email) {
            const user = await ctx.model.User.findOne({ id: decode.id, email: decode.email });
            if (user) {
                ctx.state.user = user;
                await next();
            } else {
                ctx.throw(401, '请登录！');
            }
        } else {
            ctx.throw(401, '请登录！');
        }
    };
};
