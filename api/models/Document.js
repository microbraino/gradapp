const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// User Schema
const DocumentSchema = mongoose.Schema({
    title: {
        type: String
    },
    originalname: {
        type: String,
    },
    storename: {
        type: String,
        unique: true,
        index: true
    },
    mimetype: {// file format
        type: String
    },
    size: {
        type: Number
    },
    source: {
        type: String
    },
    destination: {
        type: String
    },
    editDate: {
        type: Date
    },
    isComplete: {
        type: Boolean,
        default: false
    }
});

DocumentSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Document', DocumentSchema);
