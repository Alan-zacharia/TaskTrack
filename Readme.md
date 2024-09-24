# Task Management Application

## Overview
This is a simple task management application built with a Node.js backend and a React frontend. It allows users to manage tasks with features like user authentication, real-time updates, and data visualization.

## Features
- **Task Management**: Add, edit, and delete tasks.
- **User Authentication**: Secure registration and login.
- **Real-Time Updates**: Automatic updates for task changes.
- **Data Visualization**: Visual stats on tasks.
- **Responsive Design**: Works on various devices.

## Technologies Used
- **Backend**: Node.js, Express, MongoDB
- **Frontend**: Next.js
- **Real-Time Communication**: Socket.io
- **Data Visualization**: recharts
- **Styling**: Tailwind css , shardcn.ui

## Getting Started

### Prerequisites
- Node.js 
- MongoDB
- npm 

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Alan-zacharia/TaskTrack.git
   
2. Set up the backend:
   cd server
   npm install

3. Create a .env file in the backend directory and add your MongoDB URI:
   ORIGIN_URL=""
   DB_HOST=""
   JWT_SECRET_KEY=""
   JWT_REFRESH_SECRET_KEY=""

4. Start the backend server
   npm run dev.
   
5. Set up the frontend
   cd client
   npm install
   
6. Start the frontend development server
   npm run dev   


Live Demo

