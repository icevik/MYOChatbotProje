# Google Cloud Console Ayarları

1. https://console.cloud.google.com/apis/credentials adresine gidin
2. OAuth 2.0 Client ID'yi seçin
3. Authorized JavaScript origins'e ekleyin:
   ```
   http://35.184.81.65:5173
   ```
4. Authorized redirect URIs'ye ekleyin:
   ```
   http://35.184.81.65:5173
   http://35.184.81.65:5173/auth/google/callback
   ```

5. OAuth consent screen'de:
   - Application type: External
   - Application name: Yeditepe Chatbot
   - User support email: [email adresiniz]
   - Application home page: http://35.184.81.65:5173
   - Authorized domains: 35.184.81.65
   - Developer contact information: [email adresiniz]

6. Scopes:
   - .../auth/userinfo.email
   - .../auth/userinfo.profile
   - openid

7. Test users:
   - @yeditepe.edu.tr uzantılı tüm test kullanıcılarını ekleyin
   - @std.yeditepe.edu.tr uzantılı tüm test kullanıcılarını ekleyin

8. Publishing status:
   - Production'a geçmeden önce "Testing" olarak bırakın
   - Test kullanıcıları ekledikten sonra "Production" yapın 