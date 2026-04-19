# Vendor Onboarding Portal

A full-stack vendor registration and approval system built with **FastAPI** + **React + TypeScript (Vite)**, featuring immersive **Three.js** 3D visuals and **GSAP** animations.

## Stack

| Layer | Tech |
|-------|------|
| Backend | FastAPI, Python 3.8+, Uvicorn |
| Frontend | React 19, TypeScript, Vite |
| Animations | GSAP |
| 3D Graphics | Three.js |

## Quick Start

**Backend** (terminal 1):
```bash
cd vendor-onboarding-portal/backend
python -m venv .venv
.venv\Scripts\activate        # macOS/Linux: source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

**Frontend** (terminal 2):
```bash
cd vendor-onboarding-portal/frontend
npm install
npm run dev
```

- App → http://localhost:5173
- API docs (Swagger) → http://localhost:8000/docs

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/vendors` | Register a new vendor |
| `GET` | `/vendors` | List all vendors |
| `PATCH` | `/vendors/{id}/approve` | Approve a vendor |

## Features

- Vendor registration form with validation
- Category filtering (Staffing Agency, Freelance Platform, Consultant)
- One-click approval workflow with status badges
- Full-screen Three.js canvas — particle field, wireframe torus knot, icosahedron, mouse parallax
- GSAP entrance animations and row stagger effects
- Glassmorphism dark UI

## Prompts Used

### 1. Planning (Claude Sonnet)

```
Teckleap round 2 is a vendor onboarding portal—React + TypeScript on the front,
FastAPI on the back, in-memory store (no DB). This is a 30-minute assignment.

Give me a tight build plan: folder structure, the three endpoints I actually need,
default vendor status, CORS note, and the exact Vite/React steps. Include a hard
step to wipe both src/index.css and src/App.css to empty before building the UI (not
just a vague "gotcha"). Order the steps so backend comes before UI.

Bonus checklist—name these three explicitly so nothing gets missed: (1) filter vendors
by category, (2) Approve button per row, (3) form validation for empty fields and email
format.
```

### 2. Implementation

```
Read plan.md and the problem statement PDF in plan/. Scaffold FastAPI: POST /vendors,
GET /vendors, PATCH /vendors/{id}/approve; in-memory list; default new vendor status
"Pending Approval"; CORS for local dev.

Vite + React + TypeScript: before you write UI code, wipe src/index.css and
src/App.css completely (empty files). API base URL http://localhost:8000.

TypeScript Vendor type must match the API: id, name, category, contact_email, status.

Table columns in order: Name, Category, Email, Status, Action. Status badges: if
Approved use background #d1fae5 and text #065f46; otherwise (e.g. Pending Approval)
background #fef9c3 and text #78350f. Approve button only when status is not Approved;
hide it once approved.

Form: name, category (dropdown: Staffing Agency, Freelance Platform, Consultant),
contact email; reload the list after a successful POST. Category filter chips: All
plus those three categories.

Do not add git, do not add a README yet.
```

### 3. GSAP + Three.js visuals (Kiro)

```
In the frontend please add some GSAP and Three.js visuals now.
```

Added `ThreeBackground.tsx` (Three.js particle field, torus knot, icosahedron, mouse parallax), GSAP entrance/stagger/spring animations, and a full dark glassmorphism UI redesign.

---

See [`vendor-onboarding-portal/README.md`](vendor-onboarding-portal/README.md) for full documentation.
