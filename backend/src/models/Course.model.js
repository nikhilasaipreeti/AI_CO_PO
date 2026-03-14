const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    code: {
        type: String,
        required: [true, 'Course code is required'],
        unique: true,
        uppercase: true,
        trim: true
    },
    name: {
        type: String,
        required: [true, 'Course name is required'],
        trim: true
    },
    syllabus: {
        type: String,
        required: [true, 'Syllabus is required']
    },
    syllabusFile: {
        filename: String,
        path: String,
        originalName: String
    },
    department: {
        type: String,
        required: true
    },
    semester: {
        type: Number,
        required: true,
        min: 1,
        max: 8
    },
    credits: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    facultyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['draft', 'active', 'completed', 'archived'],
        default: 'draft'
    },
    mappingCompleted: {
        type: Boolean,
        default: false
    },
    attainmentCalculated: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Index for faster queries
courseSchema.index({ code: 1, facultyId: 1 });
courseSchema.index({ department: 1, semester: 1 });

module.exports = mongoose.model('Course', courseSchema);