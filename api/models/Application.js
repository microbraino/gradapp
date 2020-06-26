const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


// Application Schema
const AapplicationSchema = mongoose.Schema({
    applicant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        unique: true,
        index: true,
        required: true
    },
    program: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Program'
    },
    photo: {            //====================application file start
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Document'
    },
    undergradTranscript: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Document'
    },
    alesResult: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Document'
    },
    englishExamResult: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Document'
    },
    referenceLetters: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Document'
    },
    statementOfPurpose: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Document'
    },
    nationality: {
        type: String
    },
    passportCopy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Document'
    },
    doesWork: {
        type: Boolean
    },
    permissionLetter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Document'
    },
    masterTranscript: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Document'
    },
    progress: {   // Inform if document reviewed or not
        type: String,
        default: 'created'
    }
});

AapplicationSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Application', AapplicationSchema);
