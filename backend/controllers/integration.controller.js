const { generateCOs, mapQuestions, calculateAttainment } = require('../src/services/ai-proxy');

const ANALYTICS_ENGINE_URL = process.env.ANALYTICS_ENGINE_URL || 'http://localhost:8001';

let lastAttainmentReport = null;

const generateCO = async(req, res) => {
    try {
        const { syllabus, courseName } = req.body;
        if (!syllabus) {
            return res.status(400).json({
                success: false,
                message: 'Syllabus is required'
            });
        }

        const pos = Object.values(require('../../data/program_outcomes/engineering_pos.json'));
        const psos = Object.values(require('../../data/program_specific_outcomes/cse_psos.json'));

        const cos = await generateCOs(syllabus, pos, psos, courseName || 'Course');
        const normalized = cos.map((co, index) => ({
            code: co.code || co.id || `CO${index + 1}`,
            description: co.description,
            bloomLevel: co.bloomLevel || co.bloom_level || 'Understand'
        }));

        res.status(200).json({
            success: true,
            outcomes: normalized.map((co) => co.description),
            data: normalized
        });
    } catch (error) {
        console.error('Generate CO error:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const mapQuestionsHandler = async(req, res) => {
    try {
        const { questions, cos } = req.body;
        if (!questions || !Array.isArray(questions) || questions.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Questions array is required'
            });
        }

        const normalizedCos = Array.isArray(cos)
            ? cos.map((co, index) => ({
                  id: co.id || co.code || `CO${index + 1}`,
                  description: co.description || co.text || co.name || `CO${index + 1}`
              }))
            : [];

        const mappings = await mapQuestions(questions, normalizedCos);

        res.status(200).json({
            success: true,
            data: mappings
        });
    } catch (error) {
        console.error('Map questions error:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const uploadMarks = async(req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'File is required'
            });
        }

        const formData = new FormData();
        formData.append('file', new Blob([req.file.buffer]), req.file.originalname);

        const response = await fetch(`${ANALYTICS_ENGINE_URL}/upload_excel`, {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            const errText = await response.text();
            throw new Error(errText || 'Analytics engine upload failed');
        }

        const data = await response.json();
        lastAttainmentReport = data;

        return res.status(200).json({
            success: true,
            data
        });
    } catch (error) {
        console.error('Upload marks error:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const calculateAttainmentHandler = async(req, res) => {
    try {
        const marksData = req.body.data || req.body.marksData || req.body;
        if (!marksData) {
            return res.status(400).json({
                success: false,
                message: 'Marks data is required'
            });
        }

        const result = await calculateAttainment(marksData);
        lastAttainmentReport = result;

        return res.status(200).json({
            success: true,
            data: result
        });
    } catch (error) {
        console.error('Calculate attainment error:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getAttainmentReport = async(req, res) => {
    if (!lastAttainmentReport) {
        return res.status(404).json({
            success: false,
            message: 'No attainment report available yet'
        });
    }

    res.status(200).json({
        success: true,
        data: lastAttainmentReport
    });
};

module.exports = {
    generateCO,
    mapQuestionsHandler,
    uploadMarks,
    calculateAttainmentHandler,
    getAttainmentReport
};
