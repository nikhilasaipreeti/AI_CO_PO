const mongoose = require('mongoose');

const attainmentSchema = new mongoose.Schema({
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    type: {
        type: String,
        enum: ['CO', 'PO', 'PSO'],
        required: true
    },
    targetId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'type' // Dynamically reference CO, PO, or PSO
    },
    targetCode: {
        type: String,
        required: true
    },
    attainmentValue: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    attainmentLevel: {
        type: Number,
        min: 1,
        max: 3
    },
    calculationMethod: {
        type: String,
        enum: ['direct', 'indirect', 'combined'],
        default: 'direct'
    },
    basedOn: [{
        examId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Exam'
        },
        contribution: Number
    }],
    calculatedAt: {
        type: Date,
        default: Date.now
    },
    calculatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

// Ensure one attainment record per target per course
attainmentSchema.index({ courseId: 1, type: 1, targetId: 1 }, { unique: true });

// Set attainment level based on value
attainmentSchema.pre('save', function(next) {
    if (this.attainmentValue >= 70) {
        this.attainmentLevel = 3;
    } else if (this.attainmentValue >= 60) {
        this.attainmentLevel = 2;
    } else if (this.attainmentValue >= 50) {
        this.attainmentLevel = 1;
    } else {
        this.attainmentLevel = 0;
    }
    next();
});

module.exports = mongoose.model('Attainment', attainmentSchema);