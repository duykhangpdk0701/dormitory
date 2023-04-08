var nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "guituio20011@gmail.com",
        pass: "epqmjkuumebcojeg",
    },
});


const sendMail = (to , subject, text) => {
    var mailOptions = {
        from: "guituio20011@gmail.com",
        to,
        subject,
        text,
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log("Email sent: " + info.response);
        }
    });
}

module.exports = sendMail;