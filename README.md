Ini adalah aplikasi chat yang menggunakan tRPC

# Install Git

Download dan install git untuk yang belum install [Link Git](https://git-scm.com/downloads)

Kemudian configurasi username dan email git anda dengan cara berikut 

```
git config --global user.name = [username github]
git config --global user.email = [email github]     
```



# Cloning Repo

Untuk mengcloning repo ini, anda harus masuk ke command prompt/terminal, lalu ketik 
```
git clone https://github.com/Frasydi/chat-App-With-tRPC
```

Jika sudah selesai, masuk ke foldernya dengan mengetik di terminal 
```
cd chat-App-With-tRPC
```

# Install Module dan konfigurasi database
Untuk menginstall module, kalian cukup mengetik
```
yarn install
```

Dan untuk menginisialisasi database
```
yarn database
```

# Jalankan aplikasi
cukup ketikkan
```
yarn build
yarn start
```

# Menggunakan database lain

Jika ingin menggunakan database yang lain, masuk ke folder backend, lalu ikuti langkah-langkah berikut
>Untuk masuk ke folder backend ketik perintah '`cd packages/backend`'

1. Rubah nilai dari DATABASE_URL di file .env


.env
```env

DATABASE_URL = [url dari database]

```

2. Kemudian masuk ke folder prisma, lalu buka file `schema.prisma`

```prisma

datasource db {
  provider = "tipe dari databasemu(seperti postgre, mariadb, sqlite,atau mysql)"
  url      = env("DATABASE_URL")
}

```

3. setelah itu ketik perintah berikut 
```terminal
npx prisma generate
```

# Menambah Router
untuk menambah router pada backend, cukup masuk ke folder backend, lalu ikuti langkah-langkah berikut

1. buka trRouter.ts

trRouter.ts

```typescript
const tRouter =  t.router({
    //...router
})
```
masukkan router anda ke dalam data json dari t.router()

contoh

trRouter.ts

```typescript
const tRouter = t.router({
    namaRouter : t.procedure.
    input(z.string()).
    query() // atau t.procedure.input().mutation() untuk input data ke database
})
```
>z.string() maksudnya bahwa inputan yang dibolehkan hanyalah string. Anda dapat menggunakan z.object({tes:z.string()}) untuk hanya membolehkan object dengan property tes supaya bisa diinput, baca dokumentasi z.string di [sini](https://zod.dev/?id=introduction)

>query berarti menampilkan data, mutation berarti memasukkan data, 
untuk lebih jelasnya kalian bisa baca dokumentasinya di [sini](https://trpc.io/docs/quickstart)

# Menggunakan backend ini di frontend

Untuk menggunakan backend ini di aplikasi Anda. Pertama-tama buatlah sebuah folder(terserah namanya apa) lalu ikuti langkah-langkah berikut

1. Inisialisasi NPM dengan command
```
npm init -y
```

2. ketik perintah berikut di terminal
```
npm install @trpc/client ts-node
```
3. Buat file index.ts, lalu ketik kode berikut

```typescript
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';


const trpc = createTRPCProxyClient<any>({
  links: [
    httpBatchLink({
      url: 'http://localhost:8000/trpc',
    }),
  ],
});
```
masuk ke package json lalu rubah isi dari propery script menjadi berikut 

```json
"scripts": {
    "start": "ts-node index",
  },
```

4. setelah itu inisialisasi typescript menggunakan command 
```
tsc init
```

5. Masuk lagi ke index.ts dan masukkan kode berikut

```typescript 
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';


const trpc = createTRPCProxyClient<any>({
  links: [
    httpBatchLink({
      url: 'http://localhost:8000/trpc',
    }),
  ],
});

trpc.namadarirouterkalian.query()

```

>Router yang saya buat, hampir semuanya memerlukan cookie. Jadi alangkah baiknya jika kalian membuat aplikasi web untuk menggunakan backend ini

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