# HireNest Deployment Guide

This document explains how to run, deploy, and maintain the HireNest project.

---

# Project Architecture

Frontend:
- React + Vite
- Hosted on Vercel

Backend:
- Node.js + Express
- Hosted on Render

Database:
- MongoDB Atlas

Email Service:
- Brevo Email API

Authentication:
- JWT + Email Verification

---

# Local Development Setup

## Clone the Repository

```bash
git clone <your-github-repository-url>
cd HireNest
```

---

## Install Backend Dependencies

```bash
cd backend
npm install
```

---

## Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

---

## Backend Environment Variables

Create a file:

backend/.env

Add:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
BREVO_API_KEY=your_brevo_api_key
FRONTEND_URL=http://localhost:5173
PORT=5000
```

---

## Frontend Environment Variables

Create a file:

frontend/.env

Add:

```env
VITE_API_URL=http://localhost:5000/api
```

---

## Run Backend

```bash
cd backend
npm start
```

Backend runs on:

```
http://localhost:5000
```

---

## Run Frontend

```bash
cd frontend
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

# Production Deployment

## Frontend Hosting

Platform:
- Vercel

Production URL:

```
https://hire-nest-grhm.vercel.app
```

---

## Backend Hosting

Platform:
- Render

Production API:

```
https://hirenest-sua2.onrender.com/api
```

---

## Database

Platform:
- MongoDB Atlas

The backend connects to MongoDB Atlas using:

```env
MONGO_URI
```

stored in Render Environment Variables.

---

## Email Service

Platform:
- Brevo Email API

Used for:

- Email Verification
- Forgot Password
- Password Reset

Authentication is done using:

```env
BREVO_API_KEY
```

stored in Render Environment Variables.

---

## Render Environment Variables

Configure these variables in Render.

```env
MONGO_URI=...
JWT_SECRET=...
BREVO_API_KEY=...
FRONTEND_URL=https://hire-nest-grhm.vercel.app
PORT=10000
```

---

## Vercel Environment Variables

Configure this variable in Vercel.

```env
VITE_API_URL=https://hirenest-sua2.onrender.com/api
```

---

## Deployment Flow

Frontend Changes

```
Git Push
      │
      ▼
 GitHub
      │
      ▼
 Vercel Auto Deploy
```

Backend Changes

```
Git Push
      │
      ▼
 GitHub
      │
      ▼
 Render Auto Deploy
```

---

# Troubleshooting & Common Issues

## 1. Verification Email Not Sending

### Problem

Registration worked but users did not receive a verification email.

### Cause

Initially, Gmail SMTP was used, which caused timeout errors on Render.

Example error:

```
Connection timeout
ETIMEDOUT
```

### Solution

Removed Nodemailer SMTP configuration and switched to the Brevo Email API.

---

## 2. SMTP Connection Timeout

### Problem

Render could not connect to:

```
smtp-relay.brevo.com
```

### Solution

Replaced SMTP completely with the Brevo REST API using:

```
BREVO_API_KEY
```

instead of SMTP credentials.

---

## 3. Verification Link Returned 404

### Problem

Clicking the email verification button showed:

```
404 NOT FOUND
```

### Cause

The frontend route and verification URL were mismatched.

Originally:

```
/verify-email/:token
```

Email contained:

```
/verify-email?token=...
```

### Solution

Changed React route to:

```
/verify-email
```

and used:

```javascript
useSearchParams()
```

instead of:

```javascript
useParams()
```

---

## 4. Frontend Could Not Reach Backend

### Problem

Verification page loaded but API requests failed.

### Cause

Incorrect Vercel Environment Variable.

### Correct Value

```
VITE_API_URL=https://hirenest-sua2.onrender.com/api
```

---

## 5. Brevo Sender Configuration

Verified sender:

```
arpitomre@gmail.com
```

Emails are sent using the Brevo API while the verified sender appears as:

```
HireNest
```

---

## 6. MongoDB Connection

The backend connects to MongoDB Atlas using:

```
MONGO_URI
```

stored in Render Environment Variables.

---

## 7. Deployment Checklist

Backend

- MongoDB Connected
- Render Environment Variables Added
- Brevo API Key Added
- Backend Deploy Successful

Frontend

- Vercel Environment Variables Added
- Production Build Successful
- API URL Configured
- Routing Working

Email

- Sender Verified
- Brevo API Working
- Verification Email Delivered
- Email Verification Working

Authentication

- Registration
- Email Verification
- Login
- Forgot Password
- Reset Password

---

# Future Improvements

- Resume Parser
- AI Resume Analysis
- AI Internship Recommendation
- Admin Analytics Dashboard
- Company Email Verification
- Notifications
- Dark Mode
- Unit Testing
- Docker Deployment
- CI/CD Pipeline using GitHub Actions
- Custom Domain
- HTTPS Monitoring