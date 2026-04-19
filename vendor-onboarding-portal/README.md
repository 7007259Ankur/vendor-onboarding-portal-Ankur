# Vendor Onboarding Portal

[![Python 3.8+](https://img.shields.io/badge/python-3.8+-blue.svg)](https://www.python.org/)
[![Node.js 16+](https://img.shields.io/badge/node-16+-green.svg)](https://nodejs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.95+-darkgreen.svg)](https://fastapi.tiangolo.com/)
[![React 18+](https://img.shields.io/badge/React-18+-61DAFB.svg?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6.svg?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-4+-646CFF.svg?logo=vite)](https://vitejs.dev/)

A modern, full-stack vendor onboarding system with real-time filtering, form validation, and interactive 3D visuals. Built with FastAPI for a robust REST API and React + TypeScript for a responsive, accessible frontend.

## 📋 Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running Locally](#running-locally)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Development](#development)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

The Vendor Onboarding Portal streamlines the vendor registration and approval workflow. It provides a complete solution for:

- **Vendor Registration** — capture vendor details through an intuitive form
- **Real-time Filtering** — dynamically filter vendors by category
- **Approval Workflow** — manage vendor approval status with a single action
- **Data Validation** — client-side and server-side validation for data integrity
- **Visual Excellence** — immersive 3D animations and glassmorphism UI design

This is a full-stack application built for production readiness with a 30-minute turnaround during the initial sprint.

---

## 🏗️ Architecture

### Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| **Backend** | FastAPI | 0.95+ |
| **Backend Runtime** | Python | 3.8+ |
| **Frontend** | React | 18+ |
| **Frontend Language** | TypeScript | 5.0+ |
| **Build Tool** | Vite | 4+ |
| **State Management** | React Hooks | — |
| **Data Fetching** | Axios | Latest |
| **Animations** | GSAP | Latest |
| **3D Graphics** | Three.js | r128+ |
| **Styling** | Tailwind CSS | 3+ |

### System Diagram

```
┌─────────────────────────────────────────────────────────┐
│                    Client Browser                        │
│  ┌──────────────────────────────────────────────────┐   │
│  │  React + TypeScript (Vite)                       │   │
│  │  ├─ Form Component (validation)                  │   │
│  │  ├─ Vendor Table (real-time updates)            │   │
│  │  ├─ Category Filter Chips                        │   │
│  │  ├─ Three.js Canvas (background)                │   │
│  │  └─ GSAP Animations (entrance, interactions)    │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
                            ↕ (HTTP/REST)
┌─────────────────────────────────────────────────────────┐
│                   FastAPI Backend                        │
│  ┌──────────────────────────────────────────────────┐   │
│  │  POST   /vendors               (create vendor)   │   │
│  │  GET    /vendors               (list vendors)    │   │
│  │  PATCH  /vendors/{id}/approve  (approve vendor)  │   │
│  └──────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────┐   │
│  │  In-Memory Storage                               │   │
│  │  └─ vendors: List[Vendor]                        │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

### Data Model

```typescript
// Vendor Type
interface Vendor {
  id: string;              // UUID
  name: string;            // Vendor name
  category: string;        // One of: "Staffing Agency", "Freelance Platform", "Consultant"
  contact_email: string;   // Valid email address
  status: string;          // "Pending Approval" or "Approved"
  created_at?: string;     // ISO 8601 timestamp
}
```

---

## ✨ Features

### Core Features

✅ **Vendor Registration**
- Form with validation for name, category, and email
- Real-time error messages for invalid input
- Automatic list refresh after successful registration

✅ **Vendor Management**
- View all registered vendors in a responsive table
- Display key vendor information (name, category, email, status)
- One-click approval workflow

✅ **Category Filtering**
- Filter vendors by category: Staffing Agency, Freelance Platform, Consultant
- "All" filter chip to reset filtering
- Active filter state styling (indigo accent)

✅ **Status Management**
- Two vendor statuses: "Pending Approval" (yellow) and "Approved" (green)
- Approve button only visible for pending vendors
- Disabled button state for already-approved vendors

✅ **Data Validation**
- Client-side form validation (empty field checks, email format validation)
- Server-side validation for all endpoints
- Clear, user-friendly error messages

### Visual Features

✨ **3D Background Animation**
- Full-screen Three.js canvas with particle field
- Animated wireframe torus knot and icosahedron
- Mouse-driven parallax camera movement

✨ **GSAP Animations**
- Title and form entrance animations
- Table row stagger-fade effects
- Button spring-pop interactions on submit
- Smooth vendor list updates

✨ **Glassmorphism Design**
- Dark indigo gradient background
- Frosted glass card effects
- Gradient text title
- Styled status badges and filter chips

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Python 3.8+** ([Download](https://www.python.org/downloads/))
- **Node.js 16+** ([Download](https://nodejs.org/))
- **npm 8+** (comes with Node.js)
- **Git** ([Download](https://git-scm.com/))

### Verify Installations

```bash
python --version    # Should be 3.8 or higher
node --version      # Should be 16 or higher
npm --version       # Should be 8 or higher
```

---

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/vendor-onboarding-portal.git
cd vendor-onboarding-portal
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create Python virtual environment
python -m venv .venv

# Activate virtual environment
# On Windows:
.venv\Scripts\activate
# On macOS/Linux:
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install
```

---

## 🏃 Running Locally

### Start Backend (Terminal 1)

```bash
cd backend
.venv\Scripts\activate  # (or: source .venv/bin/activate on macOS/Linux)
uvicorn main:app --reload --port 8000
```

**Expected output:**
```
INFO:     Uvicorn running on http://127.0.0.1:8000
INFO:     Application startup complete
```

### Start Frontend (Terminal 2)

```bash
cd frontend
npm run dev
```

**Expected output:**
```
VITE v4.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
```

### Verify Everything is Running

1. Open **http://localhost:8000/docs** — FastAPI Swagger UI (interactive API explorer)
2. Open **http://localhost:5173** — React frontend
3. Register a vendor via the form and confirm it appears in the table

---

## 📚 API Documentation

### Interactive API Explorer

FastAPI automatically generates interactive API documentation:

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

### Endpoints

#### 1. Create Vendor

**Request:**
```http
POST /vendors HTTP/1.1
Content-Type: application/json

{
  "name": "TechStaff Solutions",
  "category": "Staffing Agency",
  "contact_email": "contact@techstaff.com"
}
```

**Response (201 Created):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "TechStaff Solutions",
  "category": "Staffing Agency",
  "contact_email": "contact@techstaff.com",
  "status": "Pending Approval",
  "created_at": "2024-04-19T10:30:00Z"
}
```

#### 2. List Vendors

**Request:**
```http
GET /vendors HTTP/1.1
```

**Response (200 OK):**
```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "TechStaff Solutions",
    "category": "Staffing Agency",
    "contact_email": "contact@techstaff.com",
    "status": "Pending Approval",
    "created_at": "2024-04-19T10:30:00Z"
  },
  {
    "id": "550e8400-e29b-41d4-a716-446655440001",
    "name": "FreelanceHub",
    "category": "Freelance Platform",
    "contact_email": "info@freelancehub.com",
    "status": "Approved",
    "created_at": "2024-04-18T15:20:00Z"
  }
]
```

#### 3. Approve Vendor

**Request:**
```http
PATCH /vendors/{vendor_id}/approve HTTP/1.1
```

**Response (200 OK):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "TechStaff Solutions",
  "category": "Staffing Agency",
  "contact_email": "contact@techstaff.com",
  "status": "Approved",
  "created_at": "2024-04-19T10:30:00Z"
}
```

### Error Responses

**400 Bad Request** — Invalid input (missing fields, invalid email)
```json
{
  "detail": "Invalid email format"
}
```

**404 Not Found** — Vendor ID does not exist
```json
{
  "detail": "Vendor not found"
}
```

---

## 🧪 Testing

### Method 1: Swagger UI (Interactive)

**Recommended for first-time testing.** No code required.

1. Start the backend: `uvicorn main:app --reload --port 8000`
2. Open http://localhost:8000/docs
3. Click **POST /vendors** → **Try it out** → paste example JSON → **Execute**
4. Click **GET /vendors** → **Execute** to confirm vendor was created
5. Copy the vendor `id` and click **PATCH /vendors/{vendor_id}/approve** → paste `id` → **Execute**

### Method 2: Automated Tests (pytest)

**Recommended for CI/CD and regression testing.**

```bash
cd backend
pip install -r requirements.txt
python -m pytest tests -v
```

**Sample output:**
```
tests/test_api.py::test_create_vendor PASSED
tests/test_api.py::test_list_vendors PASSED
tests/test_api.py::test_approve_vendor PASSED
tests/test_api.py::test_vendor_not_found PASSED
=============================== 4 passed in 0.12s ===============================
```

### Method 3: Manual Testing with cURL

```bash
# Create vendor
curl -X POST http://localhost:8000/vendors \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Vendor","category":"Staffing Agency","contact_email":"test@example.com"}'

# List vendors
curl http://localhost:8000/vendors

# Approve vendor (replace {id} with actual vendor ID)
curl -X PATCH http://localhost:8000/vendors/{id}/approve
```

### Method 4: Frontend UI Testing

With both backend and frontend running:

1. Navigate to http://localhost:5173
2. Fill in the "Register New Vendor" form with valid data
3. Click "Register Vendor" and confirm it appears in the table
4. Click the "Approve" button on a pending vendor
5. Verify status changes to "Approved" and button disappears
6. Test category filters

---

## 📁 Project Structure

```
vendor-onboarding-portal/
├── backend/
│   ├── main.py                 # FastAPI app, endpoints, in-memory storage
│   ├── requirements.txt        # Python dependencies
│   ├── tests/
│   │   └── test_api.py        # Pytest test suite
│   └── .venv/                 # Virtual environment (not in git)
│
├── frontend/
│   ├── src/
│   │   ├── main.tsx           # React entry point
│   │   ├── App.tsx            # Main app component (form, table, filters)
│   │   ├── components/
│   │   │   ├── VendorForm.tsx # Registration form with validation
│   │   │   ├── VendorTable.tsx # Vendor list table with actions
│   │   │   ├── FilterChips.tsx # Category filter UI
│   │   │   └── ThreeBackground.tsx # 3D canvas with GSAP animations
│   │   ├── types/
│   │   │   └── index.ts       # TypeScript interfaces (Vendor, etc.)
│   │   ├── App.css            # Tailwind CSS styles (emptied per spec)
│   │   └── index.css          # Global styles (emptied per spec)
│   ├── package.json           # Node.js dependencies
│   ├── vite.config.ts         # Vite configuration
│   └── tsconfig.json          # TypeScript configuration
│
├── README.md                   # This file
├── .gitignore                 # Git ignore rules
└── LICENSE                    # MIT License
```

---

## ⚙️ Configuration

### Backend Configuration

**CORS (Cross-Origin Resource Sharing)**

By default, the backend allows requests from `http://localhost:5173` (the Vite dev server). To adjust:

Edit `backend/main.py`:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Update as needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### Frontend Configuration

**API Base URL**

The frontend expects the API at `http://localhost:8000`. To change:

Edit `frontend/src/App.tsx` or create an `.env` file:

```env
VITE_API_URL=http://localhost:8000
```

---

## 👨‍💻 Development

### Code Style

- **Python**: Follow PEP 8 (enforced by `black` and `flake8`)
- **TypeScript/React**: Use ESLint and Prettier configurations from `package.json`

### Adding Features

#### Add a New API Endpoint

1. Edit `backend/main.py`
2. Define request/response models using Pydantic
3. Add the endpoint function with proper error handling
4. Test in Swagger UI first
5. Add pytest tests in `backend/tests/test_api.py`

#### Add a New React Component

1. Create component file in `frontend/src/components/`
2. Use TypeScript and React Hooks
3. Import styles from Tailwind CSS classes
4. Add types in `frontend/src/types/index.ts`
5. Test in the browser dev tools

### Debugging

**Backend:**
```bash
# Run with debug output
uvicorn main:app --reload --port 8000 --log-level debug
```

**Frontend:**
- Open browser DevTools (F12) → Console tab
- Check Network tab to inspect API requests

---

## 🚀 Deployment

### Backend Deployment (FastAPI)

#### Using Uvicorn + Gunicorn (Production)

```bash
# Install production server
pip install gunicorn

# Run with Gunicorn
gunicorn -w 4 -k uvicorn.workers.UvicornWorker main:app --bind 0.0.0.0:8000
```

#### Using Docker

Create `backend/Dockerfile`:

```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

Build and run:

```bash
docker build -t vendor-api .
docker run -p 8000:8000 vendor-api
```

#### Using Cloud Platforms

- **Heroku**: Use `Procfile` with `web: gunicorn -w 4 -k uvicorn.workers.UvicornWorker main:app`
- **AWS Lambda**: Use serverless framework with FastAPI adapter
- **Google Cloud Run**: Container deployment (Docker recommended)
- **Railway/Render**: Connect git repo, auto-deploys on push

### Frontend Deployment (React + Vite)

#### Build for Production

```bash
cd frontend
npm run build
```

Output is in `frontend/dist/` — ready to serve as static files.

#### Using Cloud Platforms

- **Vercel** (recommended for Next.js, but works with React)
  ```bash
  npm i -g vercel
  vercel
  ```

- **Netlify**
  ```bash
  npm i -g netlify-cli
  netlify deploy --prod --dir=dist
  ```

- **AWS S3 + CloudFront**
  ```bash
  aws s3 sync dist/ s3://your-bucket-name/
  ```

- **GitHub Pages**
  ```bash
  npm run build
  # Commit dist/ folder to gh-pages branch
  ```

---

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

### Fork & Clone

```bash
git clone https://github.com/yourusername/vendor-onboarding-portal.git
cd vendor-onboarding-portal
git checkout -b feature/your-feature-name
```

### Make Changes

1. Create a feature branch from `main`
2. Make your changes (backend and/or frontend)
3. Write tests for new features
4. Ensure all tests pass

### Submit a Pull Request

1. Commit your changes with clear messages
2. Push to your fork
3. Open a Pull Request with a description of changes
4. Link related issues
5. Wait for code review and merge

### Code Review Checklist

- [ ] Code follows project style guidelines
- [ ] Tests pass locally (`pytest` for backend, `npm test` for frontend)
- [ ] No console errors or warnings
- [ ] API changes are documented in README
- [ ] UI changes include visual testing

---

## 📄 License

This project is licensed under the **MIT License** — see the LICENSE file for details.

### MIT License Summary

You are free to:
- Use the software for any purpose
- Modify the source code
- Distribute the software
- Include in proprietary applications

With the condition that you:
- Include the original license and copyright notice

---

## 🆘 Troubleshooting

### "Connection refused" on `http://localhost:8000`

**Solution:** Ensure backend is running.
```bash
cd backend
uvicorn main:app --reload --port 8000
```

### "CORS error" in browser console

**Solution:** Update `allow_origins` in `backend/main.py` to match your frontend URL.

### "Module not found" errors in frontend

**Solution:** Reinstall dependencies.
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

### "No module named 'fastapi'" in backend

**Solution:** Activate virtual environment and reinstall.
```bash
cd backend
.venv\Scripts\activate  # (or: source .venv/bin/activate)
pip install -r requirements.txt
```

### Form validation not working

**Solution:** Check browser console for errors. Ensure API is responding with correct status codes.

---

## 📞 Support

For issues, feature requests, or questions:

1. Check the [Troubleshooting](#troubleshooting) section
2. Search existing [GitHub Issues](https://github.com/yourusername/vendor-onboarding-portal/issues)
3. Open a new issue with a detailed description
4. Contact: maintainer@example.com

---

## 🙏 Acknowledgments

- **FastAPI** for the modern Python web framework
- **React** for the UI library
- **Vite** for the ultra-fast build tool
- **GSAP** for animation excellence
- **Three.js** for 3D graphics

---

## 📈 Roadmap

- [ ] Database integration (PostgreSQL/MongoDB)
- [ ] User authentication & authorization
- [ ] Vendor profile pages
- [ ] Bulk vendor import (CSV)
- [ ] Email notifications on approval
- [ ] Vendor analytics dashboard
- [ ] Dark/light theme toggle
- [ ] Multi-language support

---

## 🏁 Quick Start Recap

```bash
# Terminal 1: Backend
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000

# Terminal 2: Frontend
cd frontend
npm install
npm run dev

# Open browser
# http://localhost:8000/docs    (API docs)
# http://localhost:5173         (React app)
```

---

**Made with ❤️ for modern vendor onboarding.**