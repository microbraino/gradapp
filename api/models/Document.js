const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// User Schema
const DocumentSchema = mongoose.Schema({
    title: {
        type: String
    },
    name: {
        type: String,
        unique: true,
        index: true
    },
    format: {
        type: String
    },
    filePath: {
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
