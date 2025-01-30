sudo apt-get update
sudo apt-get upgrade -y
mkdir -p chatbot-project/{frontend,backend,docker}
cd chatbot-project/backend && npm init -y && npm install express mongoose dotenv cors helmet jsonwebtoken google-auth-library
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash - && sudo apt-get install -y nodejs
cd chatbot-project && npm init -y && cd backend && npm install express mongoose dotenv cors helmet jsonwebtoken google-auth-library
cd && mkdir -p chatbot-project && cd chatbot-project && npm init -y && mkdir backend && cd backend && npm init -y && npm install express mongoose dotenv cors helmet jsonwebtoken google-auth-library
cd backend && npm init -y && npm install express mongoose dotenv cors helmet jsonwebtoken google-auth-library
cd ~/chatbot-project/backend && mkdir -p src/{config,controllers,middleware,models,routes,utils} && touch src/config/db.js src/config/config.js src/app.js
cd ~/chatbot-project/frontend && npm create vite@latest . -- --template react-ts
cd ..
cd backend/
cd ~/chatbot-project/frontend && npm create vite@latest . -- --template react-ts && npm install
cd ~/chatbot-project/frontend && rm -rf * && npm create vite@latest . -- --template react-ts
cd ~/chatbot-project && rm -rf frontend && mkdir frontend && cd frontend && npm create vite@latest . -- --template react-ts
cd ~/chatbot-project/frontend && npm install && npm install @mui/material @emotion/react @emotion/styled @mui/icons-material axios react-router-dom @react-oauth/google
cd ~/chatbot-project/frontend && mkdir -p src/{components,pages,services,utils,contexts,types}
cd ~/chatbot-project/docker && docker-compose up --build
sudo apt-get update && sudo apt-get install -y docker.io docker-compose
cd chatbot-project/
cd backend/
npm start
cd chatbot-project/
cd frontend/
npm install
npm run build
npm start
npm run dev
cd ~/chatbot-project/docker && sudo docker-compose up --build
docker-compose up --build
sudo docker-compose up --build
sudo docker-compose -f docker/docker-compose.yml down
ls
sudo docker-compose -f docker/docker-compose.yml up
cd ..
sudo docker-compose -f docker/docker-compose.yml down
sudo docker-compose -f docker/docker-compose.yml up --build
docker-compose up
cd docker/
docker-compose up
sudo docker-compose up
sudo docker-compose up mongodb
sudo start docker mongodb
sudo docker start  mongodb
sudo docker start mongodb
sudo docker-compose up mongodb
sudo snap install tree
sudo apt install tree
tree -I "node_modules"
sudo ufw allow 3000/tcp
sudo ufw allow 3000
sudo apt install ufw -y && sudo ufw allow 3000/tcp
sudo apt install ufw -y && sudo ufw allow 5173/tcp
tree -I "node_modules"
nslookup yeditepemyo.digital
mkdir -p chatbot-project/docker/nginx/conf.d
sudo apt-get update && sudo apt-get install -y certbot python3-certbot-nginx
cd chatbot-project/docker && docker-compose down && docker-compose up --build -d
sudo docker-compose down && sudo docker-compose up --build -d
cd ~/chatbot-project/docker && sudo docker-compose up --build -d
sudo docker system prune -af && sudo docker volume prune -f
cd ~/chatbot-project/docker && sudo docker-compose up --build -d
sudo systemctl stop nginx && sudo docker-compose up --build -d
sudo certbot certonly --nginx -d yeditepemyo.digital -d www.yeditepemyo.digital -d api.yeditepemyo.digital
sudo docker-compose logs nginx
sudo certbot certificates
sudo docker-compose logs -f
cd ~/chatbot-project/docker && sudo docker-compose logs
sudo certbot certonly --standalone -d yeditepemyo.digital -d www.yeditepemyo.digital -d api.yeditepemyo.digital
sudo netstat -tuln
tree -I "node_modules"
cd ~/chatbot-project/docker && sudo mkdir -p nginx/ssl/live/yeditepemyo.digital && sudo cp /etc/letsencrypt/live/yeditepemyo.digital/* nginx/ssl/live/yeditepemyo.digital/ && sudo mkdir -p nginx/ssl/live/api.yeditepemyo.digital && sudo cp /etc/letsencrypt/live/yeditepemyo.digital/* nginx/ssl/live/api.yeditepemyo.digital/
sudo ls -la /etc/letsencrypt/live/
sudo ls -la /etc/letsencrypt/live/yeditepemyo.digital/
cd ~/chatbot-project/docker && sudo mkdir -p nginx/ssl/live/yeditepemyo.digital && sudo cp /etc/letsencrypt/archive/yeditepemyo.digital/fullchain2.pem nginx/ssl/live/yeditepemyo.digital/fullchain.pem && sudo cp /etc/letsencrypt/archive/yeditepemyo.digital/privkey2.pem nginx/ssl/live/yeditepemyo.digital/privkey.pem && sudo mkdir -p nginx/ssl/live/api.yeditepemyo.digital && sudo cp /etc/letsencrypt/archive/yeditepemyo.digital/fullchain2.pem nginx/ssl/live/api.yeditepemyo.digital/fullchain.pem && sudo cp /etc/letsencrypt/archive/yeditepemyo.digital/privkey2.pem nginx/ssl/live/api.yeditepemyo.digital/privkey.pem
cd ~/chatbot-project/docker && sudo chmod -R 755 nginx/ssl && sudo docker-compose down && sudo docker-compose up -d
sudo lsof -i :80
sudo netstat -tulpn | grep :80
sudo systemctl stop nginx
cd ~/chatbot-project/docker && sudo docker-compose up -d
sudo pkill -f nginx
cd ~/chatbot-project/docker && sudo docker-compose up -d
cd ~/chatbot-project/docker && sudo docker-compose logs
cd ~/chatbot-project/docker && docker-compose restart backend
cd ~/chatbot-project/docker && sudo docker-compose restart backend
cd ~/chatbot-project/docker && sudo docker-compose logs backend
cd ~/chatbot-project/docker && sudo docker-compose restart frontend
cd ~/chatbot-project/docker && sudo docker-compose restart backend frontend
netstat -tuln
sudo ufw allow 5355
netstat -tuln
sudo docker-compose -f docker/docker-compose.yml down
sudo docker-compose -f docker/docker-compose.yml up --build
cd chatbot-project/
sudo docker-compose -f docker/docker-compose.yml up --build
docker-compose down
cd docker/
docker-compose down
sudo docker-compose down
docker-compose up --build -d
sudo docker-compose up --build -d
docker-compose logs -f
sudo docker-compose logs -f
sudo docker-compose up --build -d
docker-compose down
sudo docker-compose down
sudo docker-compose up --build -d
sudo docker-compose down
sudo docker-compose up --build -d
sudo docker-compose down
sudo docker-compose up --build -d
sudo docker system prune -af && sudo docker volume prune -f
sudo docker-compose up --build -d
cd chatbot-project/docker && docker-compose down && docker-compose up --build
cd chatbot-project/docker && sudo docker-compose down && sudo docker-compose up --build
cd ~/chatbot-project/backend && npm install
cd ~/chatbot-project/frontend && npm run build
cd ~/chatbot-project/docker && sudo docker compose down && sudo docker compose build --no-cache frontend && sudo docker compose up -d
cd ~/chatbot-project/docker && sudo docker-compose down && sudo docker-compose build --no-cache frontend && sudo docker-compose up -d
cd ~/chatbot-project/docker && sudo docker system prune -af
cd ~/chatbot-project/docker && sudo docker-compose down && sudo docker-compose build --no-cache frontend && sudo docker-compose up -d
cd ~/chatbot-project/docker && sudo docker-compose down && sudo docker-compose up -d
cd ~/chatbot-project/docker && sudo docker-compose down -v && sudo docker-compose build --no-cache && sudo docker-compose up -d
cd ~/chatbot-project/docker && sudo docker-compose down && sudo docker-compose build frontend --no-cache && sudo docker-compose up -d
cd chatbot-project/
cd docker/
sudo docker-compose up --build -d
cd chatbot-project/frontend && npm install firebase
cd ../backend && npm install firebase-admin
cd chatbot-project/frontend && npm uninstall @react-oauth/google
cd ../frontend && npm install @mui/icons-material
cd ../docker && sudo docker-compose up --build -d
sudo docker-compose up --build -d
cd ../docker && sudo docker-compose up --build -d
sudo docker-compose up --build -d
cd ../docker && sudo docker-compose up --build -d
sudo docker system prune -af
sudo docker-compose up --build -d
cd chatbot-project/frontend && npm install @auth0/auth0-react
cd chatbot-project/backend && npm install express-oauth2-jwt-bearer
cd ../backend && npm install express-oauth2-jwt-bearer
cd chatbot-project/frontend && npm install @auth0/auth0-react
sudo docker system prune -af && sudo docker volume prune -f
sudo docker system prune -af
tree -I "node_modules"
tree -I "node_modules"
cd chatbot-project/docker/
sudo docker-compose down
sudo docker-compose up --build -d
sudo docker system prune -af && sudo docker volume prune -f
sudo docker-compose up --build -d
sudo docker system prune -af && sudo docker volume prune -f
sudo docker-compose down
sudo docker system prune -af && sudo docker volume prune -f
sudo docker-compose up --build -d
sudo docker-compose down
sudo docker system prune -af && sudo docker volume prune -f
sudo docker-compose up --build -d
sudo docker system prune -af && sudo docker volume prune -f
sudo docker-compose up --build -d
sudo docker system prune -af && sudo docker volume prune -f
sudo docker-compose up --build -d
sudo docker-compose down
sudo docker system prune -af && sudo docker volume prune -f
sudo docker-compose up --build -d
sudo docker-compose down
sudo docker system prune -af && sudo docker volume prune -f
sudo docker-compose up --build -d
sudo docker-compose down
sudo docker system prune -af && sudo docker volume prune -f
sudo docker-compose up --build -d
sudo docker-compose down
sudo docker system prune -af && sudo docker volume prune -f
sudo docker-compose down
sudo docker-compose up --build -d
sudo reboot
ping google.com
cd frontend && npm install @mui/icons-material
cd chatbot-project/frontend/
npm install @mui/icons-material
npm uninstall @react-oauth/google
npm install @auth0/auth0-react
curl -X POST https://yeditepemyo.digital/api/auth/initial-admin   -H "Content-Type: application/json"   -d '{
    "email": "admin@yeditepe.edu.tr",
    "password": "admin123",
    "name": "Admin"
  }'
cd chatbot-project/docker && sudo docker-compose down && sudo docker-compose up --build -d
sudo systemctl stop nginx && sudo docker-compose -f chatbot-project/docker/docker-compose.yml up -d
cd /home/iskender.cevik/chatbot-project/docker && sudo systemctl stop nginx && sudo docker-compose up -d
git remote add origin https://knowhyco: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@github.com/icevik/MYOChatbotProje.git && git push -u origin main
git add . && git commit -m "Initial commit" && git push -u origin main
git branch -M main && git push -u origin main
git remote set-url origin https://knowhyco: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@github.com/icevik/MYOChatbotProje.git && git push -u origin main
git push -f origin main
rm -rf .git
git init && git config --global user.name "knowhyco" && git config --global user.email "info@knowhy.co" && git add . && git commit -m "Initial commit" && git branch -M main && git remote add origin https://github.com/icevik/MYOChatbotProje.git && git push -u origin main
git remote set-url origin https://knowhyco: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@github.com/icevik/MYOChatbotProje.git && git push -u origin main
tar --exclude='node_modules' -czvf /home/iskender.cevik/chatbot-project.tar.gz -C /home/iskender.cevik chatbot-project
tree -I "node_modules"
cd chatbot-project/frontend/
cd chatbot-project/backend/
npm start
cd ~/chatbot-project/docker && sudo docker-compose down && sudo docker-compose up --build -d
cd ~/chatbot-project/frontend && npm install -D tailwindcss postcss autoprefixer && npx tailwindcss init -p
cd ~/chatbot-project/frontend/public && wget https://www.yeditepe.edu.tr/sites/default/files/logo-tr.png -O yeditepe-logo.png
cd ~/chatbot-project/docker && sudo docker-compose down && sudo docker-compose up --build -d
cd ~/chatbot-project/frontend && rm -rf node_modules package-lock.json && npm install && npm run dev
cd ~/chatbot-project/frontend && npm run build && npm run preview
cd ~/chatbot-project/frontend && npm install terser && npm run build && npm run preview
sudo docker system prune -af && sudo docker volume prune -f
cd ~/chatbot-project/frontend && npm run dev
cd ~/chatbot-project/backend && npm start
