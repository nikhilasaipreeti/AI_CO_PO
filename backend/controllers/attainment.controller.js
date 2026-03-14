// Mock attainment data
let attainments = [{
        id: 1,
        courseId: 1,
        type: 'CO',
        targetId: 1,
        targetCode: 'CO1',
        attainmentValue: 68,
        attainmentLevel: 2,
        calculationMethod: 'direct',
        basedOn: [
            { examId: 1, contribution: 68 },
            { examId: 2, contribution: 68 }
        ],
        calculatedAt: '2024-03-01T10:00:00Z'
    },
    {
        id: 2,
        courseId: 1,
        type: 'CO',
        targetId: 2,
        targetCode: 'CO2',
        attainmentValue: 74,
        attainmentLevel: 3,
        calculationMethod: 'direct',
        basedOn: [
            { examId: 1, contribution: 72 },
            { examId: 2, contribution: 76 }
        ],
        calculatedAt: '2024-03-01T10:00:00Z'
    },
    {
        id: 3,
        courseId: 1,
        type: 'CO',
        targetId: 3,
        targetCode: 'CO3',
        attainmentValue: 55,
        attainmentLevel: 1,
        calculationMethod: 'direct',
        basedOn: [
            { examId: 1, contribution: 52 },
            { examId: 2, contribution: 58 }
        ],
        calculatedAt: '2024-03-01T10:00:00Z'
    },
    {
        id: 4,
        courseId: 1,
        type: 'PO',
        targetId: 1,
        targetCode: 'PO1',
        attainmentValue: 70,
        attainmentLevel: 3,
        calculationMethod: 'direct',
        basedOn: [
            { coId: 1, contribution: 68 },
            { coId: 2, contribution: 72 }
        ],
        calculatedAt: '2024-03-01T10:00:00Z'
    },
    {
        id: 5,
        courseId: 1,
        type: 'PO',
        targetId: 2,
        targetCode: 'PO2',
        attainmentValue: 65,
        attainmentLevel: 2,
        calculationMethod: 'direct',
        basedOn: [
            { coId: 1, contribution: 68 },
            { coId: 2, contribution: 74 },
            { coId: 3, contribution: 55 }
        ],
        calculatedAt: '2024-03-01T10:00:00Z'
    }
];

// @desc    Calculate CO attainment for exam
// @route   POST /api/attainment/co/exam/:examId
const calculateCOAttainment = async(req, res) => {
    try {
        const examId = parseInt(req.params.examId);

        // Mock calculation based on exam ID
        const results = [{
                coId: 1,
                coCode: 'CO1',
                attainmentValue: 68 + (examId * 2),
                attainmentLevel: 2,
                studentCount: 50,
                level1Count: 40,
                level2Count: 35,
                level3Count: 25
            },
            {
                coId: 2,
                coCode: 'CO2',
                attainmentValue: 74 + (examId * 1),
                attainmentLevel: 3,
                studentCount: 50,
                level1Count: 45,
                level2Count: 40,
                level3Count: 30
            },
            {
                coId: 3,
                coCode: 'CO3',
                attainmentValue: 55 + (examId * 3),
                attainmentLevel: 1,
                studentCount: 50,
                level1Count: 30,
                level2Count: 25,
                level3Count: 15
            }
        ];

        res.status(200).json({
            success: true,
            data: results
        });
    } catch (error) {
        console.error('Calculate CO attainment error:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Calculate and save CO attainment for course
// @route   POST /api/attainment/course/:courseId/co
const calculateAndSaveCOAttainment = async(req, res) => {
    try {
        const courseId = parseInt(req.params.courseId);

        // Mock calculation
        const results = [{
                coId: 1,
                coCode: 'CO1',
                attainmentValue: 68,
                attainmentLevel: 2,
                basedOn: [
                    { examId: 1, contribution: 68 },
                    { examId: 2, contribution: 68 }
                ]
            },
            {
                coId: 2,
                coCode: 'CO2',
                attainmentValue: 74,
                attainmentLevel: 3,
                basedOn: [
                    { examId: 1, contribution: 72 },
                    { examId: 2, contribution: 76 }
                ]
            },
            {
                coId: 3,
                coCode: 'CO3',
                attainmentValue: 55,
                attainmentLevel: 1,
                basedOn: [
                    { examId: 1, contribution: 52 },
                    { examId: 2, contribution: 58 }
                ]
            }
        ];

        // Save to mock database
        const savedResults = [];
        results.forEach((result, index) => {
            const newAttainment = {
                id: attainments.length + index + 1,
                courseId,
                type: 'CO',
                targetId: result.coId,
                targetCode: result.coCode,
                attainmentValue: result.attainmentValue,
                attainmentLevel: result.attainmentLevel,
                calculationMethod: 'direct',
                basedOn: result.basedOn,
                calculatedAt: new Date().toISOString()
            };
            attainments.push(newAttainment);
            savedResults.push(newAttainment);
        });

        res.status(200).json({
            success: true,
            data: savedResults
        });
    } catch (error) {
        console.error('Calculate and save CO attainment error:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Calculate PO attainment for course
// @route   POST /api/attainment/course/:courseId/po
const calculatePOAttainment = async(req, res) => {
    try {
        const courseId = parseInt(req.params.courseId);

        // Mock calculation
        const results = [{
                poId: 1,
                poCode: 'PO1',
                attainmentValue: 70,
                attainmentLevel: 3,
                contributions: [
                    { coCode: 'CO1', attainment: 68, weight: 1 },
                    { coCode: 'CO2', attainment: 72, weight: 1 }
                ]
            },
            {
                poId: 2,
                poCode: 'PO2',
                attainmentValue: 65,
                attainmentLevel: 2,
                contributions: [
                    { coCode: 'CO1', attainment: 68, weight: 1 },
                    { coCode: 'CO2', attainment: 74, weight: 1 },
                    { coCode: 'CO3', attainment: 55, weight: 1 }
                ]
            },
            {
                poId: 3,
                poCode: 'PO3',
                attainmentValue: 72,
                attainmentLevel: 3,
                contributions: [
                    { coCode: 'CO2', attainment: 74, weight: 1 },
                    { coCode: 'CO4', attainment: 70, weight: 1 }
                ]
            }
        ];

        // Save to mock database
        const savedResults = [];
        results.forEach((result, index) => {
            const newAttainment = {
                id: attainments.length + index + 1,
                courseId,
                type: 'PO',
                targetId: result.poId,
                targetCode: result.poCode,
                attainmentValue: result.attainmentValue,
                attainmentLevel: result.attainmentLevel,
                calculationMethod: 'direct',
                basedOn: result.contributions,
                calculatedAt: new Date().toISOString()
            };
            attainments.push(newAttainment);
            savedResults.push(newAttainment);
        });

        res.status(200).json({
            success: true,
            data: savedResults
        });
    } catch (error) {
        console.error('Calculate PO attainment error:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Calculate PSO attainment for course
// @route   POST /api/attainment/course/:courseId/pso
const calculatePSOAttainment = async(req, res) => {
    try {
        const courseId = parseInt(req.params.courseId);

        // Mock calculation
        const results = [{
                psoId: 1,
                psoCode: 'PSO1',
                attainmentValue: 72,
                attainmentLevel: 3,
                contributions: [
                    { coCode: 'CO1', attainment: 68, weight: 1 },
                    { coCode: 'CO2', attainment: 74, weight: 1 }
                ]
            },
            {
                psoId: 2,
                psoCode: 'PSO2',
                attainmentValue: 68,
                attainmentLevel: 2,
                contributions: [
                    { coCode: 'CO2', attainment: 74, weight: 1 },
                    { coCode: 'CO3', attainment: 55, weight: 1 }
                ]
            }
        ];

        // Save to mock database
        const savedResults = [];
        results.forEach((result, index) => {
            const newAttainment = {
                id: attainments.length + index + 1,
                courseId,
                type: 'PSO',
                targetId: result.psoId,
                targetCode: result.psoCode,
                attainmentValue: result.attainmentValue,
                attainmentLevel: result.attainmentLevel,
                calculationMethod: 'direct',
                basedOn: result.contributions,
                calculatedAt: new Date().toISOString()
            };
            attainments.push(newAttainment);
            savedResults.push(newAttainment);
        });

        res.status(200).json({
            success: true,
            data: savedResults
        });
    } catch (error) {
        console.error('Calculate PSO attainment error:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get attainment for course
// @route   GET /api/attainment/course/:courseId
const getCourseAttainment = async(req, res) => {
    try {
        const courseId = parseInt(req.params.courseId);
        const { type } = req.query;

        let filtered = attainments.filter(a => a.courseId === courseId);

        if (type) {
            filtered = filtered.filter(a => a.type === type);
        }

        // Group by type
        const grouped = {
            CO: filtered.filter(a => a.type === 'CO'),
            PO: filtered.filter(a => a.type === 'PO'),
            PSO: filtered.filter(a => a.type === 'PSO')
        };

        res.status(200).json({
            success: true,
            data: grouped
        });
    } catch (error) {
        console.error('Get attainment error:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Generate attainment report
// @route   GET /api/attainment/course/:courseId/report
const generateAttainmentReport = async(req, res) => {
    try {
        const courseId = parseInt(req.params.courseId);

        const courseAttainments = attainments.filter(a => a.courseId === courseId);

        const report = {
            courseId,
            generatedAt: new Date().toISOString(),
            summary: {
                totalCOs: courseAttainments.filter(a => a.type === 'CO').length,
                totalPOs: courseAttainments.filter(a => a.type === 'PO').length,
                totalPSOs: courseAttainments.filter(a => a.type === 'PSO').length,
                averageCOAttainment: 65.7,
                averagePOAttainment: 69.0,
                averagePSOAttainment: 70.0
            },
            details: courseAttainments
        };

        res.status(200).json({
            success: true,
            data: report
        });
    } catch (error) {
        console.error('Generate report error:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    calculateCOAttainment,
    calculateAndSaveCOAttainment,
    calculatePOAttainment,
    calculatePSOAttainment,
    getCourseAttainment,
    generateAttainmentReport
};