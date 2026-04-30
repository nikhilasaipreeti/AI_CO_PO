const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const path = require('path');

// Load env file
dotenv.config({ path: path.join(__dirname, '../.env') });

// Simple User Schema
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: String,
    department: String,
    employeeId: String
});

const User = mongoose.model('User', userSchema);

// PO Schema
const poSchema = new mongoose.Schema({
    code: String,
    description: String,
    category: String
});

const PO = mongoose.model('PO', poSchema);

// PSO Schema
const psoSchema = new mongoose.Schema({
    code: String,
    description: String,
    program: String
});

const PSO = mongoose.model('PSO', psoSchema);

const seedDatabase = async() => {
    try {
        const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/CO_PO';

        console.log('📦 Connecting to MongoDB...');
        await mongoose.connect(mongoURI);
        console.log('✅ Connected to MongoDB');

        // Clear existing data
        console.log('🧹 Clearing existing data...');
        await User.deleteMany({});
        await PO.deleteMany({});
        await PSO.deleteMany({});

        // Hash passwords
        const salt = await bcrypt.genSalt(10);
        const adminPassword = await bcrypt.hash('admin123', salt);
        const facultyPassword = await bcrypt.hash('faculty123', salt);

        // Create users
        const admin = await User.create({
            name: 'Admin User',
            email: 'admin@college.edu',
            password: adminPassword,
            role: 'admin',
            department: 'Administration',
            employeeId: 'ADMIN001'
        });
        console.log('✅ Admin user created');

        const faculty = await User.create({
            name: 'Dr. John Smith',
            email: 'faculty@college.edu',
            password: facultyPassword,
            role: 'faculty',
            department: 'Computer Science',
            employeeId: 'FAC001'
        });
        console.log('✅ Faculty user created');

        // Create POs
        const pos = await PO.insertMany([{
                code: 'PO1',
                description: 'Engineering knowledge: Apply the knowledge of mathematics, science, engineering fundamentals, and an engineering specialization to the solution of complex engineering problems.',
                category: 'engineering'
            },
            {
                code: 'PO2',
                description: 'Problem analysis: Identify, formulate, review research literature, and analyze complex engineering problems reaching substantiated conclusions.',
                category: 'engineering'
            },
            {
                code: 'PO3',
                description: 'Design/development of solutions: Design solutions for complex engineering problems and design system components or processes.',
                category: 'engineering'
            }
        ]);
        console.log(`✅ ${pos.length} POs created`);

        // Create PSOs
        const psos = await PSO.insertMany([{
                code: 'PSO1',
                description: 'Professional Skills: The ability to understand, analyze and develop computer programs in the areas related to algorithms, system software, multimedia, web design, and networking for efficient design of computer-based systems.',
                program: 'Computer Science'
            },
            {
                code: 'PSO2',
                description: 'Problem-Solving Skills: The ability to apply standard practices and strategies in software project development using open-ended programming environments to deliver a quality product for business success.',
                program: 'Computer Science'
            }
        ]);
        console.log(`✅ ${psos.length} PSOs created`);

        console.log('\n✅ Database seeded successfully!');
        console.log('📝 Login credentials:');
        console.log('   Admin: admin@college.edu / admin123');
        console.log('   Faculty: faculty@college.edu / faculty123');

        await mongoose.connection.close();
        console.log('👋 Database connection closed');

    } catch (error) {
        console.error('❌ Seeding error:', error);
    }
};

seedDatabase();