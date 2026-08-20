# 🤖 JobTrack AI — AI-Powered Job Application Tracker

![Next.js](https://img.shields.io/badge/Next.js-16.3.1-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4-06B6D4?style=for-the-badge&logo=tailwindcss)
![Prisma](https://img.shields.io/badge/Prisma-7-2D3748?style=for-the-badge&logo=prisma)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-blue?style=for-the-badge&logo=postgresql)
![Google Gemini](https://img.shields.io/badge/Google%20Gemini%20AI-4285F4?style=for-the-badge&logo=google)
[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20App-brightgreen?style=for-the-badge&logo=vercel)](https://ai-job-tracker-green-seven.vercel.app)

---

## 🌐 Live Demo
👉 **[https://ai-job-tracker-green-seven.vercel.app](https://ai-job-tracker-green-seven.vercel.app)**

---

## 📌 Project Overview

**JobTrack AI** is a full-stack, AI-powered job application tracking platform built with **Next.js 16**, **React 19**, and **Google Gemini AI**. It helps job seekers manage their entire application pipeline — from tracking application statuses to leveraging AI for job description analysis, resume matching, and cover letter generation.

---

## ✨ Features

### 📋 Application Management
- Add, edit, and delete job applications
- Track company, role, location, salary, job URL, and application date
- Update application status (Applied, Interview, Offer, Rejected, etc.)
- Add personal notes per application

### 🤖 AI-Powered Tools
- **Job Description Analyzer** — Paste a JD and get key skills, requirements, and insights extracted instantly
- **Resume Match** — AI compares your resume against a job description and gives a match score with improvement tips
- **AI Tools Dashboard** — Centralized hub for all AI features

### 📊 Analytics Dashboard
- Visual overview of your application pipeline
- Track success rates, active applications, and application trends

### 🔐 Authentication
- Secure login via **NextAuth v5**
- Per-user data isolation — each user sees only their own applications

### 🗄️ Database
- **PostgreSQL** with **Prisma ORM**
- Hosted on **Neon** (serverless PostgreSQL)

---

## 🗂️ Project Structure

```
ai-job-tracker/
│
├── app/
│   ├── api/
│   │   ├── analyze-job/        # AI job description analysis endpoint
│   │   ├── resume-match/       # AI resume matching endpoint
│   │   └── auth/               # NextAuth authentication routes
│   │
│   └── dashboard/
│       ├── applications/       # Job applications CRUD
│       ├── jobs/               # Jobs listing
│       ├── analytics/          # Analytics & charts
│       ├── ai-tools/           # AI features hub
│       ├── resume/             # Resume management
│       └── settings/           # User settings
│
├── lib/                        # Utility & helper functions
├── prisma/
│   ├── schema.prisma           # Database schema
│   └── migrations/             # Database migrations
├── public/                     # Static assets
├── auth.ts                     # NextAuth configuration
├── next.config.ts              # Next.js configuration
└── package.json
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | Next.js 16, React 19, TypeScript, Tailwind CSS 4 |
| **Backend** | Next.js API Routes (App Router) |
| **Database** | PostgreSQL + Prisma ORM (hosted on Neon) |
| **AI** | Google Gemini AI (`@google/genai`) |
| **Auth** | NextAuth v5 (Beta) |
| **Deployment** | Vercel |

---

## 🗃️ Database Schema

### User
| Field | Type | Description |
|---|---|---|
| `id` | String (cuid) | Unique identifier |
| `name` | String | User's name |
| `email` | String (unique) | User's email |
| `createdAt` | DateTime | Account creation date |

### Application
| Field | Type | Description |
|---|---|---|
| `id` | String (cuid) | Unique identifier |
| `company` | String | Company name |
| `role` | String | Job title/role |
| `location` | String | Job location |
| `jobUrl` | String | Link to the job posting |
| `salary` | String | Salary range |
| `status` | String | Application status |
| `applicationDate` | DateTime | Date applied |
| `notes` | String | Personal notes |
| `userId` | String | FK → User |

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js 18+
- PostgreSQL database (or Neon free tier)
- Google Gemini API key

### Installation

```bash
# Clone the repository
git clone https://github.com/Navyavarri10/ai-job-tracker.git
cd ai-job-tracker

# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL="postgresql://user:password@host/dbname?sslmode=require"
NEXTAUTH_SECRET="your-nextauth-secret"
NEXTAUTH_URL="http://localhost:3000"
GEMINI_API_KEY="your-gemini-api-key"
```

### Database Setup & Run

```bash
# Push schema to database
npx prisma db push

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

---

## 🚢 Deployment

Deployed on **Vercel** with **Neon** PostgreSQL database.

👉 **Live:** [https://ai-job-tracker-green-seven.vercel.app](https://ai-job-tracker-green-seven.vercel.app)

---

## 👩‍💻 Author

**Navyavarri10**
[GitHub Profile](https://github.com/Navyavarri10)
