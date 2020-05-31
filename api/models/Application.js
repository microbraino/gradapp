const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


// Application Schema
const AapplicationSchema = mongoose.Schema({
    account: {
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
        type: String
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
        type: [mongoose.Schema.Types.ObjectId],
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
    degreeToApply: {
        type: String        //PhD || Masters || PhD without masters degree
    },
    masterTranscript: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Document'
    },                      //====================application file end

    confirmApplication: {   // Confirm if there is no missing documents and all requirements are satisfied
        type: Boolean
    },
    interviewDate: {    // Setted by the department. Announced by the gradschool
        type: Date
    },
    assessmentResult: {     // Assessment results is gived by the department after interview
        type: Number
    },
    confirmAssessment: {    // Application is confirmed by the gradschool after receive the assessment results
        type: Boolean
    }


});

AapplicationSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Application', AapplicationSchema);
