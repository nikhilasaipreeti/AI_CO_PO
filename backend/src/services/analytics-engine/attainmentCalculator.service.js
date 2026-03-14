const Attainment = require('../../models/Attainment.model');
const CO = require('../../models/CO.model');
const PO = require('../../models/PO.model');
const PSO = require('../../models/PSO.model');
const Marks = require('../../models/Marks.model');
const Question = require('../../models/Question.model');
const { ATTAINMENT_LEVELS } = require('../../config/constants');

class AttainmentCalculator {
    /**
     * Calculate CO attainment for a specific exam
     */
    async calculateCOAttainment(examId) {
        try {
            // Get all marks for this exam
            const marks = await Marks.find({ examId }).populate('marks.questionId');

            if (marks.length === 0) {
                throw new Error('No marks found for this exam');
            }

            // Get questions with their CO mapping
            const questions = await Question.find({ examId }).populate('mappedCO');

            // Group questions by CO
            const coQuestions = {};
            questions.forEach(q => {
                if (q.mappedCO) {
                    const coId = q.mappedCO._id.toString();
                    if (!coQuestions[coId]) {
                        coQuestions[coId] = {
                            co: q.mappedCO,
                            questions: [],
                            totalStudents: marks.length
                        };
                    }
                    coQuestions[coId].questions.push(q);
                }
            });

            // Calculate attainment for each CO
            const results = [];

            for (const [coId, data] of Object.entries(coQuestions)) {
                // For each student, calculate percentage in this CO's questions
                const studentScores = marks.map(mark => {
                    let totalObtained = 0;
                    let totalMax = 0;

                    data.questions.forEach(q => {
                        const studentMark = mark.marks.find(m =>
                            m.questionId.toString() === q._id.toString()
                        );
                        if (studentMark) {
                            totalObtained += studentMark.marksObtained;
                            totalMax += studentMark.maxMarks;
                        }
                    });

                    return totalMax > 0 ? (totalObtained / totalMax) * 100 : 0;
                });

                // Count students above threshold
                const level1Count = studentScores.filter(s => s >= ATTAINMENT_LEVELS.LEVEL1.threshold).length;
                const level2Count = studentScores.filter(s => s >= ATTAINMENT_LEVELS.LEVEL2.threshold).length;
                const level3Count = studentScores.filter(s => s >= ATTAINMENT_LEVELS.LEVEL3.threshold).length;

                // Calculate attainment value (percentage of students achieving level 2 or above)
                const attainmentValue = (level2Count / data.totalStudents) * 100;

                results.push({
                    coId,
                    coCode: data.co.code,
                    attainmentValue,
                    attainmentLevel: attainmentValue >= 70 ? 3 : attainmentValue >= 60 ? 2 : 1,
                    studentCount: data.totalStudents,
                    level1Count,
                    level2Count,
                    level3Count
                });
            }

            return results;
        } catch (error) {
            console.error('Error calculating CO attainment:', error);
            throw error;
        }
    }

    /**
     * Calculate PO attainment from CO attainments
     */
    async calculatePOAttainment(courseId) {
        try {
            // Get all COs for this course with their PO mappings
            const cos = await CO.find({ courseId }).populate('mappedPOs.poId');

            // Get CO attainment values
            const coAttainments = await Attainment.find({
                courseId,
                type: 'CO'
            });

            // Create map of CO attainments
            const attainmentMap = {};
            coAttainments.forEach(a => {
                attainmentMap[a.targetId.toString()] = a.attainmentValue;
            });

            // Calculate PO attainment based on mapped COs
            const poMap = {};

            cos.forEach(co => {
                co.mappedPOs.forEach(mapping => {
                    const poId = mapping.poId._id.toString();
                    const coAttainment = attainmentMap[co._id.toString()] || 0;

                    if (!poMap[poId]) {
                        poMap[poId] = {
                            po: mapping.poId,
                            totalAttainment: 0,
                            weightSum: 0,
                            contributions: []
                        };
                    }

                    const weight = mapping.strength || 1;
                    poMap[poId].totalAttainment += coAttainment * weight;
                    poMap[poId].weightSum += weight;
                    poMap[poId].contributions.push({
                        coCode: co.code,
                        attainment: coAttainment,
                        weight
                    });
                });
            });

            // Calculate final PO attainments
            const results = [];
            for (const [poId, data] of Object.entries(poMap)) {
                const attainmentValue = data.weightSum > 0 ?
                    data.totalAttainment / data.weightSum :
                    0;

                results.push({
                    poId,
                    poCode: data.po.code,
                    attainmentValue,
                    attainmentLevel: attainmentValue >= 70 ? 3 : attainmentValue >= 60 ? 2 : 1,
                    contributions: data.contributions
                });
            }

            return results;
        } catch (error) {
            console.error('Error calculating PO attainment:', error);
            throw error;
        }
    }

    /**
     * Calculate PSO attainment from CO attainments
     */
    async calculatePSOAttainment(courseId) {
        try {
            // Get all COs for this course with their PSO mappings
            const cos = await CO.find({ courseId }).populate('mappedPSOs.psoId');

            // Get CO attainment values
            const coAttainments = await Attainment.find({
                courseId,
                type: 'CO'
            });

            // Create map of CO attainments
            const attainmentMap = {};
            coAttainments.forEach(a => {
                attainmentMap[a.targetId.toString()] = a.attainmentValue;
            });

            // Calculate PSO attainment based on mapped COs
            const psoMap = {};

            cos.forEach(co => {
                co.mappedPSOs.forEach(mapping => {
                    const psoId = mapping.psoId._id.toString();
                    const coAttainment = attainmentMap[co._id.toString()] || 0;

                    if (!psoMap[psoId]) {
                        psoMap[psoId] = {
                            pso: mapping.psoId,
                            totalAttainment: 0,
                            weightSum: 0,
                            contributions: []
                        };
                    }

                    const weight = mapping.strength || 1;
                    psoMap[psoId].totalAttainment += coAttainment * weight;
                    psoMap[psoId].weightSum += weight;
                    psoMap[psoId].contributions.push({
                        coCode: co.code,
                        attainment: coAttainment,
                        weight
                    });
                });
            });

            // Calculate final PSO attainments
            const results = [];
            for (const [psoId, data] of Object.entries(psoMap)) {
                const attainmentValue = data.weightSum > 0 ?
                    data.totalAttainment / data.weightSum :
                    0;

                results.push({
                    psoId,
                    psoCode: data.pso.code,
                    attainmentValue,
                    attainmentLevel: attainmentValue >= 70 ? 3 : attainmentValue >= 60 ? 2 : 1,
                    contributions: data.contributions
                });
            }

            return results;
        } catch (error) {
            console.error('Error calculating PSO attainment:', error);
            throw error;
        }
    }

    /**
     * Save attainment results to database
     */
    async saveAttainment(courseId, type, results) {
        try {
            const saved = [];

            for (const result of results) {
                const attainment = await Attainment.findOneAndUpdate({
                    courseId,
                    type,
                    targetId: result[`${type.toLowerCase()}Id`]
                }, {
                    $set: {
                        courseId,
                        type,
                        targetId: result[`${type.toLowerCase()}Id`],
                        targetCode: result[`${type.toLowerCase()}Code`],
                        attainmentValue: result.attainmentValue,
                        attainmentLevel: result.attainmentLevel,
                        basedOn: result.contributions ? result.contributions.map(c => ({
                            examId: c.examId,
                            contribution: c.attainment
                        })) : []
                    }
                }, { upsert: true, new: true });

                saved.push(attainment);
            }

            return saved;
        } catch (error) {
            console.error('Error saving attainment:', error);
            throw error;
        }
    }
}

module.exports = new AttainmentCalculator();