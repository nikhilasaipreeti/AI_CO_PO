const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['formative', 'summative'],
        required: true
    },
    examCode: {
        type: String,
        enum: ['T1', 'T2', 'T3', 'T4', 'T5', 'MID', 'FINAL'],
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    totalMarks: {
        type: Number,
        required: true,
        min: 1
    },
    duration: {
        type: Number, // in minutes
        required: true
    },
    questionStructure: [{
        questionNumber: Number,
        marks: Number,
        description: String
    }],
    status: {
        type: String,
        enum: ['draft', 'configured', 'questions_mapped', 'marks_entered', 'completed'],
        default: 'draft'
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

examSchema.index({ courseId: 1, examCode: 1 }, { unique: true });

module.exports = mongoose.model('Exam', examSchema);