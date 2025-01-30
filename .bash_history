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
