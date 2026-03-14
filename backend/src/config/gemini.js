const { GoogleGenerativeAI } = require('@google/generative-ai');

class GeminiConfig {
    constructor() {
        this.apiKey = process.env.GEMINI_API_KEY;
        if (!this.apiKey) {
            console.warn('⚠️ GEMINI_API_KEY not found in environment variables');
        }
        this.genAI = new GoogleGenerativeAI(this.apiKey);
        this.model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });
    }

    async generateContent(prompt, temperature = 0.7) {
        try {
            const result = await this.model.generateContent({
                contents: [{ role: 'user', parts: [{ text: prompt }] }],
                generationConfig: {
                    temperature: temperature,
                    topK: 1,
                    topP: 1,
                    maxOutputTokens: 2048,
                },
            });

            const response = await result.response;
            return response.text();
        } catch (error) {
            console.error('❌ Gemini API error:', error);
            throw new Error('Failed to generate content with Gemini');
        }
    }

    async generateJSON(prompt) {
        try {
            const jsonPrompt = `${prompt}\n\nReturn the response as a valid JSON object only, no other text.`;
            const result = await this.generateContent(jsonPrompt, 0.2);

            // Clean the response to ensure it's valid JSON
            const cleanedResult = result.replace(/```json\n?|```/g, '').trim();
            return JSON.parse(cleanedResult);
        } catch (error) {
            console.error('❌ Failed to parse Gemini response as JSON:', error);
            throw new Error('Invalid JSON response from AI');
        }
    }
}

module.exports = new GeminiConfig();