const { GoogleGenerativeAI } = require('@google/generative-ai');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '.env') });

const testGemini = async() => {
    try {
        console.log('🤖 Testing Gemini API...');
        console.log('📝 Using API Key:', process.env.GEMINI_API_KEY ? '✅ Found' : '❌ Not found');

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

        // Current working models as of March 2026 [citation:2]
        const models = [
            'gemini-2.5-pro', // Latest Pro model
            'gemini-2.5-flash', // Fast model
            'gemini-2.0-flash', // Still supported until June 2026 [citation:6]
            'gemini-3.1-pro-preview', // Preview of Gemini 3.1
            'gemini-3-flash-preview' // Preview of Gemini 3 Flash
        ];

        let success = false;

        for (const modelName of models) {
            try {
                console.log(`\n🔄 Trying model: ${modelName}`);
                const model = genAI.getGenerativeModel({ model: modelName });

                const prompt = 'Generate one sample Course Outcome for a programming course. Keep it brief.';
                const result = await model.generateContent(prompt);
                const response = await result.response;
                const text = response.text();

                console.log(`✅ SUCCESS with ${modelName}!`);
                console.log('📝 Response:', text);
                success = true;
                break;
            } catch (e) {
                console.log(`❌ ${modelName} failed:`, e.message);
            }
        }

        if (!success) {
            console.log('\n❌ All models failed. Checking possible causes:');
            console.log('1. API key may need billing enabled');
            console.log('2. Region restrictions (try using VPN)');
            console.log('3. Account age/verification issues [citation:10]');
        }

    } catch (error) {
        console.error('❌ Gemini API test failed:', error.message);
    }
};

testGemini();