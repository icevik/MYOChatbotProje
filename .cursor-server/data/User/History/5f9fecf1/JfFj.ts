import { Request, Response, NextFunction } from 'express';
import { checkJwt } from '../config/auth0';
import User from '../models/User';

interface AuthRequest extends Request {
  user?: any;
  auth?: {
    payload: {
      email: string;
      name: string;
      sub: string;
    };
  };
}

export const authMiddleware = [
  checkJwt,
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const userEmail = req.auth?.payload.email;
      if (!userEmail) {
        return res.status(401).json({ error: 'Email bilgisi bulunamadı.' });
      }

      const allowedDomains = ['yeditepe.edu.tr', 'std.yeditepe.edu.tr'];
      const userDomain = userEmail.split('@')[1];

      if (!allowedDomains.includes(userDomain)) {
        return res.status(403).json({ error: 'Bu e-posta uzantısına izin verilmiyor.' });
      }

      let user = await User.findOne({ email: userEmail });
      if (!user) {
        user = await User.create({
          email: userEmail,
          name: req.auth?.payload.name || '',
          role: 'user'
        });
      }

      if (user.banned) {
        return res.status(403).json({ error: 'Bu hesap banlanmış.' });
      }

      req.user = user;
      next();
    } catch (error) {
      console.error('Auth middleware error:', error);
      res.status(401).json({ error: 'Yetkilendirme hatası.' });
    }
  }
];

export const adminAuth = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.user || req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Admin yetkisi gerekli.' });
    }
    next();
  } catch (error) {
    console.error('Admin auth error:', error);
    res.status(403).json({ error: 'Admin yetkisi gerekli.' });
  }
}; 