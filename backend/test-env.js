const dotenv = require('dotenv');
const path = require('path');

// Load .env file from current directory
dotenv.config({ path: path.join(__dirname, '.env') });

console.log('🔍 Environment Variables Check:');
console.log('===============================');
console.log('📁 Current Directory:', __dirname);
console.log('📁 .env file path:', path.join(__dirname, '.env'));
console.log('===============================');

console.log('PORT:', process.env.PORT);
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('MONGODB_URI:', process.env.MONGODB_URI);
console.log('JWT_SECRET:', process.env.JWT_SECRET ? '✅ Set' : '❌ Not set');
console.log('GEMINI_API_KEY:', process.env.GEMINI_API_KEY ? '✅ Set' : '❌ Not set');
console.log('CLIENT_URL:', process.env.CLIENT_URL);
console.log('MAX_FILE_SIZE:', process.env.MAX_FILE_SIZE);
console.log('UPLOAD_PATH:', process.env.UPLOAD_PATH);

// Test MongoDB connection string format
const mongoURI = process.env.MONGODB_URI;
if (mongoURI) {
    console.log('\n📊 MongoDB Connection:', mongoURI);
    if (mongoURI.includes('127.0.0.1') || mongoURI.includes('localhost')) {
        console.log('✅ Using local MongoDB');
    }
}

// Check Gemini API key (masked for security)
const geminiKey = process.env.GEMINI_API_KEY;
if (geminiKey) {
    const maskedKey = geminiKey.substring(0, 6) + '...' + geminiKey.substring(geminiKey.length - 4);
    console.log('\n🤖 Gemini API Key:', maskedKey);
    console.log('✅ Gemini API key is set');
}