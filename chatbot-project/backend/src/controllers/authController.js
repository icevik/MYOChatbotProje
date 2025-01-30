const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const User = require('../models/User');

const client = new OAuth2Client(config.GOOGLE_CLIENT_ID);

const googleLogin = async (req, res) => {
    try {
        const { token } = req.body;
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: config.GOOGLE_CLIENT_ID
        });

        const payload = ticket.getPayload();
        const domain = payload.email.split('@')[1];

        if (!config.ALLOWED_DOMAINS.includes(domain)) {
            return res.status(403).send({ error: 'Sadece Yeditepe mail adresleri ile giriş yapılabilir' });
        }

        let user = await User.findOne({ email: payload.email });
        
        if (!user) {
            user = new User({
                name: payload.name,
                email: payload.email,
                role: 'user'
            });
            await user.save();
        }

        if (user.banned) {
            return res.status(403).send({ error: 'Hesabınız engellenmiş durumda' });
        }

        const jwtToken = jwt.sign({ userId: user._id }, config.JWT_SECRET);
        res.send({ user, token: jwtToken });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

module.exports = {
    googleLogin
}; 