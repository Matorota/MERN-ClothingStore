# MERN Stack Template (TypeScript + Vite + Tailwind)

This is a simple full-stack MERN template built with TypeScript. It provides a ready-to-use structure for building modern web applications.

## Technologies

- **React** with **Vite** for a fast frontend development experience
- **Tailwind CSS** for styling (with automatic class sorting via Prettier)
- **Express.js** as the backend server
- **MongoDB** with **Mongoose** for the database
- **TypeScript** used in both the frontend and backend

## Features

- Vite-powered React frontend
- Tailwind CSS with Prettier plugin for class sorting
- Express backend with basic centralized error handling
- MongoDB integration with a sample `Product` model
- Clean and modular project structure
- Example `.env` files for easy environment setup
- Frontend API utility (`api-client.ts`) for GET, POST, PUT, and PATCH with error handling

## Getting Started

### Install Dependencies

**Frontend:**
```bash
cd frontend
npm install
```

**Backend:**

```bash
cd backend
npm run dev
```

## Then visit the following URL in your browser:

#### Create .env  put in the file and fill them with your own info:

MONGODB_CONNECTION_STRING=
PORT=
FRONTEND_BASE_URL=

##### Also dont forget to connect back and frontend before running
#### Example: MONGODB_CONNECTION_STRING=http://localhost:<YOUR_BACKEND_PORT>/api/seed-db
