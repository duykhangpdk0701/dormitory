var nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: "dormitory.sgu@gmail.com",
        pass: "cjagpazuvlwvvnpv",
    },
});

const sendMail = async (to, html) => {
    var mailOptions = {
        from: "dormitory.sgu@gmail.com",
        to,
        subject: "Mail form Dormitory",
        html,
    };
    await new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                resolve(info);
            }
        });
    });
};

module.exports = sendMail;