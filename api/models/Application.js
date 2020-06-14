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
    referenceLetters: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Document'
    }],
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
    applicationConfirmed: {   // Confirm if there is no missing documents and all requirements are satisfied
        type: Boolean
    },
    assessmentResult: {    // Assessment results is gived by the department`s comitee after interview
        type: Number
    },
    assessmentConfirmed: {   // assesment is confirmed by gradschool
        type: Boolean
    }
});

AapplicationSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Application', AapplicationSchema);
