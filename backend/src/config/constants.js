module.exports = {
    // User roles
    USER_ROLES: {
        ADMIN: 'admin',
        FACULTY: 'faculty',
        HOD: 'hod',
        DEAN: 'dean'
    },

    // Bloom's Taxonomy levels
    BLOOM_LEVELS: [
        'Remember',
        'Understand',
        'Apply',
        'Analyze',
        'Evaluate',
        'Create'
    ],

    // Assessment types
    ASSESSMENT_TYPES: {
        FORMATIVE: 'formative',
        SUMMATIVE: 'summative'
    },

    // Attainment levels
    ATTAINMENT_LEVELS: {
        LEVEL1: { threshold: 50, name: 'Level 1', description: 'Satisfactory' },
        LEVEL2: { threshold: 60, name: 'Level 2', description: 'Good' },
        LEVEL3: { threshold: 70, name: 'Level 3', description: 'Excellent' }
    },

    // CO generation defaults
    CO_DEFAULTS: {
        MIN_COUNT: 4,
        MAX_COUNT: 6
    },

    // HTTP Status codes
    HTTP_STATUS: {
        OK: 200,
        CREATED: 201,
        BAD_REQUEST: 400,
        UNAUTHORIZED: 401,
        FORBIDDEN: 403,
        NOT_FOUND: 404,
        INTERNAL_SERVER: 500
    },

    // File upload
    FILE_TYPES: {
        EXCEL: ['xlsx', 'xls', 'csv'],
        DOCUMENT: ['pdf', 'doc', 'docx', 'txt']
    }
};