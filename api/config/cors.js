module.exports = {
    database: "mongodb+srv://microbrain:" + "spy.net61" + "@commerchant-4dygy.mongodb.net/test?retryWrites=true&w=majority",
    secret: 'commerchant-secret',
    tokenTTL: 86400, // for 1 week time in seconds
    documentPath: './documents',
    maxFileSize: 1024 * 1024 * 8,
    roles: ["su", "admin", "applicant", "gradschool", "department"]
}