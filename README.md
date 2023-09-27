# LingoLab
# MERN Stack Project

This is a full-stack MERN (MongoDB, Express, React, Node.js) project that consists of both frontend and backend components.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- Node.js and npm (Node Package Manager)
- MongoDB (Make sure it's running)

## Clone the Repository

To get started, clone this repository to your local machine:

```bash
git clone https://github.com/Maitreya61/LingoLab.git
```

## Frontend Setup
Navigate to the "frontend" folder and follow these steps:

```bash
cd frontend
```

Install Dependencies
Install the necessary frontend dependencies:

```bash
npm install react react-router-dom react-modal axios @ramonak/react-progress-bar
```

Start the Frontend Server
To start the development server for the frontend, run:

```bash
npm start
```

This will run the React app in development mode. Open http://localhost:3000 in your browser to view the app.

## Backend Setup

```bash
cd backend
```

Install Dependencies
Install the necessary backend dependencies:

```bash
npm install express jsonwebtoken dotenv mongoose cors bcrypt nodemon
```

Environment Variables
Create a .env file in the "backend" folder and configure your environment variables, including:

MONGODB_URI (MongoDB connection URI)
SECRET_KEY (for JWT authentication)

Example:
```bash
MONGODB_URI=mongodb://localhost:27017/your-database-name
SECRET_KEY=your-secret-key
```

Start the Backend Server
To start the backend server, run:

```bash
npm start
```

This will start the Express server at http://localhost:3001.

Usage
You can now use the MERN stack application locally. The frontend is accessible at http://localhost:3000, and the backend API is available at http://localhost:3001.
