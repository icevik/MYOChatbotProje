const admin = require('../config/firebase-admin');
const User = require('../models/User');

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split('Bearer ')[1];
        
        if (!token) {
            return res.status(401).json({ error: 'Token bulunamadı' });
        }

        const decodedToken = await admin.auth().verifyIdToken(token);
        const { email } = decodedToken;

        if (!email?.endsWith('@yeditepe.edu.tr') && !email?.endsWith('@std.yeditepe.edu.tr')) {
            return res.status(403).json({ error: 'Sadece Yeditepe mail adresleri ile giriş yapılabilir' });
        }

        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(401).json({ error: 'Kullanıcı bulunamadı' });
        }

        if (user.banned) {
            return res.status(403).json({ error: 'Hesabınız engellenmiş durumda' });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error('Auth middleware error:', error);
        res.status(401).json({ error: 'Geçersiz token' });
    }
};

const adminAuth = async (req, res, next) => {
    try {
        await auth(req, res, () => {
            if (req.user.role !== 'admin') {
                throw new Error();
            }
            next();
        });
    } catch (error) {
        res.status(403).send({ error: 'Admin yetkisi gerekli' });
    }
};

module.exports = { auth, adminAuth }; 