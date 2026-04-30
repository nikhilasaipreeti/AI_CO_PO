const axios = require('axios');

const API_URL = 'http://localhost:5000/api';

const testAPI = async() => {
    try {
        // Test registration
        console.log('1. Testing Registration...');
        const registerData = {
            name: 'Test Faculty',
            email: 'test@college.edu',
            password: 'test123',
            department: 'Computer Science'
        };

        const registerRes = await axios.post(`${API_URL}/auth/register`, registerData);
        console.log('✅ Registration successful:', registerRes.data.user);

        // Test login
        console.log('\n2. Testing Login...');
        const loginRes = await axios.post(`${API_URL}/auth/login`, {
            email: 'test@college.edu',
            password: 'test123'
        });
        console.log('✅ Login successful:', loginRes.data.user);
        console.log('Token:', loginRes.data.token);

    } catch (error) {
        console.error('❌ Test failed:', error.response ? error.response.data : error.message);
    }
};

testAPI();