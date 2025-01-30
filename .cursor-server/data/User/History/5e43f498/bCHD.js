const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const connectDB = require('./config/db');
const config = require('./config/config');

// Routes
const authRoutes = require('./routes/authRoutes');
const courseRoutes = require('./routes/courseRoutes');
const conversationRoutes = require('./routes/conversationRoutes');

// Express app
const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/conversations', conversationRoutes);

// MongoDB bağlantısı
connectDB();

// Server başlatma
const PORT = config.PORT;
app.listen(PORT, () => {
    console.log(`Server ${PORT} portunda çalışıyor`);
});
