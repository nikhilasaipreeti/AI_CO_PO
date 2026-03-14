const mongoose = require('mongoose');

const marksSchema = new mongoose.Schema({
    examId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exam',
        required: true
    },
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    marks: [{
        questionId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Question',
            required: true
        },
        marksObtained: {
            type: Number,
            required: true,
            min: 0
        },
        maxMarks: {
            type: Number,
            required: true
        }
    }],
    totalMarksObtained: {
        type: Number,
        required: true
    },
    percentage: {
        type: Number,
        min: 0,
        max: 100
    },
    status: {
        type: String,
        enum: ['pass', 'fail', 'absent'],
        default: 'pass'
    },
    enteredBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    enteredAt: {
        type: Date,
        default: Date.now
    }
});

// Ensure one marks entry per student per exam
marksSchema.index({ examId: 1, studentId: 1 }, { unique: true });

// Calculate total and percentage before saving
marksSchema.pre('save', function(next) {
    this.totalMarksObtained = this.marks.reduce((sum, m) => sum + m.marksObtained, 0);
    const totalMaxMarks = this.marks.reduce((sum, m) => sum + m.maxMarks, 0);
    this.percentage = (this.totalMarksObtained / totalMaxMarks) * 100;

    // Determine pass/fail status (assuming 40% as pass mark)
    this.status = this.percentage >= 40 ? 'pass' : 'fail';

    next();
});

module.exports = mongoose.model('Marks', marksSchema);