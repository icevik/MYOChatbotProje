# Yeditepe Chatbot Projesi

Bu proje, Yeditepe Üniversitesi öğrencileri için geliştirilmiş bir chatbot sistemidir. Öğrenciler, Google hesapları ile giriş yaparak derslerle ilgili sorularını chatbot'a sorabilirler.

## Özellikler

- Google OAuth ile giriş (@yeditepe.edu.tr ve @std.yeditepe.edu.tr uzantılı hesaplar)
- Kategori bazlı ders listesi (INP, MEC, AUT, ELT)
- Her ders için özel chatbot
- Konuşma geçmişi
- Admin paneli (kullanıcı yönetimi, ders yönetimi)
- Responsive tasarım

## Teknolojiler

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Google OAuth

### Frontend
- React
- TypeScript
- Material-UI
- React Router
- Axios

### Deployment
- Docker
- Docker Compose

## Kurulum

1. Projeyi klonlayın:
```bash
git clone <repo-url>
cd chatbot-project
```

2. Google OAuth için credentials oluşturun:
- Google Cloud Console'a gidin
- Yeni bir proje oluşturun
- OAuth 2.0 credentials oluşturun
- İzin verilen domain'leri ekleyin
- Client ID ve Client Secret'ı alın

3. Environment değişkenlerini ayarlayın:
```bash
# backend/.env
PORT=3000
MONGODB_URI=mongodb://root:example@mongodb:27017/chatbot?authSource=admin
JWT_SECRET=your-secret-key-here
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# frontend/.env
VITE_GOOGLE_CLIENT_ID=your-google-client-id
```

4. Docker ile çalıştırın:
```bash
cd docker
docker-compose up --build
```

5. Tarayıcıda açın:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000

## API Endpoints

### Auth
- POST /api/auth/google - Google ile giriş

### Courses
- GET /api/courses - Tüm dersleri listele
- GET /api/courses/category/:category - Kategori bazlı dersleri listele
- POST /api/courses - Yeni ders ekle (Admin)
- PATCH /api/courses/:id - Ders güncelle (Admin)
- DELETE /api/courses/:id - Ders sil (Admin)

### Conversations
- POST /api/conversations/message - Yeni mesaj gönder
- GET /api/conversations - Kullanıcının konuşmalarını listele
- GET /api/conversations/:id - Konuşma detayı

## Katkıda Bulunma

1. Fork'layın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit'leyin (`git commit -m 'Add some amazing feature'`)
4. Push'layın (`git push origin feature/amazing-feature`)
5. Pull Request açın

## Lisans

Bu proje MIT lisansı altında lisanslanmıştır. 