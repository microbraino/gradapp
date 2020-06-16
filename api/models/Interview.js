const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


// Application Schema
const InterviewSchema = mongoose.Schema({
    applicant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        unique: true,
        index: true,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    location: {
        type: String,
        required: true
    }
});

InterviewSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Interview', InterviewSchema);
