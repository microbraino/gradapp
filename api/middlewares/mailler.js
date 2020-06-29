
const nodemailer = require("nodemailer");
const config = require('../config/cors');

exports.send = function (mail) {
    try {
        let transporter = nodemailer.createTransport(config.mailTransporter);
        //     "To complete your sign up, please verify your email:\n";
        transporter.verify((err, success) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log('Your config is correct');
        });
        //console.log("transpoter verified:"+transporter.verify(config.mailTransporter))
        mail.from = '"IZTECH GRADAPP" <gradapp.iztech@gmail.com>';
        transporter.sendMail(mail, (error, info) => {
            if (error) {
                console.log('Error occured while sending mail ' + error);
                return;
            }
            console.log('Message sent: %s', info.messageId);
        });
    } catch (error) {
        console.log('Error occured while sending mail ' + error);
        return;
    };
};
