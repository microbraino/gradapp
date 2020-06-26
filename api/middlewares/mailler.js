"use strict";
const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    secure: false, // true for 465, false for other ports
    auth: {
        user: "04915a8d2e268b", // generated ethereal user
        pass: "465915da6ed8fa", // generated ethereal password
    },
});

let testmail = {
    from: '"IZTECH GRADAPP" <authorization@gradapp.com>', // sender address
    to: "abdulkadir.kahraman21@gmail.com", // list of receivers
    subject: "Verify Your Email on IZTECH Gradapp", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
};

// async..await is not allowed in global scope, must use a wrapper
async function main() {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    //let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport




    // send mail with defined transport object
    let info = await transporter.sendMail(testmail, (error, info) => {
        if (error) {
            console.log('Error occured while sending mail');
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
    });

    //console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

main().catch(console.error);