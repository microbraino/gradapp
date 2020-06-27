
const nodemailer = require("nodemailer");
const config = require('../config/cors');

exports.send = function (mail) {
    try {
        let transporter = nodemailer.createTransport(config.mailTransporter);
        //     "To complete your sign up, please verify your email:\n";
        let info = transporter.sendMail(mail, (error, info) => {
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
