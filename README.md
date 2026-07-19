# 🚀 CivicConnect – Smart Complaint & Grievance Management Portal


A full-stack MERN application that enables citizens to report civic issues digitally. Users can securely register, log in, submit complaints, manage their profiles, and track complaint-related information through a modern web interface.

---

## 🌐 Live Demo

### Frontend
🔗 https://civic-connect-frontend-seven.vercel.app

### Backend API
🔗 https://civicconnect-backend-ogtt.onrender.com

---

## 📖 About The Project

CivicConnect is a Smart Complaint & Grievance Management Portal built using the MERN Stack. The project replaces traditional complaint registration methods with a secure online platform where users can submit and manage complaints from anywhere.

The application follows a clean client-server architecture with React + Vite for the frontend, Express.js & Node.js for the backend, and MongoDB Atlas for persistent data storage.

---

# ✨ Features

- 🔐 Secure User Registration & Login
- 🔑 JWT Authentication
- 👤 User Profile Management
- 📝 Submit Civic Complaints
- 📋 View Submitted Complaints
- 🔒 Protected API Routes
- 📁 File Upload Support (Multer)
- 🌐 REST API Architecture
- 📱 Responsive User Interface

---

# 🛠 Tech Stack

## Frontend

- React.js
- Vite
- React Router DOM
- Axios
- CSS

## Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- bcryptjs
- Multer
- CORS
- dotenv

---

# 📂 Project Structure

```
CivicConnect
│
├── frontend
│   ├── src
│   ├── public
│   ├── package.json
│   └── vite.config.js
│
├── backend
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── uploads
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

# ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/Akshitasri8299/CivicConnect.git
```

```bash
cd CivicConnect
```

---

### Install Dependencies

#### Backend

```bash
cd backend
npm install
```

#### Frontend

```bash
cd frontend
npm install
```

---

# ▶️ Run Locally

### Start Backend

```bash
cd backend
npm run dev
```

### Start Frontend

```bash
cd frontend
npm run dev
```

---

# 🔑 Environment Variables

Create a `.env` file inside the backend folder.

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLIENT_ORIGIN=http://localhost:5173
```

---

# 📡 API Routes

### Authentication

```
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
PUT  /api/auth/profile
```

### Complaints

```
GET    /api/complaints
POST   /api/complaints
PUT    /api/complaints/:id
DELETE /api/complaints/:id
```

### Users

```
GET /api/users
```

---

# 🚀 Deployment

| Service | Platform |
|----------|----------|
| Frontend | Vercel |
| Backend | Render |
| Database | MongoDB Atlas |

---

# 💻 Future Improvements

- Complaint Status Timeline
- Search & Filter Complaints
- Email Notifications
- Admin Dashboard Analytics
- Dark Mode
- Location-based Complaint Reporting

---

# 👩‍💻 Developer

**Akshita Srivastava**

B.Tech Computer Science Engineering

GitHub: https://github.com/Akshitasri8299

---

## ⭐ If you like this project

Please consider giving this repository a **Star ⭐**.