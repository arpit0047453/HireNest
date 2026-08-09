# 🚀 HireNest – MERN Internship Management Portal

> A full-stack MERN web application for discovering internships, applying online, managing student profiles and resumes, and handling recruitment workflows through a dedicated admin dashboard.

---

## 🌐 Live Project

### 🚀 Live Website

https://hire-nest-grhm.vercel.app

### 💻 GitHub Repository

https://github.com/arpitomre18/HireNest

### ⚙️ Backend API

https://hirenest-sua2.onrender.com

**API Base Path:**

`https://hirenest-sua2.onrender.com/api`

---

## 📖 Overview

HireNest is a full-stack Internship Management Portal built using the **MERN stack**.

The platform provides separate workflows for **students** and **administrators**, covering internship discovery, applications, resume management, application tracking, internship management, and recruitment administration.

### 👨‍🎓 Students can:

- Create an account
- Verify their email address
- Log in securely
- Manage their profile
- Upload and manage resumes
- Browse internship opportunities
- Search internships, companies, and roles
- View internship details
- Apply for internships
- Prevent duplicate applications
- Track application status
- Withdraw pending applications
- Reset forgotten passwords
- Receive application-related notifications

### 👨‍💼 Administrators can:

- Access the admin dashboard
- Manage internship/company listings
- Create internship listings
- Update internship information
- Delete internship listings
- View student applications
- Search candidates
- View uploaded resumes
- Update application status
- Monitor recruitment statistics

---

## ✨ Key Features

### 👨‍🎓 Student Module

- 🔐 Secure registration and login
- 📧 Email verification
- 🔑 Forgot password and password reset
- 🛡️ Strong password validation
- 👤 Student profile management
- 📄 Resume upload
- 🏢 Browse internship opportunities
- 🔍 Search internships, companies, and roles
- 📋 View internship details
- 🚀 Apply for internships
- 🚫 Duplicate application prevention
- 📊 Student dashboard
- 📌 Track application status
- ↩️ Withdraw pending applications
- 🔔 Toast notifications
- 📱 Responsive user interface

### 👨‍💼 Admin Module

- 🔐 Admin authentication
- 📈 Admin dashboard
- 📊 Application statistics
- 🏢 Internship/company management
- ➕ Add internship listings
- ✏️ Update internship details
- ❌ Delete internship listings
- 📋 Manage student applications
- 🔍 Search candidates
- 📄 View uploaded resumes
- ✅ Update application status

### 📌 Application Statuses

- 🟡 Pending
- 🟣 Shortlisted
- 🟢 Selected
- 🔴 Rejected

---

## 🔐 Authentication & Security

HireNest implements authentication and account-management functionality including:

- JWT-based authentication
- Password hashing using bcrypt
- Protected frontend routes
- Protected backend endpoints
- Email verification
- Secure password reset tokens
- Password reset token expiration
- Strong password validation
- Role-based access control for administrative functionality

### 🔑 Password Requirements

Passwords must contain:

- At least 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number
- At least one special character

---

## 🛠️ Tech Stack

### Frontend

- React.js
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- React Toastify
- Chart.js
- react-chartjs-2

### Backend

- Node.js
- Express.js

### Database

- MongoDB
- Mongoose
- MongoDB Atlas

### Authentication

- JWT
- bcryptjs

### File Upload

- Multer

### Email

- SMTP

### Deployment

- Vercel – Frontend
- Render – Backend
- MongoDB Atlas – Database

---

## 🏗️ Application Architecture

```text
                         ┌──────────────────────┐
                         │       Users          │
                         │   Student / Admin    │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │    React + Vite      │
                         │      Frontend        │
                         └──────────┬───────────┘
                                    │
                              Axios / HTTP
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │     Express.js       │
                         │        API           │
                         └──────────┬───────────┘
                                    │
                 ┌──────────────────┼──────────────────┐
                 │                  │                  │
                 ▼                  ▼                  ▼
          ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
          │  MongoDB    │    │ JWT / Auth  │    │ File Upload │
          │    Atlas    │    │ Middleware  │    │  / Email    │
          └─────────────┘    └─────────────┘    └─────────────┘