const { GoogleGenerativeAI } = require('@google/generative-ai');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const testGemini = async() => {
    try {
        console.log('🤖 Testing Gemini API...');

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

        const prompt = 'Generate one sample Course Outcome for a programming course. Keep it brief.';

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        console.log('✅ Gemini API is working!');
        console.log('📝 Response:', text);

    } catch (error) {
        console.error('❌ Gemini API test failed:', error.message);
    }
};

testGemini();