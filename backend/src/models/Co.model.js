const mongoose = require('mongoose');

const coSchema = new mongoose.Schema({
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    code: {
        type: String,
        required: true,
        uppercase: true
    },
    description: {
        type: String,
        required: true
    },
    bloomLevel: {
        type: String,
        enum: ['Remember', 'Understand', 'Apply', 'Analyze', 'Evaluate', 'Create'],
        required: true
    },
    mappedPOs: [{
        poId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'PO'
        },
        strength: {
            type: Number,
            min: 1,
            max: 3,
            default: 1
        }
    }],
    mappedPSOs: [{
        psoId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'PSO'
        },
        strength: {
            type: Number,
            min: 1,
            max: 3,
            default: 1
        }
    }],
    aiGenerated: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Ensure CO codes are unique per course
coSchema.index({ courseId: 1, code: 1 }, { unique: true });

module.exports = mongoose.model('CO', coSchema);