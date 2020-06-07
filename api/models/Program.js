const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// Program Schema
const ProgramSchema = mongoose.Schema({
    coordinator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account'
    },
    name: {
        type: String,
        unique: true,
        index: true
    },
    department: {
        type: String,
        required: true
    },
    degree: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    announceDate: {
        type: Date,
        required: true
    },
    applicationDeadline: {
        type: Date,
        required: true
    },
    alesRequirement: {
        type: Boolean,
        default: false
    },
    sgkRequirement: {
        type: Boolean,
        default: false
    },
    masterRequirement: {
        type: Boolean,
        default: false
    },
    quota: {
        type: Number,
        default: 0
    }
});

ProgramSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Program', ProgramSchema);
