# 🚀 Laporan Proyek Nest.js

<p align="center">
  <a href="http://nestjs.com/" target="blank">
    <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" />
  </a>
</p>

## Deskripsi Proyek
Lab Backend adalah proyek backend berbasis Node.js dan NestJS yang menyediakan API untuk memproses data, mengelola pengguna, serta mendukung komunikasi real-time dengan WebSocket.

## ✨ Fitur Utama
- CRUD Data Pengguna
- Autentikasi dan Otorisasi JWT
- Dokumentasi API menggunakan Swagger
- Komunikasi real-time menggunakan WebSocket
- Manajemen database dengan PostgreSQL

## 📂 Struktur Folder Proyek
![Image](https://github.com/user-attachments/assets/7d6fcfb4-1713-4634-998c-2fc23102d2d5)
Lihat penjelasan lengkap setiap file proyek ini di [roadmap.sh](https://roadmap.sh/r/lab-yrg3x).
## Diagram Alur (swagger)
```mermaid
---
title: Get Mahasiswa
---
stateDiagram-v2
    Input : String 
    result : {\njika code respon = 200,\n status = true\n maka ditampilkan info berupa (nim, nama, jurusan, kelas, jenis_kelamin, dan foto_profile)}
    resultFailed : {\n status = false\n maka ditampilkan pesan error "Mahasiswa dengan nim ini sudah ada"}

    [*] --> Input 
    Input --> success 
    success --> result
    Input --> failed
    failed --> resultFailed 
```

```mermaid
---
title: Get Mahasiswa/search
---
stateDiagram-v2
    Input : String 
    result : {\njika code respon = 200,\n status = true\n maka ditampilkan info berupa (nim, nama, jurusan, kelas, jenis_kelamin, dan foto_profile)}
    resultFailed : {\n status = false\n maka ditampilkan daftar kosong"}

    [*] --> Input 
    Input --> success 
    success --> result
    Input --> failed
    failed --> resultFailed 
```

```mermaid
---
title: Get Mahasiswa{nim}/foto
---
stateDiagram-v2
    Input : String
    Input : File
    result : {\njika code respon = 201,\n status = true\n maka ditampilkan nama file foto}
    resultFailed : {\n code respon = 400, \n status = false\n maka ditampilkan pesan error "file tidak boleh kosong"}

    [*] --> Input 
    Input --> success 
    success --> result
    Input --> failed
    failed --> resultFailed 
```

```mermaid
---
title: Get Mahasiswa{nim}
---
stateDiagram-v2
    Input : String
    result : {\njika code respon = 200,\\n status = true\n maka ditampilkan info berupa (nim, nama, jurusan, kelas, jenis_kelamin, dan foto_profile)}
    resultFailed : {\n code respon = 404, \n status = false\n maka ditampilkan pesan error "tidak menemukan nim"}

    [*] --> Input 
    Input --> success 
    success --> result
    Input --> failed
    failed --> resultFailed 
```

```mermaid
---
title: Get /profile/{id}
---
stateDiagram-v2
    Input : Number
    result : {\njika code respon = 200,\\n status = true\n maka ditampilkan info berupa (nim, nama, jurusan, kelas, jenis_kelamin, dan foto_profile)}
    resultFailed : {\n code respon = 500, \n status = false\n maka ditampilkan pesan error "internal server error"}

    [*] --> Input 
    Input --> success 
    success --> result
    Input --> failed
    failed --> resultFailed 
```

```mermaid
---
title: Get /auth
---
stateDiagram-v2
    Input : Number
    result : {\njika code respon = 200,\\n status = true\n maka berhasil di autentikasi}
    resultFailed : {\n code respon = 401, \n status = false\n maka ditampilkan pesan error "Authorization header is missing"}

    [*] --> Input 
    Input --> success 
    success --> result
    Input --> failed
    failed --> resultFailed 
```

```mermaid
---
title: Post /register
---
stateDiagram-v2
    Input : String @unique
    result : {\njika code respon = 200,\\n status = true\n  maka ditampilkan info berupa (id, username, password, role, dan foto_profile)}
    resultFailed : {\n code respon = 400, \n status = false\n maka ditampilkan pesan error "User sudah digunakan"}

    [*] --> Input 
    Input --> success 
    success --> result
    Input --> failed
    failed --> resultFailed 
```

```mermaid
---
title: Post /login
---
stateDiagram-v2
    Input : String @unique
    result : {\njika code respon = 201,\\n status = true\n  maka ditampilkan info berupa (token, id, username, role, dan foto_profile)}
    resultFailed : {\n code respon = 400, \n status = false\n maka ditampilkan pesan error "Bad request"}

    [*] --> Input 
    Input --> success 
    success --> result
    Input --> failed
    failed --> resultFailed 
```

```mermaid
---
title: Post /mahasiswa/{nim}/upload
---
stateDiagram-v2
    Input : String
    result : {\njika code respon = 201,\\n status = true\n  maka ditampilkan file foto}
    resultFailed : {\n code respon = 400, \n status = false\n maka ditampilkan pesan error "file tidak boleh kosong"}

    [*] --> Input 
    Input --> success 
    success --> result
    Input --> failed
    failed --> resultFailed 
```

```mermaid
---
title: Post /mahasiswa
---
stateDiagram-v2
    Input : String
    result : {\njika code respon = 201,\\n status = true\n  maka ditampilkan info berupa (token, id, username, role, dan foto_profile)}
    resultFailed : {\n code respon = 400, \n status = false\n maka ditampilkan pesan error "mahasiswa dengan nim ini sudah ada"}

    [*] --> Input 
    Input --> success 
    success --> result
    Input --> failed
    failed --> resultFailed 
```

```mermaid
---
title: authorizer
---
stateDiagram-v2
    value : Cookie[token]
    resultFailed : {msg as string, status = false}
    result : {msg as object\n(username as string,\nuuid as string)}
    [*] --> cookie
    cookie --> success
    success --> result
    cookie --> failed
    failed --> resultFailed
```

```mermaid
---
title: Delete /mahasiswa/{nim}
---
stateDiagram-v2
    Input : String
    result : {\njika code respon = 200,\\n status = true\n  maka berhasil menghapus nim}
    resultFailed : {\n code respon = 404, \n status = false\n maka ditampilkan pesan error "tidak menemukan nim"}

    [*] --> Input 
    Input --> success 
    success --> result
    Input --> failed
    failed --> resultFailed 
```

```mermaid
---
title: Put 
---
stateDiagram-v2
    Input : String
    result : {\njika code respon = 200,\\n status = true\n  maka berhasil mengupdate nim}
    resultFailed : {\n code respon = 500, \n status = false\n maka ditampilkan pesan error "internal server error"}

    [*] --> Input 
    Input --> success 
    success --> result
    Input --> failed
    failed --> resultFailed 
```

# Diagram Schema
```mermaid
---
title: Chat App DB Schema
---
classDiagram
  class Mahasiswa {
    +string nim
    +string nama
    +string jurusan
    +string kelas
    +jenis_kelamin jenis_kelamin
    +string foto_profile
  }
  class User {
    Int id 
    String username     
    String password 
    role Role
    String foto_profile
  }
```

## 💻 Tech Stack
### Client:  
- *Swagger*: Untuk mendokumentasikan dan menguji API.
- *Socket.io*: Library JavaScript untuk koneksi WebSocket ke server.

### Server:  
- *Node.js*: Runtime JavaScript untuk backend.
- *NestJS*: Framework backend dengan arsitektur modular.
- *PostgreSQL*: Database relasional untuk menyimpan data.
- *Socket.io*: Digunakan untuk komunikasi real-time.

## 🛠 Instalasi Proyek

### Prasyarat  
Pastikan telah menginstal:  
- [Node.js](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/)

### Langkah-langkah Instalasi 
1. Clone repository:
   bash
   git clone https://github.com/username/repo-name.git
   
2. Pindah ke direktori proyek:
   bash
   cd Lab-Backend
   
3. Install semua dependency:
   bash
   npm install
   
4. Salin file konfigurasi environment:
   bash
   cp .env.example .env
   
   Sesuaikan variabel di .env, misalnya:
   bash
   DATABASE_URL=postgres://user:password@localhost:5432/db_name
   JWT_SECRET=your_jwt_secret
   PORT=3000
   
5. Jalankan server:
   bash
   npm run start
   
6. Akses aplikasi di http://localhost:3000

## 📦 Instalasi Library Tambahan 
- *NestJS WebSocket dan Socket.io:*  
  bash
  npm install @nestjs/websockets @nestjs/platform-socket.io socket.io
  
- *Autentikasi JWT:*  
  bash
  npm install @nestjs/jwt passport-jwt
  
- *PostgreSQL dan TypeORM:*  
  bash
  npm install @nestjs/typeorm pg typeorm   
  
- *Swagger untuk Dokumentasi API:*  
  bash
  npm install @nestjs/swagger swagger-ui-express
  

## 📖 Cara Menjalankan Proyek
Swagger digunakan untuk mendokumentasikan dan menguji API.
Jalankan proyek dengan perintah:
bash
npm run start:dev

Akses Swagger di:
bash
http://localhost:3000/api-docs


## 📌 Kesimpulan
Latihan menggunakan NestJS memberikan pemahaman tentang struktur proyek modular, pemanfaatan dependency injection, serta pemisahan logika dalam Controller dan Service. Penggunaan DTO membantu dalam validasi data, sementara Prisma ORM mempermudah pengelolaan database. Implementasi WebSockets memungkinkan komunikasi real-time, dan fitur authentication dengan JWT meningkatkan keamanan aplikasi. Dengan middleware, guards, dan modularisasi, NestJS menjadi framework yang efisien, scalable, dan mudah dikelola untuk pengembangan backend.

## 💡 Support
Nest adalah proyek open-source berlisensi MIT. Untuk mendukung pengembangan lebih lanjut, silakan kunjungi [NestJS Support](https://docs.nestjs.com/support).

## 🌐 Stay in Touch
- *Website*: [nestjs.com](https://nestjs.com/)
- *Twitter*: [@nestframework](https://twitter.com/nestframework)
- *Author*: [Kamil Myśliwiec](https://twitter.com/kammysliwiec)

## 📜 License
Nest dilisensikan di bawah [MIT License](https://github.com/nestjs/nest/blob/master/LICENSE).

