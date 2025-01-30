import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    department: '',
    studentId: ''
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateEmail = (email: string) => {
    return email.endsWith('@yeditepe.edu.tr') || email.endsWith('@std.yeditepe.edu.tr');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (!validateEmail(formData.email)) {
      setError('Sadece Yeditepe e-posta adresleri (@yeditepe.edu.tr veya @std.yeditepe.edu.tr) kabul edilmektedir.');
      return;
    }

    try {
      if (isRegister) {
        // Kayıt işlemi
        const response = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Kayıt işlemi başarısız oldu');
        }

        setSuccessMessage('Hesabınız oluşturuldu. Admin onayı bekleniyor.');
        setIsRegister(false);
        setFormData({
          email: '',
          password: '',
          name: '',
          department: '',
          studentId: ''
        });
      } else {
        // Giriş işlemi
        const { email, password } = formData;
        await login(email, password);
        navigate('/');
      }
    } catch (err: any) {
      setError(err.message || 'Bir hata oluştu');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100">
      <div className="w-full max-w-md px-4">
        <div className="card space-y-8">
          {/* Logo ve Başlık */}
          <div className="text-center">
            <img
              src="/yeditepe-logo.png"
              alt="Yeditepe Logo"
              className="h-16 mx-auto mb-4"
            />
            <h1 className="text-2xl font-bold text-secondary-900">
              Yeditepe Chatbot
            </h1>
            <p className="mt-2 text-secondary-600">
              {isRegister
                ? 'Yeditepe mail adresiniz ile hesap oluşturun'
                : 'Mail adresiniz ve şifreniz ile giriş yapın'}
            </p>
          </div>

          {/* Hata ve Başarı Mesajları */}
          {error && (
            <div className="p-4 rounded-lg bg-red-50 border border-red-200">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {successMessage && (
            <div className="p-4 rounded-lg bg-green-50 border border-green-200">
              <p className="text-sm text-green-600">{successMessage}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {isRegister && (
              <div>
                <label htmlFor="name" className="label">
                  Ad Soyad
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="input"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
            )}

            <div>
              <label htmlFor="email" className="label">
                E-posta
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="input"
                placeholder="ornek@yeditepe.edu.tr"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="password" className="label">
                Şifre
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="input"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            {isRegister && (
              <>
                <div>
                  <label htmlFor="department" className="label">
                    Bölüm
                  </label>
                  <input
                    id="department"
                    name="department"
                    type="text"
                    required
                    className="input"
                    value={formData.department}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label htmlFor="studentId" className="label">
                    Öğrenci Numarası
                  </label>
                  <input
                    id="studentId"
                    name="studentId"
                    type="text"
                    required
                    className="input"
                    value={formData.studentId}
                    onChange={handleChange}
                  />
                </div>
              </>
            )}

            <button type="submit" className="w-full btn btn-primary">
              {isRegister ? 'Hesap Oluştur' : 'Giriş Yap'}
            </button>
          </form>

          {/* Hesap Değiştirme Linki */}
          <div className="text-center">
            <button
              onClick={() => {
                setIsRegister(!isRegister);
                setError('');
                setSuccessMessage('');
                setFormData({
                  email: '',
                  password: '',
                  name: '',
                  department: '',
                  studentId: ''
                });
              }}
              className="text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              {isRegister ? 'Zaten hesabınız var mı? Giriş yapın' : 'Hesabınız yok mu? Kayıt olun'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 