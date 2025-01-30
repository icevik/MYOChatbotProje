const mongoose = require('mongoose');
const config = require('./config');

const connectDB = async () => {
    try {
        await mongoose.connect(config.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB bağlantısı başarılı');
    } catch (error) {
        console.error('MongoDB bağlantı hatası:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
