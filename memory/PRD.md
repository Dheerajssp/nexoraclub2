# Nexora Club - Product Requirements Document

**Last Updated:** December 18, 2025

## Original Problem Statement
Create a modern, responsive, and professional website for a college tech club named "Nexora Club" with a futuristic dark theme, cyan-green accent (#00FFD1), clean UI, and modern typography. Tagline: "Where Innovation Meets Execution."

## Architecture
- **Frontend:** React with React Router
- **Backend:** FastAPI with MongoDB (Motor async driver)
- **Database:** MongoDB
- **UI Library:** Shadcn UI components
- **3D Graphics:** Spline (Neon balls animation)
- **Authentication:** JWT-based with bcrypt password hashing

## User Personas
1. **Students** - Join club, register for events, access resources, view dashboard
2. **Core Team Members** - Manage events and member registrations
3. **Admin** - Full control over events, members, external event sync

## Core Pages
1. Home Page - Hero with 3D animation, stats, featured event
2. About Page - Vision, mission, why join, college info
3. Events Page - Internal (Nexora) and External (Unstop, HackerEarth) tabs
4. Team Page - Leadership and core team members
5. Resources Page - Learning materials with quick links
6. Join Us Page - Registration form
7. Login Page - Email/password authentication
8. Dashboard Page - User profile and registered events
9. Admin Dashboard - Event management, external sync

---

## What's Been Implemented

### Phase 4: User Authentication & Dashboard (December 18, 2025) - COMPLETED

**Login System:**
- Login page with email/password form
- JWT token authentication
- Login/Logout state reflected in Navbar
- Protected routes redirect to login

**User Dashboard:**
- Profile information display (name, email, phone, branch, year, interest area)
- Event registrations list with status
- Stats cards (events registered, completed, account type)
- Logout functionality

**UI Enhancements:**
- Club logo added to Navbar
- Login button in Navbar (when logged out)
- Dashboard + Logout links (when logged in)
- Mobile responsive auth state
- HackerRank and LeetCode added to Resources quick links

**Test Coverage:**
- 13/13 backend tests passing
- All frontend flows verified
- Protected routes working

---

### Previous Phases Summary

**Phase 3: External Events Integration**
- Multi-platform event aggregation (Unstop, HackerEarth, Devfolio)
- Separate tabs for internal/external events
- Admin sync endpoint

**Phase 2: Full Backend Development**
- FastAPI server with MongoDB
- JWT authentication system
- All CRUD endpoints for events, members, registrations
- Stats API

**Phase 1: Frontend with Mock Data**
- All 6 core pages built
- Dark theme with cyan-green accent
- Spline 3D animation
- Responsive design

---

## API Endpoints (Implemented)

### Authentication
- `POST /api/auth/register` - Member registration
- `POST /api/auth/login` - Member login (returns JWT)
- `GET /api/auth/me` - Get current user profile

### Events
- `GET /api/events` - Get all events
- `GET /api/events?event_type=internal|external` - Filter by type
- `GET /api/events/{id}` - Get event by ID
- `POST /api/events` - Create event (admin)
- `PUT /api/events/{id}` - Update event (admin)
- `DELETE /api/events/{id}` - Delete event (admin)
- `POST /api/events/sync-external` - Sync external events (admin)

### Registrations
- `POST /api/registrations` - Register for event
- `GET /api/registrations/my-registrations` - User's registrations
- `GET /api/registrations/event/{id}` - Event registrations

### Stats
- `GET /api/stats` - Club statistics

---

## Database Schema

**Members Collection:**
- name, email (unique), phone, branch, year, interest_area
- hashed_password, role (member/admin), is_active, created_at

**Events Collection:**
- title, description, date, category, image
- is_external, external_url, platform
- registrations_count, created_by, created_at

**Registrations Collection:**
- member_id, member_name, member_email
- event_id, event_title
- registration_date, status

---

## Test Credentials
- **Test User:** testuser123@test.com / testpass123
- **Admin:** admin@nexora.com / adminpassword

---

## Prioritized Backlog

### P0 - Critical (COMPLETED)
1. User Login page
2. User Dashboard (profile + registered events)
3. Logo in Navbar
4. HackerRank/LeetCode links in Resources

### P1 - Important (Next Phase)
1. **Full Admin Panel** - CRUD interface for events with edit/delete
2. **Dynamic External Events** - Web scraping from live platforms
3. **User Scores/Performance** - Track user performance in events
4. **Password Reset** - Forgot password flow
5. **Email Notifications** - Registration confirmation emails

### P2 - Nice to Have
1. Event calendar view
2. Gallery for past events
3. Blog/news section
4. Google OAuth integration
5. Payment gateway for paid events
6. Search functionality

---

## Files Structure

```
/app
├── backend/
│   ├── server.py          # FastAPI app entry
│   ├── database.py        # MongoDB connection
│   ├── auth.py            # JWT utilities
│   ├── models.py          # Pydantic models
│   ├── external_events.py # External events fetcher
│   ├── routes/
│   │   ├── auth.py        # Auth endpoints
│   │   ├── events.py      # Events endpoints
│   │   ├── members.py     # Members endpoints
│   │   ├── registrations.py # Registration endpoints
│   │   └── stats.py       # Stats endpoint
│   └── tests/
│       └── test_auth_api.py # API tests
└── frontend/
    ├── src/
    │   ├── App.js         # Routes
    │   ├── api.js         # API client
    │   ├── mock.js        # Static mock data
    │   ├── components/
    │   │   ├── Navbar.jsx  # Navigation with auth state
    │   │   └── Footer.jsx
    │   └── pages/
    │       ├── Home.jsx
    │       ├── About.jsx
    │       ├── Events.jsx
    │       ├── Team.jsx
    │       ├── Resources.jsx
    │       ├── JoinUs.jsx
    │       ├── Login.jsx
    │       ├── Dashboard.jsx
    │       └── AdminDashboard.jsx
    └── public/
        └── logo.png        # Club logo
```

---

## 3rd Party Integrations
- **Spline:** 3D neon balls animation on Home page
- **External Platforms (Mocked):** Unstop, HackerEarth, Devfolio events

---

## Project Health
- **Backend:** 100% working (13/13 tests passing)
- **Frontend:** All flows functional
- **Auth:** JWT working correctly
- **Mocked:** External events sync uses hardcoded data (not live scraping)
