import { checkJwt } from '../config/firebase-admin';
import User from '../models/User';

export const authMiddleware = [
  checkJwt,
  async (req, res, next) => {
    try {
      const userEmail = req.auth.payload.email;
      const allowedDomains = ['yeditepe.edu.tr', 'std.yeditepe.edu.tr'];
      const userDomain = userEmail.split('@')[1];

      if (!allowedDomains.includes(userDomain)) {
        return res.status(403).json({ error: 'Bu e-posta uzantısına izin verilmiyor.' });
      }

      const user = await User.findOne({ email: userEmail });
      if (!user) {
        const newUser = new User({
          email: userEmail,
          name: req.auth.payload.name || '',
          role: 'user'
        });
        await newUser.save();
        req.user = newUser;
      } else {
        if (user.banned) {
          return res.status(403).json({ error: 'Bu hesap banlanmış.' });
        }
        req.user = user;
      }
      next();
    } catch (error) {
      res.status(401).json({ error: 'Yetkilendirme hatası.' });
    }
  }
];

const adminAuth = async (req, res, next) => {
    try {
        await authMiddleware[1](req, res, () => {
            if (req.user.role !== 'admin') {
                throw new Error();
            }
            next();
        });
    } catch (error) {
        res.status(403).send({ error: 'Admin yetkisi gerekli' });
    }
};

module.exports = { authMiddleware, adminAuth }; 