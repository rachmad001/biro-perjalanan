# 🚀 NestJS Prisma REST API

Proyek ini adalah backend RESTful API yang dibangun menggunakan **NestJS** framework dan **Prisma ORM**.

## 🛠 Tech Stack

- **Framework:** [NestJS](https://nestjs.com/)
- **Language:** TypeScript
- **ORM:** [Prisma](https://www.prisma.io/)
- **Database:** MySQL
- **Documentation:** POSTMAN

## 📋 Prasyarat

Pastikan Anda telah menginstal software berikut di komputer Anda:

- [Node.js](https://nodejs.org/) (Versi 18 atau lebih baru disarankan)
- [npm](https://www.npmjs.com/) atau [yarn](https://yarnpkg.com/)
- Database MySQL (Lokal atau Cloud)

## ⚙️ Instalasi

1. **Clone repository ini**
   ```bash
   git clone https://github.com/rachmad001/biro-perjalanan.git
   cd nama-repo

2. **Install dependency**
npm install
# atau
yarn install

3. **Konfigurasi Environment**
cp .env.example .env
Lalu sesuaikan dengan konfigurasi yang ada

4. **Menyiapkan database**
jalankan perintah untuk mengenerate prisma
npx prisma generate

Gunakan ini untuk menyinkronkan skema Prisma dengan database
npx prisma migrate dev --name init

Jika Anda menggunakan database cloud yang terkadang memiliki limitasi pada migrate, gunakan db push untuk langsung menimpa skema:
npx prisma db push

5. **Menjalankan program**
npm run start