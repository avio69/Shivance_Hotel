# Shivance Hotel — Full-stack Food Ordering App (React + Tailwind + Node/Express + MongoDB)

This repository contains a full-stack sample project for **Shivance Hotel** (Halsi, Lakhisarai) with:
- React + Tailwind frontend (Vite)
- Node.js + Express backend
- MongoDB (Atlas recommended)
- Razorpay integration (test keys)
- JWT authentication and admin dashboard
- Seed script to populate menu items + admin user

## Structure
```
shivance_hotel/
├─ shivance_frontend/
└─ shivance_backend/
```

## Quick setup

### Backend
1. `cd shivance_backend`
2. `cp .env.example .env` and fill the values (MONGO_URI, JWT_SECRET, RAZORPAY keys, ADMIN_EMAIL, ADMIN_PASSWORD)
3. `npm install`
4. `npm run seed`  # seeds menu and admin user
5. `npm run dev`   # starts server at http://localhost:5000

### Frontend
1. `cd shivance_frontend`
2. `cp .env.example .env` and set VITE_API_URL (e.g. http://localhost:5000/api) and VITE_RAZORPAY_KEY_ID if desired
3. `npm install`
4. `npm run dev`   # starts frontend (Vite) — follow terminal URL (usually http://localhost:5173)

## Notes
- Seed script will create an admin user using `.env` ADMIN_EMAIL and ADMIN_PASSWORD.
- Placeholder images are used via `https://via.placeholder.com`.
- This zip is ready for local development. For production, secure env vars, enable HTTPS, verify Razorpay signatures, and use cloud storage for images.
