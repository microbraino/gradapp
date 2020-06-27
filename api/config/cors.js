module.exports = {
    database: "mongodb+srv://microbrain:" + "spy.net61" + "@commerchant-4dygy.mongodb.net/test?retryWrites=true&w=majority",
    secret: 'commerchant-secret',
    tokenTTL: 86400, // for 1 week time in seconds
    documentPath: './documents',
    maxFileSize: 1024 * 1024 * 8,
    roles: ["su", "admin", "applicant", "gradschool", "department"],
    mailTransporter: {
        host: "smtp.mailtrap.io",
        port: 2525,
        secure: false, // true for 465, false for other ports
        auth: {
            user: "04915a8d2e268b", // generated ethereal user
            pass: "465915da6ed8fa", // generated ethereal password
        },
    }
}