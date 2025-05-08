# 1️⃣ Build aşaması
FROM node:20-alpine AS builder

WORKDIR /app

# package.json ve package-lock.json dosyalarını kopyala
COPY package.json package-lock.json ./

# Bağımlılıkları yükle
RUN npm install --frozen-lockfile --ignore-scripts --network-timeout=1200000

# Proje dosyalarını kopyala
COPY . .

# Next.js build işlemini gerçekleştir
RUN npm run build


# Uygulamanın çalışacağı portu belirle
ENV PORT=5001
EXPOSE 5001

# Uygulamayı başlat
CMD ["npm", "run", "start"]
