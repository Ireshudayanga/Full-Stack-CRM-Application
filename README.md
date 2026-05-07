# Full-Stack CRM Application

A robust, modern, and beautiful Customer Relationship Management (CRM) system built for small sales teams. This application allows users to seamlessly manage sales leads, track their progress through a sales pipeline, append internal notes, and view a comprehensive analytics dashboard.

## 🚀 Features Implemented

- **Authentication System**: Secure JWT-based login using bcrypt for password hashing.
- **Lead Management**: Full CRUD capabilities (Create, Read, Update, Delete) for sales leads.
- **Sales Pipeline Tracking**: Update and track leads through different stages (New, Contacted, Qualified, Proposal Sent, Won, Lost).
- **Structured Notes**: Track internal updates. Appends notes to leads with content, author (Created By), and timestamps.
- **Advanced Dashboard**: Visual overview of Total Leads, New Leads, Qualified, Won Leads, Lost Leads, and Deal Values.
- **Search & Filtering**: Instantly search leads by Name, Company, or Email, and filter them by Status, Source, and Salesperson.
- **Modern UI/UX**: Built with Tailwind CSS v4 featuring glassmorphism, responsive data tables, fluid animations, and a premium design language.
- **Dockerized**: Fully containerized with `docker-compose` for guaranteed local execution without environment discrepancies.

## 💻 Tech Stack

- **Frontend**: Next.js 16 (React 19), Tailwind CSS v4
- **Backend**: Node.js 20, Express.js
- **Database**: MongoDB (Containerized)
- **Authentication**: JSON Web Tokens (JWT), bcryptjs
- **Infrastructure**: Docker & Docker Compose

## 🛠️ Local Setup Instructions

### Prerequisites
- Docker and Docker Compose installed on your machine.

### 1. Clone the repository
```bash
git clone https://github.com/Ireshudayanga/Full-Stack-CRM-Application.git
cd Full-Stack-CRM-Application
```

### 2. Environment Setup
The project requires a `.env` file at the root. Create a `.env` file and add the following configuration:
```env
# --- Database Credentials ---
MONGO_ROOT_USERNAME=admin
MONGO_ROOT_PASSWORD=password123
MONGO_URI=mongodb://admin:password123@mongodb:27017/crm_db?authSource=admin

# --- Backend API Settings ---
PORT=5000
JWT_SECRET=supersecretcrmkey123_change_this_in_production

# --- Default Admin Seed Credentials ---
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=password123

# --- Frontend Settings ---
NEXT_PUBLIC_API_URL=http://localhost:5001/api
```

### 3. Run the Application
Start the application using Docker Compose:
```bash
docker-compose up -d
```
Docker will automatically build the images, start the MongoDB instance, spin up the Node backend, and start the Next.js frontend server.

### 4. Access the Application
- **Frontend UI**: http://localhost:3000
- **Backend API**: http://localhost:5001/api

## 🔑 Test Login Credentials

Upon startup, the database is automatically seeded with an admin user.
- **Email**: `admin@example.com`
- **Password**: `password123`

## 🧠 Reflection Note

Building this CRM was a fantastic exercise in full-stack architecture and UX design. 

**Challenges & Solutions:**
- **Port Conflicts**: During containerization, port `5000` was frequently occupied by macOS AirPlay Receiver. I resolved this by mapping the Docker host port to `5001` while keeping the internal container port at `5000`, decoupling the external and internal architectures.
- **Tailwind CSS v4 Integration**: Upgrading to Tailwind v4 within a Next.js environment caused compilation freezes due to the deprecated `@tailwind` directives. I resolved this by migrating the `globals.css` to use standard CSS `@import "tailwindcss";` and utilizing `@theme` for custom animations, successfully unblocking the compiler.
- **CSS Stacking Contexts**: The smooth fade-in animations inadvertently created a new CSS stacking context that trapped fixed modals. I resolved this by properly elevating the React modal outside the animated DOM branch via Fragments.


## ⚠️ Known Limitations
- The application currently uses a single global Admin user model. A full production application would need role-based access control (RBAC) to restrict certain salespeople from deleting leads or viewing leads assigned to others.
- The Next.js frontend uses client-side rendering for the dashboard and leads table. For massive datasets (100,000+ leads), server-side pagination should be implemented on the backend API.
