# Nexora Club - Product Requirements Document

**Last Updated:** December 18, 2024

## Original Problem Statement
Create a modern, responsive, and professional website for a college tech club named "Nexora Club" with a futuristic dark theme, blue-purple gradient accents (updated to cyan-green #00FFD1), clean UI, and modern typography. The tagline is "Where Innovation Meets Execution."

## Architecture
- **Frontend:** React with React Router
- **Backend:** FastAPI (not yet implemented)
- **Database:** MongoDB (not yet implemented)
- **UI Library:** Shadcn UI components
- **3D Graphics:** Spline (Neon balls animation)
- **Design System:** Custom dark theme with cyan-green accent (#00FFD1)

## User Personas
1. **Students** - Want to join the club, register for events, and access resources
2. **Core Team Members** - Manage events and member registrations
3. **Visitors** - Learn about the club and its activities

## Core Requirements (Static)

### Pages Required
1. ✅ Home Page - Hero with 3D Spline animation, stats, featured event
2. ✅ About Page - Vision, mission, why join, faculty coordinator
3. ✅ Events Page - Upcoming and past events with registration
4. ✅ Team Page - Leadership and core team members
5. ✅ Resources Page - Learning materials (DSA, Web Dev, Hackathons, Interviews)
6. ✅ Join Us Page - Registration form with validation

### Design Requirements
- ✅ Dark theme with black (#000000) background
- ✅ Cyan-green accent color (#00FFD1)
- ✅ Sharp-edged buttons (border-radius: 0px)
- ✅ High contrast typography
- ✅ Responsive design (mobile + desktop)
- ✅ Smooth animations and transitions
- ✅ Spline 3D integration on hero section

### Functional Requirements (Frontend)
- ✅ Multi-page navigation with React Router
- ✅ Registration form with client-side validation
- ✅ Event registration alerts (mock)
- ✅ Responsive navigation with mobile menu
- ✅ Social media links in footer
- ✅ Interactive buttons and hover effects

## What's Been Implemented (December 18, 2024)

### Phase 1: Frontend with Mock Data ✅
- **Components Created:**
  - Navbar - Fixed header with responsive mobile menu
  - Footer - Social links (Instagram, LinkedIn, GitHub, Email)
  - Home page with Spline 3D neon balls animation
  - About page with vision, mission, and why join sections
  - Events page with upcoming and past events
  - Team page with leadership and core team grids
  - Resources page with learning material cards
  - Join Us page with comprehensive registration form

- **Mock Data Structure:**
  - Club statistics (250+ members, 45+ events, 30+ workshops)
  - 4 upcoming events with images and details
  - 3 past events with attendee counts
  - 6 team members (3 leadership + 3 core team)
  - 4 resource categories
  - Interest areas, branches, and year options for registration

- **Design System Implemented:**
  - Custom CSS variables for dark theme
  - Typography scale (display-huge to body-small)
  - Button styles (primary and secondary)
  - Transition and hover effects
  - Responsive breakpoints

- **Key Features:**
  - All navigation working correctly
  - Form validation on Join Us page
  - Success message after form submission
  - Responsive design for mobile and desktop
  - Smooth page transitions

## Prioritized Backlog

### P0 - Critical (Next Phase)
1. **Backend Development**
   - Set up FastAPI endpoints
   - MongoDB models for members, events, and registrations
   - JWT authentication
   - CRUD operations

2. **Database Integration**
   - Connect frontend forms to backend APIs
   - Remove mock data and use real data
   - Implement data persistence

### P1 - Important
1. **Admin Panel**
   - Admin authentication
   - Event management (create, edit, delete)
   - Member management
   - Registration approvals

2. **Event Registration System**
   - Real event registration with database storage
   - Email notifications
   - Registration confirmation

3. **Authentication**
   - Member login/signup
   - Password reset functionality
   - Session management

### P2 - Nice to Have
1. **Enhanced Features**
   - Search functionality for events and resources
   - Event calendar view
   - Member dashboard
   - Blog/news section
   - Gallery for past events

2. **Integrations**
   - Email service (SendGrid/AWS SES)
   - Google OAuth for login
   - Payment gateway for paid events
   - Analytics integration

## API Contracts (To Be Implemented)

### Authentication
- `POST /api/auth/register` - Register new member
- `POST /api/auth/login` - Member login
- `POST /api/auth/logout` - Member logout

### Members
- `GET /api/members` - Get all members
- `GET /api/members/:id` - Get member by ID
- `PUT /api/members/:id` - Update member profile

### Events
- `GET /api/events` - Get all events
- `GET /api/events/:id` - Get event by ID
- `POST /api/events` - Create new event (admin only)
- `PUT /api/events/:id` - Update event (admin only)
- `DELETE /api/events/:id` - Delete event (admin only)
- `POST /api/events/:id/register` - Register for event

### Resources
- `GET /api/resources` - Get all resources
- `POST /api/resources` - Create resource (admin only)

## Current Mock Data (To Be Replaced with Backend)
All data is currently stored in `/app/frontend/src/mock.js`:
- Club statistics
- Featured and upcoming events
- Past events
- Team members
- Resources
- Form options (branches, years, interest areas)
- Social links

## Next Tasks
1. Build backend API with FastAPI
2. Create MongoDB models and schemas
3. Implement JWT authentication
4. Connect registration form to backend
5. Create event registration endpoints
6. Test end-to-end functionality
7. Deploy to production

## Technical Stack
- **Frontend:** React 19, React Router 7.5.1, Tailwind CSS, Shadcn UI
- **3D Graphics:** Spline (@splinetool/react-spline 4.1.0)
- **Backend:** FastAPI 0.110.1 (to be implemented)
- **Database:** MongoDB with Motor (async driver) (to be implemented)
- **Authentication:** JWT with PyJWT (to be implemented)
