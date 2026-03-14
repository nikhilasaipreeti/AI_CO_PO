const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Mock marks data
let marksEntries = [{
        id: 1,
        examId: 1,
        studentId: 101,
        marks: [
            { questionId: 1, marksObtained: 8, maxMarks: 10 },
            { questionId: 2, marksObtained: 7, maxMarks: 10 },
            { questionId: 3, marksObtained: 9, maxMarks: 10 }
        ],
        totalMarksObtained: 24,
        percentage: 80,
        status: 'pass',
        enteredBy: 2,
        enteredAt: '2024-02-16T10:00:00Z'
    },
    {
        id: 2,
        examId: 1,
        studentId: 102,
        marks: [
            { questionId: 1, marksObtained: 6, maxMarks: 10 },
            { questionId: 2, marksObtained: 5, maxMarks: 10 },
            { questionId: 3, marksObtained: 7, maxMarks: 10 }
        ],
        totalMarksObtained: 18,
        percentage: 60,
        status: 'pass',
        enteredBy: 2,
        enteredAt: '2024-02-16T10:00:00Z'
    },
    {
        id: 3,
        examId: 1,
        studentId: 103,
        marks: [
            { questionId: 1, marksObtained: 4, maxMarks: 10 },
            { questionId: 2, marksObtained: 3, maxMarks: 10 },
            { questionId: 3, marksObtained: 5, maxMarks: 10 }
        ],
        totalMarksObtained: 12,
        percentage: 40,
        status: 'pass',
        enteredBy: 2,
        enteredAt: '2024-02-16T10:00:00Z'
    }
];

// Mock students data
const students = [
    { id: 101, rollNumber: 'CS001', name: 'Alice Johnson', batch: '2024', semester: 3, department: 'Computer Science' },
    { id: 102, rollNumber: 'CS002', name: 'Bob Smith', batch: '2024', semester: 3, department: 'Computer Science' },
    { id: 103, rollNumber: 'CS003', name: 'Charlie Brown', batch: '2024', semester: 3, department: 'Computer Science' },
    { id: 104, rollNumber: 'CS004', name: 'Diana Prince', batch: '2024', semester: 3, department: 'Computer Science' },
    { id: 105, rollNumber: 'CS005', name: 'Ethan Hunt', batch: '2024', semester: 3, department: 'Computer Science' }
];

// Configure multer for file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(__dirname, '../../uploads');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, `marks-${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['xlsx', 'xls', 'csv'];
        const ext = path.extname(file.originalname).toLowerCase().slice(1);
        if (allowedTypes.includes(ext)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type. Only Excel and CSV files are allowed.'));
        }
    }
}).single('marksFile');

// @desc    Upload marks via Excel
// @route   POST /api/assessment/marks/upload
const uploadMarksFile = async(req, res) => {
    try {
        upload(req, res, async(err) => {
            if (err) {
                return res.status(400).json({
                    success: false,
                    message: err.message
                });
            }

            if (!req.file) {
                return res.status(400).json({
                    success: false,
                    message: 'Please upload a file'
                });
            }

            const { examId } = req.body;

            // Mock processing - in real app, parse Excel file
            const mockMarksEntries = students.map((student, index) => ({
                id: marksEntries.length + index + 1,
                examId: parseInt(examId),
                studentId: student.id,
                marks: [
                    { questionId: 1, marksObtained: Math.floor(Math.random() * 10) + 1, maxMarks: 10 },
                    { questionId: 2, marksObtained: Math.floor(Math.random() * 10) + 1, maxMarks: 10 },
                    { questionId: 3, marksObtained: Math.floor(Math.random() * 10) + 1, maxMarks: 10 }
                ],
                enteredBy: 2,
                enteredAt: new Date().toISOString()
            }));

            // Calculate totals and percentages
            mockMarksEntries.forEach(entry => {
                entry.totalMarksObtained = entry.marks.reduce((sum, m) => sum + m.marksObtained, 0);
                const totalMax = entry.marks.reduce((sum, m) => sum + m.maxMarks, 0);
                entry.percentage = (entry.totalMarksObtained / totalMax) * 100;
                entry.status = entry.percentage >= 40 ? 'pass' : 'fail';
            });

            marksEntries.push(...mockMarksEntries);

            res.status(200).json({
                success: true,
                message: `Processed ${mockMarksEntries.length} student marks`,
                data: mockMarksEntries
            });
        });
    } catch (error) {
        console.error('Upload marks error:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Enter marks manually
// @route   POST /api/assessment/marks/manual
const enterMarksManually = async(req, res) => {
    try {
        const { examId, marks } = req.body;

        const results = [];
        for (const entry of marks) {
            const { studentId, studentMarks } = entry;

            // Calculate total and percentage
            const totalMarksObtained = studentMarks.reduce((sum, m) => sum + m.marksObtained, 0);
            const totalMaxMarks = studentMarks.reduce((sum, m) => sum + m.maxMarks, 0);
            const percentage = (totalMarksObtained / totalMaxMarks) * 100;

            const marksEntry = {
                id: marksEntries.length + results.length + 1,
                examId: parseInt(examId),
                studentId,
                marks: studentMarks,
                totalMarksObtained,
                percentage,
                status: percentage >= 40 ? 'pass' : 'fail',
                enteredBy: 2,
                enteredAt: new Date().toISOString()
            };

            marksEntries.push(marksEntry);
            results.push(marksEntry);
        }

        res.status(200).json({
            success: true,
            data: results
        });
    } catch (error) {
        console.error('Manual marks entry error:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get marks for exam
// @route   GET /api/assessment/marks/exam/:examId
const getExamMarks = async(req, res) => {
    try {
        const examId = parseInt(req.params.examId);
        const examMarks = marksEntries.filter(m => m.examId === examId);

        // Enrich with student data
        const enrichedMarks = examMarks.map(mark => {
            const student = students.find(s => s.id === mark.studentId);
            return {
                ...mark,
                student: student || { id: mark.studentId, name: 'Unknown', rollNumber: 'Unknown' }
            };
        });

        res.status(200).json({
            success: true,
            count: enrichedMarks.length,
            data: enrichedMarks
        });
    } catch (error) {
        console.error('Get marks error:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get marks for student
// @route   GET /api/assessment/marks/student/:studentId
const getStudentMarks = async(req, res) => {
    try {
        const studentId = parseInt(req.params.studentId);
        const studentMarks = marksEntries.filter(m => m.studentId === studentId);

        res.status(200).json({
            success: true,
            data: studentMarks
        });
    } catch (error) {
        console.error('Get student marks error:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    uploadMarksFile,
    enterMarksManually,
    getExamMarks,
    getStudentMarks
};