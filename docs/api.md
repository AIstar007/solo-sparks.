# Solo Sparks API Documentation

## 🧾 Authentication

### POST `/api/auth/register`
- Registers a new user.
- Body: `{ name, email, password }`

### POST `/api/auth/login`
- Logs in and returns token.
- Body: `{ email, password }`

---

## 👤 User Profile

### GET `/api/users/me`
- Requires Bearer Token
- Returns user profile info.

### PATCH `/api/users/profile`
- Updates mood and traits.
- Body: `{ mood, traits: [] }`

### PATCH `/api/users/points/add`
- Add points.
- Body: `{ points: Number }`

### PATCH `/api/users/points/redeem`
- Redeem points.
- Body: `{ cost: Number }`

---

## 🧠 Quest

### GET `/api/quests/user`
- Returns recommended quests based on mood/traits.

---

## 🎤 Reflections

### POST `/api/reflections`
- Submit a reflection.
- Body: `{ questTitle, type, content }`

### GET `/api/reflections`
- Get user's past reflections.

---

## ☁️ File Upload (Cloudinary)

### POST `/api/upload/file`
- Accepts `multipart/form-data` with `file`.
- Returns: `{ url }`
