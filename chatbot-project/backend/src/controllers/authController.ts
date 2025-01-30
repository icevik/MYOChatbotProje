import { Request, Response } from 'express';
import admin from '../config/firebase-admin';
import User from '../models/User';

export const googleLogin = async (req: Request, res: Response) => {
    try {
        const { idToken } = req.body;

        if (!idToken) {
            return res.status(400).json({ error: 'idToken gerekli' });
        }

        const decodedToken = await admin.auth().verifyIdToken(idToken);
        const { email, name } = decodedToken;

        if (!email?.endsWith('@yeditepe.edu.tr') && !email?.endsWith('@std.yeditepe.edu.tr')) {
            return res.status(403).json({ error: 'Sadece Yeditepe mail adresleri ile giriş yapılabilir' });
        }

        let user = await User.findOne({ email });

        if (!user) {
            user = await User.create({
                email,
                name: name || email.split('@')[0],
                role: 'user'
            });
        }

        if (user.banned) {
            return res.status(403).json({ error: 'Hesabınız engellenmiş durumda' });
        }

        res.json({
            user: {
                _id: user._id,
                email: user.email,
                name: user.name,
                role: user.role
            }
        });
    } catch (error) {
        console.error('Google login error:', error);
        res.status(401).json({ error: 'Giriş yapılırken bir hata oluştu' });
    }
}; 