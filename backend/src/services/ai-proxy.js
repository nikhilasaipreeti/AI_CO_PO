const axios = require('axios');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const AI_ENGINE_URL = process.env.AI_ENGINE_URL || 'http://localhost:8000';
const ANALYTICS_ENGINE_URL = process.env.ANALYTICS_ENGINE_URL || 'http://localhost:8001';

const aiProxy = axios.create({
  baseURL: AI_ENGINE_URL,
  timeout: 5000,
});

const analyticsProxy = axios.create({
  baseURL: ANALYTICS_ENGINE_URL,
  timeout: 5000,
});

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

const fallbackBloom = (text) => {
  const t = text.toLowerCase();
  if (t.match(/\b(define|list|name|identify|state)\b/)) return 'Remember';
  if (t.match(/\b(explain|describe|summarize|outline)\b/)) return 'Understand';
  if (t.match(/\b(apply|solve|use|compute|implement)\b/)) return 'Apply';
  if (t.match(/\b(analyze|compare|differentiate|examine)\b/)) return 'Analyze';
  if (t.match(/\b(evaluate|justify|critique|assess)\b/)) return 'Evaluate';
  if (t.match(/\b(create|design|develop|formulate)\b/)) return 'Create';
  return 'Understand';
};

// Direct Gemini for fallback
exports.generateCOGemini = async (syllabus, courseName) => {
  try {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY missing');
    }
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const prompt = `Generate 5 course outcomes for "${courseName}" based on this syllabus:
${syllabus}

Return JSON array: [{"description":"...", "bloomLevel":"Understand"}] Bloom levels: Remember, Understand, Apply, Analyze, Evaluate, Create.`;

    const result = await model.generateContent(prompt);
    const text = await result.response.text();
    const jsonMatch = text.match(/\[.*\]/s);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    return [];
  } catch (error) {
    console.error('Gemini CO generation error:', error.message);
    throw new Error('Gemini CO generation failed');
  }
};

// AI Engine calls (with fallback)
exports.generateCOs = async (syllabus, pos, psos, courseName = 'Course') => {
  try {
    const response = await aiProxy.post('/analyze', {
      service_type: 'generate_course_outcomes',
      syllabus,
      pos: pos || [],
      psos: psos || []
    });
    return response.data.cos;
  } catch (error) {
    console.error('AI Engine CO generation error:', error.message);
    return exports.generateCOGemini(syllabus, courseName);
  }
};

exports.mapQuestions = async (questions, cos) => {
  try {
    const response = await aiProxy.post('/analyze', {
      service_type: 'map_questions',
      questions,
      cos
    });
    return response.data.mappings;
  } catch (error) {
    console.error('AI Engine question mapping error:', error.message);
    return questions.map((q, index) => ({
      question: q,
      co_id: (cos && cos[index % (cos.length || 1)] && (cos[index % cos.length].id || cos[index % cos.length].code)) || 'CO1',
      bloom_level: fallbackBloom(q),
      confidence: 0.5
    }));
  }
};

exports.classifyBloom = async (text) => {
  try {
    const response = await aiProxy.post('/analyze', {
      service_type: 'classify_bloom',
      text
    });
    return response.data.result;
  } catch (error) {
    console.error('Bloom classification error:', error.message);
    return { text, bloom_level: fallbackBloom(text) };
  }
};

// Analytics Engine calls
exports.calculateAttainment = async (marksData) => {
  try {
    const response = await analyticsProxy.post('/analyze', {
      data: marksData
    });
    return response.data;
  } catch (error) {
    console.error('Analytics engine error:', error.message);
    throw new Error('Attainment calculation failed');
  }
};

