const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    examId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exam',
        required: true
    },
    questionNumber: {
        type: Number,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    marks: {
        type: Number,
        required: true,
        min: 1
    },
    mappedCO: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CO'
    },
    bloomLevel: {
        type: String,
        enum: ['Remember', 'Understand', 'Apply', 'Analyze', 'Evaluate', 'Create']
    },
    aiClassified: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

questionSchema.index({ examId: 1, questionNumber: 1 }, { unique: true });

module.exports = mongoose.model('Question', questionSchema);