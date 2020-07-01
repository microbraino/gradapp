module.exports = {
    database: "mongodb+srv://microbrain:" + "spy.net61" + "@commerchant-4dygy.mongodb.net/test?retryWrites=true&w=majority",
    apiServer: 'http://commerchant.herokuapp.com/',//for static redirections
    secret: 'commerchant-secret',
    tokenTTL: 86400, // for 1 week time in seconds
    documentPath: './files',
    maxFileSize: 1024 * 1024 * 8,
    roles: ["su", "admin", "applicant", "gradschool", "department"],
    // mailTransporter: {
    //     host: "smtp.mailtrap.io",
    //     port: 2525,
    //     secure: false, // true for 465, false for other ports
    //     auth: {
    //         user: "04915a8d2e268b", // generated ethereal user
    //         pass: "465915da6ed8fa", // generated ethereal password
    //     },
    // },
    // mailTransporter: {
    //     host: "smtp.sendgrid.net",
    //     port: 465,
    //     secure: true, // true for 465, false for other ports
    //     auth: {
    //         user: "apikey", // generated ethereal user
    //         pass: "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", // generated ethereal password
    //     },
    // },
    mailTransporter: {
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: "gradapp.iztech@gmail.com", // generated ethereal user
            pass: "Asd12345", // generated ethereal password
        },
    }
}