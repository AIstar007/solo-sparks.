# 🌟 Solo Sparks – Personal Growth Quest System

A full-stack application that delivers personalized daily and weekly self-growth quests to users based on their mood and personality traits. Includes multimedia reflections, reward redemptions, and intelligent quest routing.

---

## ✨ Features

- 🔐 User authentication (JWT)
- 🧠 Mood & personality-based quest engine
- 📄/📸/🎙️ Multimedia reflections (text, image, audio)
- 💎 Spark Points tracking and rewards store
- 📤 Cloudinary file upload integration
- 🧾 Full REST API with protected routes

---

## 🚀 Tech Stack

| Layer       | Tech                        |
|-------------|-----------------------------|
| Frontend    | React, React Router, Axios  |
| Backend     | Node.js, Express.js         |
| Database    | MongoDB Atlas (NoSQL)       |
| Auth        | JWT                         |
| File Upload | Cloudinary + Multer         |
| Hosting     | Vercel (frontend), Render (backend) |

---

## 📂 Folder Structure

```
solo-sparks/
├── client/             # React frontend
│   └── src/pages       # Login, Dashboard, Reflection, Rewards
├── server/             # Express backend
│   └── routes/         # auth, users, quests, reflections, upload
│   └── models/         # User.js
│   └── middleware/     # authMiddleware.js
```

---

## 🔑 Environment Variables

Create a `.env` file inside the `server/` folder:

```env
MONGO_URI=<Your MongoDB URI>
JWT_SECRET=<Your secure JWT secret>
CLOUDINARY_CLOUD_NAME=<Your Cloudinary cloud name>
CLOUDINARY_API_KEY=<Cloudinary API key>
CLOUDINARY_SECRET=<Cloudinary secret>
```

---

## 🛠️ Local Development Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-username/solo-sparks.git
cd solo-sparks
```

### 2. Install server dependencies

```bash
cd server
npm install
```

### 3. Install client dependencies

```bash
cd ../client
npm install
```

### 4. Start development

#### Start backend:

```bash
cd server
npm run dev
```

#### Start frontend:

```bash
cd client
npm start
```

---

## 📘 API Endpoints Summary

| Method | Endpoint                      | Description                          |
|--------|-------------------------------|--------------------------------------|
| POST   | `/api/auth/register`          | Register new user                    |
| POST   | `/api/auth/login`             | Login and get JWT                    |
| GET    | `/api/users/me`               | Get logged-in user's data            |
| PATCH  | `/api/users/profile`          | Update mood/traits                   |
| PATCH  | `/api/users/points/add`       | Add Spark Points                     |
| PATCH  | `/api/users/points/redeem`    | Redeem rewards                       |
| GET    | `/api/quests/user`            | Get personalized quests              |
| POST   | `/api/reflections`            | Submit reflection                    |
| GET    | `/api/reflections`            | Get past reflections                 |
| POST   | `/api/upload/file`            | Upload photo/audio to Cloudinary     |

---

## 🖼️ Screenshots

> Add screenshots of:
> - Login Page
> - Dashboard
> - Reflection Submission
> - Rewards Page

---

## 🧪 Deployment

### 🔹 Frontend (Vercel)

1. Push `client/` to GitHub
2. Go to https://vercel.com
3. Import repo → set root directory to `client`
4. Build command:
   ```bash
   npm run build
   ```

### 🔸 Backend (Render)

1. Push `server/` to GitHub
2. Go to https://render.com
3. Create new Web Service
4. Build command:
   ```bash
   npm install
   ```
5. Start command:
   ```bash
   node index.js
   ```
6. Add environment variables from `.env`

---

## 👨‍💻 Author

**Your Name**  
Full Stack Internship Assignment – 2025  
[GitHub Profile](https://github.com/your-username)

---

## 📜 License

This project is part of a private internship assignment and is for demonstration purposes only.
