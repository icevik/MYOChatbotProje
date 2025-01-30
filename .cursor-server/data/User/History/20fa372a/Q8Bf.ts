import { Request, Response } from 'express';
import { User } from '../models/user.model';
import jwt from 'jsonwebtoken';
import axios from 'axios';

export const auth0Login = async (req: Request, res: Response) => {
    try {
        const { token } = req.body;

        // Auth0 Management API'den kullanıcı bilgilerini al
        const response = await axios.get('https://dev-8h3oit57of6ajoru.us.auth0.com/userinfo', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const auth0User = response.data;

        // Email doğrulaması
        if (!auth0User.email || !auth0User.email.endsWith('@yeditepe.edu.tr')) {
            return res.status(403).json({ error: 'Sadece Yeditepe email adresleri ile giriş yapılabilir.' });
        }

        // Kullanıcıyı veritabanında bul veya oluştur
        let user = await User.findOne({ email: auth0User.email });

        if (!user) {
            user = await User.create({
                email: auth0User.email,
                name: auth0User.name || auth0User.email.split('@')[0],
                picture: auth0User.picture
            });
        }

        // JWT token oluştur
        const jwtToken = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '24h' }
        );

        res.json({
            user,
            token: jwtToken
        });
    } catch (error) {
        console.error('Auth0 login error:', error);
        res.status(500).json({ error: 'Giriş yapılırken bir hata oluştu' });
    }
}; 