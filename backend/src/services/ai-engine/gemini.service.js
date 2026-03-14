const gemini = require('../../config/gemini');
const { BLOOM_LEVELS } = require('../../config/constants');
const prompts = require('./prompts');

class GeminiService {
    /**
     * Generate Course Outcomes from syllabus
     */
    async generateCourseOutcomes(syllabus, pos, psos) {
        try {
            const prompt = prompts.generateCOPrompt(syllabus, pos, psos);
            const result = await gemini.generateJSON(prompt);

            return result.cos.map((co, index) => ({
                code: `CO${index + 1}`,
                description: co.description,
                bloomLevel: co.bloomLevel,
                mappedPOs: co.mappedPOs || [],
                mappedPSOs: co.mappedPSOs || []
            }));
        } catch (error) {
            console.error('Error generating COs:', error);
            throw new Error('Failed to generate course outcomes');
        }
    }

    /**
     * Classify Bloom's Taxonomy level of a question
     */
    async classifyBloomLevel(question) {
        try {
            const prompt = prompts.classifyBloomPrompt(question);
            const result = await gemini.generateContent(prompt, 0.2);

            // Clean and validate the result
            const level = result.trim();
            if (BLOOM_LEVELS.includes(level)) {
                return level;
            }

            // Default to Understand if classification fails
            return 'Understand';
        } catch (error) {
            console.error('Error classifying bloom level:', error);
            return 'Understand'; // Default fallback
        }
    }

    /**
     * Map question to appropriate CO based on content
     */
    async mapQuestionToCO(question, courseOutcomes) {
        try {
            const prompt = prompts.mapQuestionPrompt(question, courseOutcomes);
            const result = await gemini.generateJSON(prompt);

            return {
                coId: result.coId,
                confidence: result.confidence || 0.8,
                bloomLevel: result.bloomLevel
            };
        } catch (error) {
            console.error('Error mapping question:', error);
            return null;
        }
    }

    /**
     * Analyze question paper and map all questions
     */
    async analyzeQuestionPaper(questions, courseOutcomes) {
        try {
            const prompt = prompts.analyzePaperPrompt(questions, courseOutcomes);
            const result = await gemini.generateJSON(prompt);

            return result.mappings;
        } catch (error) {
            console.error('Error analyzing paper:', error);
            throw new Error('Failed to analyze question paper');
        }
    }

    /**
     * Generate suggestions for CO-PO mapping
     */
    async suggestMapping(co, pos, psos) {
        try {
            const prompt = prompts.suggestMappingPrompt(co, pos, psos);
            const result = await gemini.generateJSON(prompt);

            return {
                suggestedPOs: result.poMappings || [],
                suggestedPSOs: result.psoMappings || []
            };
        } catch (error) {
            console.error('Error suggesting mappings:', error);
            return { suggestedPOs: [], suggestedPSOs: [] };
        }
    }

    /**
     * Chat with AI about OBE concepts
     */
    async chat(message, context) {
        try {
            const prompt = prompts.chatPrompt(message, context);
            const result = await gemini.generateContent(prompt, 0.8);

            return {
                response: result,
                timestamp: new Date().toISOString()
            };
        } catch (error) {
            console.error('Error in chat:', error);
            return {
                response: "I'm sorry, I encountered an error. Please try again.",
                timestamp: new Date().toISOString()
            };
        }
    }
}

module.exports = new GeminiService();