module.exports = {
    database: "mongodb+srv://microbrain:" + process.env.MONGO_ATLAS_PW + "@commerchant-4dygy.mongodb.net/test?retryWrites=true&w=majority",
    secret: 'commerchant-secret',
    tokenTTL: 86400 // for 1 week time in seconds
}