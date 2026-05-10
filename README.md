# 🚀 DevBytes Backend

<div align="center">

### 🧩 Microservices-Based Developer Community Platform

DevBytes is a modern developer community social media platform where developers can connect, chat in real-time, and build meaningful professional relationships.

Built with scalable backend architecture using Node.js, Express, MongoDB, JWT, and Socket.IO.

</div>

---

# ✨ Features

## 🔐 Authentication Service
- User Signup API
- User Login API
- JWT Authentication
- Protected Routes
- Password Encryption using bcrypt

---

## 👥 Connection Management Service
- Send Connection Request API
- Accept Connection Request API
- View All Connections API
- Explore New Developers API

---

## 👤 Profile Service
- Edit Profile API
- Update User Details API
- Change Password API

---

## 💬 Real-Time Chat Service
- Real-time Messaging
- Socket.IO Integration
- Instant Message Delivery
- Bidirectional Communication
- Live Chat Updates

---

# 🧩 Microservices Architecture

The backend follows a **microservices-inspired architecture** where different functionalities are divided into separate modules/services.

### Services Included:
- Authentication Service
- User Service
- Connection Service
- Chat Service

This architecture helps in:
- Scalability
- Better Code Organization
- Independent Feature Development
- Easier Maintenance
- Cleaner API Structure

---

# 🛠️ Tech Stack

| Technology | Purpose |
|------------|----------|
| Node.js | Runtime Environment |
| Express.js | Backend Framework |
| MongoDB | Database |
| Mongoose | ODM |
| JWT | Authentication |
| bcrypt | Password Hashing |
| Socket.IO | Real-Time Communication |

---

# 📂 Folder Structure

```bash
backend/
│
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── socket/
│   ├── utils/
│   └── app.js
│
├── package.json
└── README.md
```

---

# 🔥 API Endpoints

## 🔑 Authentication APIs

```http
POST /signup
POST /login
```

---

## 👥 Connection APIs

```http
POST /send-request/:id
POST /accept-request/:id
GET /connections
GET /explore
```

---

## 👤 Profile APIs

```http
PATCH /profile/edit
PATCH /profile/password
```

---

# 💬 Real-Time Chat System

One of the most challenging and exciting features of DevBytes was implementing the **real-time chat system** using Socket.IO.

### Features:
- Instant Messaging
- Live Message Updates
- Real-Time Communication
- Event-Based Socket Architecture

### Example Socket Events

```js
socket.on("sendMessage")
socket.emit("receiveMessage")
```

---

# 🔐 Authentication Flow

```text
User Login
    ↓
JWT Token Generated
    ↓
Protected Route Verification
    ↓
Access Granted
```

---

# 🧠 What I Learned

While building DevBytes backend, I learned:
- REST API Design
- JWT Authentication
- MongoDB Data Modeling
- Real-Time Communication with Socket.IO
- Middleware Handling
- Scalable Backend Architecture
- Microservices-Based Project Structure

---

# 🚀 Installation

## Clone Repository

```bash
git clone https://github.com/your-username/devbytes-backend.git
```

---

## Install Dependencies

```bash
npm install
```

---

## Create `.env` File

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
```

---

## Run Server

```bash
npm run dev
```

---

# ⭐ Support

If you like this project, give it a ⭐ on GitHub.

---

<div align="center">

Made with ❤️ using Node.js, Express, MongoDB & Socket.IO

</div>