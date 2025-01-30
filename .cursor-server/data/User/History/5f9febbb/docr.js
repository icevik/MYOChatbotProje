const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.verifyToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({ error: 'Token bulunamadı' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        const user = await User.findById(decoded.userId).select('-password');
        
        if (!user) {
            return res.status(401).json({ error: 'Kullanıcı bulunamadı' });
        }

        if (user.status !== 'active') {
            return res.status(403).json({ error: 'Hesabınız aktif değil' });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error('Token doğrulama hatası:', error);
        res.status(401).json({ error: 'Geçersiz token' });
    }
};

exports.isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Bu işlem için admin yetkisi gerekli' });
    }
    next();
};

module.exports = { verifyToken, isAdmin }; 