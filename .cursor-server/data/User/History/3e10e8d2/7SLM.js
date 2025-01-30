const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Hesap oluşturma
exports.register = async (req, res) => {
  try {
    const { name, email, password, department, studentId } = req.body;

    // Email kontrolü
    if (!email.endsWith('@yeditepe.edu.tr') && !email.endsWith('@std.yeditepe.edu.tr')) {
      return res.status(400).json({ error: 'Sadece Yeditepe e-posta adresleri kabul edilmektedir.' });
    }

    // Kullanıcı var mı kontrolü
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Bu e-posta adresi zaten kullanımda.' });
    }

    // Şifre hash'leme
    const hashedPassword = await bcrypt.hash(password, 12);

    // Yeni kullanıcı oluşturma
    const user = new User({
      name,
      email,
      password: hashedPassword,
      department,
      studentId,
      status: 'pending' // Onay bekliyor
    });

    await user.save();

    res.status(201).json({ 
      message: 'Hesap oluşturuldu. Admin onayı bekleniyor.',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        status: user.status
      }
    });
  } catch (error) {
    console.error('Kayıt hatası:', error);
    res.status(500).json({ error: 'Kayıt işlemi başarısız oldu.' });
  }
};

// Giriş yapma
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Kullanıcı kontrolü
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'E-posta veya şifre hatalı.' });
    }

    // Şifre kontrolü
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'E-posta veya şifre hatalı.' });
    }

    // Status kontrolü
    if (user.status === 'pending') {
      return res.status(403).json({ error: 'Hesabınız henüz onaylanmamış.' });
    }

    if (user.status === 'banned') {
      return res.status(403).json({ error: 'Hesabınız engellenmiş durumda.' });
    }

    // JWT token oluşturma
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status
      }
    });
  } catch (error) {
    console.error('Giriş hatası:', error);
    res.status(500).json({ error: 'Giriş işlemi başarısız oldu.' });
  }
};

// Admin: Bekleyen hesapları listele
exports.getPendingUsers = async (req, res) => {
  try {
    const pendingUsers = await User.find({ status: 'pending' })
      .select('-password')
      .sort({ createdAt: -1 });

    res.json(pendingUsers);
  } catch (error) {
    console.error('Bekleyen kullanıcılar listelenemedi:', error);
    res.status(500).json({ error: 'Bekleyen kullanıcılar listelenemedi.' });
  }
};

// Admin: Hesap onaylama/reddetme
exports.updateUserStatus = async (req, res) => {
  try {
    const { userId } = req.params;
    const { status } = req.body;

    if (!['active', 'banned'].includes(status)) {
      return res.status(400).json({ error: 'Geçersiz status değeri.' });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { status },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ error: 'Kullanıcı bulunamadı.' });
    }

    res.json(user);
  } catch (error) {
    console.error('Kullanıcı durumu güncellenemedi:', error);
    res.status(500).json({ error: 'Kullanıcı durumu güncellenemedi.' });
  }
};

// Kullanıcı bilgilerini getir
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json(user);
  } catch (error) {
    console.error('Kullanıcı bilgileri alınamadı:', error);
    res.status(500).json({ error: 'Kullanıcı bilgileri alınamadı.' });
  }
};

// Tüm kullanıcıları getir (Admin)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    console.error('Kullanıcılar listelenemedi:', error);
    res.status(500).json({ error: 'Kullanıcılar listelenemedi.' });
  }
};

// Admin: İlk admin kullanıcısını oluştur
exports.createInitialAdmin = async (req, res) => {
  try {
    const adminExists = await User.findOne({ role: 'admin' });
    if (adminExists) {
      return res.status(400).json({ error: 'Admin kullanıcısı zaten mevcut.' });
    }

    const { email, password, name } = req.body;

    if (!email.endsWith('@yeditepe.edu.tr')) {
      return res.status(400).json({ error: 'Geçersiz e-posta adresi.' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const admin = new User({
      email,
      password: hashedPassword,
      name,
      role: 'admin',
      status: 'active'
    });

    await admin.save();

    res.status(201).json({
      message: 'Admin kullanıcısı oluşturuldu.',
      user: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role
      }
    });
  } catch (error) {
    console.error('Admin oluşturma hatası:', error);
    res.status(500).json({ error: 'Admin kullanıcısı oluşturulamadı.' });
  }
}; 