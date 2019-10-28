const Service = require('egg').Service;
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

const transport = nodemailer.createTransport(smtpTransport({
    host: "smtp.qq.com",
    secure: true,
    secureConnection: true,
    port: 465,
    auth: {
        user: "123456@qq.com",
        pass: "******"
    }
}));

class EmailService extends Service {
    async sendEmail(email) {
        const code = Math.ceil((Math.random() * 10000));

        await this.ctx.app.redis.setex(email, 7200, code);

        const htmlText = `<a href='127.0.0.1:7001/api/email?email=${email}&code=${code}'>点击验证邮箱</a>`;

        const mailOptions = {
            from: "123456@qq.com",
            to: email,
            subject: "邮箱验证",
            text: "",
            html: htmlText
        };

        transport.sendMail(mailOptions);
        transport.close();
    }
}

module.exports = EmailService;
