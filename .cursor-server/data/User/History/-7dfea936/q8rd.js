require('dotenv').config();

module.exports = {
    PORT: process.env.PORT || 3000,
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/chatbot',
    JWT_SECRET: process.env.JWT_SECRET || 'your-secret-key',
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    ALLOWED_DOMAINS: ['yeditepe.edu.tr', 'std.yeditepe.edu.tr']
};
