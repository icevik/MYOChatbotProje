import { Request, Response, NextFunction } from 'express';
import admin from '../config/firebase-admin';
import User from '../models/User';

export interface AuthRequest extends Request {
  user?: any;
}

export const auth = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split('Bearer ')[1];
        
        if (!token) {
            return res.status(401).json({ error: 'Token bulunamadı' });
      }

        const decodedToken = await admin.auth().verifyIdToken(token);
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

      req.user = user;
      next();
    } catch (error) {
      console.error('Auth middleware error:', error);
        res.status(401).json({ error: 'Geçersiz token' });
  }
}; 