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
# Diagram Router 


```mermaid
---
title: Get User
---
stateDiagram-v2
    Input : String uuid
    result : {\nmsg sebagai objek dari User,\n code = 200,\n status = true\n}
    resultFailed : {\nmsg as string, \n status = false\n}

    [*] --> Input 
    Input --> success 
    success --> result
    Input --> failed
    failed --> resultFailed 
```

```mermaid
---
title: searchUser
---
stateDiagram-v2
    cookie : Cookie(token)
    result : {\nmsg sebagai objek dari User,\n code = 200,\n status = true\n}
    resultFailed : {\nmsg as string, \n status = false\n}
    find : Mencari User melalui uuid dari\ntoken yang sudah didecoding
    [*] --> cookie
    cookie --> auth()
    auth() --> failed
    auth() --> success
    success --> find
    find --> failed
    find --> successFind
    successFind --> result
    failed --> resultFailed 
```

```mermaid
---
title: Login
---
stateDiagram-v2
    input : input(object(username as string, password as string))
    setToken : nge set cookie[token]
    result : {\nmsg sebagai objek dari Token,\n status = true\n}
    resultFailed : {\nmsg as string,\n status = false\n}
    [*] --> input
    input --> login()
    login() --> failedLogin
    failedLogin --> resultFailed
    login() --> successLogin
    successLogin --> setToken
    setToken --> result
    
```
```mermaid
---
title: createUser
---
stateDiagram-v2
    input : input(object(username as string, password as string))
    result : {\nmsg sebagai objek dari User,\n status = true\n}
    resultFailed : {\nmsg as string, \ncode => 400,\n status = false\n}
    [*] --> input
    input --> createUser()
    createUser() --> failed
    failed --> resultFailed
    createUser() --> success
    success --> result
    
```
```mermaid
---
title: auth
---
stateDiagram-v2
    cookie : Cookie[token]
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
title: getAllUser
---
stateDiagram-v2
    cookie : cookie[token]
    result : {\nmsg sebagai array objek dari User,\n status = true\n}
    resultFailed : {\nmsg as string, \n status = false\n}
    getAllUser : parameter(string uuid),\n mendapatkan semua user milik orang lain,\n kecuali user sendiri

    [*] --> cookie 
    cookie --> auth()
    auth() --> failed : unauthorized
    auth() --> successAuth : authorized
    successAuth --> getAllUser
    getAllUser --> success
    getAllUser --> failed : serverError
    success --> result
    failed --> resultFailed 
```

```mermaid
---
title: getAllChat
---
stateDiagram-v2
    cookie : cookie[token]
    result : {\nmsg sebagai array objek dari Chat,\n status = true\n}
    resultFailed : {\nmsg as string, \n status = false\n}
    getAllChat : parameter(uuid2 as string),\n mendapatkan chat dari user ini \n dengan user orang lain dari uuidnya

    [*] --> cookie 
    cookie --> auth()
    auth() --> failed : unauthorized
    auth() --> successAuth : authorized
    successAuth --> getAllChat
    getAllChat --> success
    getAllChat --> failed : serverError
    success --> result
    failed --> resultFailed 
```
```mermaid
---
title: SendChat
---
stateDiagram-v2
    cookie : cookie[token]
    result : {\nmsg as string,\n status = true\n}
    resultFailed : {\nmsg as string, \n status = false\n}
    sendChat : parameter(object(uuid2 as string, text as string)),\n mengirimkan chat dari user ini \n ke user orang lain dari uuidnya

    [*] --> cookie 
    cookie --> auth()
    auth() --> failed : unauthorized
    auth() --> successAuth : authorized
    successAuth --> sendChat
    sendChat --> success
    sendChat --> failed : serverError
    success --> result
    failed --> resultFailed 
```

```mermaid
---
title: deleteChat
---
stateDiagram-v2
    cookie : cookie[token]
    result : {\nmsg as string,\n status = true\n}
    resultFailed : {\nmsg as string, \n status = false\n}
    deleteChat : parameter(object(uuid2 as string, id as number)),\n menghapus chat melalui id chat dari user ini \n ke user orang lain dari uuidnya

    [*] --> cookie 
    cookie --> auth()
    auth() --> failed : unauthorized
    auth() --> successAuth : authorized
    successAuth --> deleteChat
    deleteChat --> success
    deleteChat --> failed : serverError
    success --> result
    failed --> resultFailed 
```

```mermaid
---
title: deleteChat
---
stateDiagram-v2
    cookie : cookie[token]
    result : {\nmsg as string,\n status = true\n}
    resultFailed : {\nmsg as string, \n status = false\n}
    deleteChat : parameter(object(uuid2 as string, id as number)),\n menghapus chat melalui id chat dari user ini \n ke user orang lain dari uuidnya

    [*] --> cookie 
    cookie --> auth()
    auth() --> failed : unauthorized
    auth() --> successAuth : authorized
    successAuth --> deleteChat
    deleteChat --> success
    deleteChat --> failed : serverError
    success --> result
    failed --> resultFailed 

```

```mermaid
---
title: logout
---
stateDiagram-v2
  [*] --> menghapusToken()
  menghapusToken() --> [*]
```

```mermaid
---
title: deleteAccount
---
stateDiagram-v2
    cookie : cookie[token]
    result : {\nmsg as string,\n status = true\n}
    resultFailed : {\nmsg as string, \n status = false\n}
    hapusAkun : parameter(uuid as string),\n menghapus chat melalui id chat dari user ini \n ke user orang lain dari uuidnya
    hapusToken : hapus token
    [*] --> cookie 
    cookie --> auth()
    auth() --> failed : unauthorized
    auth() --> successAuth : authorized
    successAuth --> hapusToken
    hapusToken --> hapusAkun
    successAuth --> hapusAkun
    hapusAkun --> success
    hapusAkun --> failed : serverError
    success --> result
    failed --> resultFailed 

```

# Diagram Schema

```mermaid
---
title: Chat App DB Schema
---
classDiagram
  class User {
    +string uuid
    +string username 
    +string password
    +getUserfromuid(string uuid) 
    +createUsername(object(username:string, password:string))
    +getAllUser(uuid:string)
    +searchUser(uuid:string,search:string)
    +login(object(username:string, password:string))
    +hapusAkun(uuid:string)

  }
  class Chat {
    String from 
    String to     
    String? text 
    String? image  
    DateTime date  
    +getChat(object(uuid1:string,uuid2:string))
    +createChat(object(uuid1:string,uuid2:string, +text:string))
    +deletePesan(id:number, who : string)
    +kirimGambar(imageName:string, imageBuffer:string, from:string, to : string, text : string)
  }

  User <--> Chat
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

## 🛠️ Instalasi Proyek

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
