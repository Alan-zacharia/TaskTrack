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
   
   1. cd TaskTrack
   
2. Set up the backend:
   1. cd server
   2. npm install
  
3. Create a .env file in the backend directory and add your MongoDB URI :
   1. ORIGIN_URL=""
   2. DB_HOST=""
   3. JWT_SECRET_KEY=""
   4. JWT_REFRESH_SECRET_KEY=""
  
4. Start the backend server :
   1. npm run dev.
   
5. Set up the frontend
  1. cd client
  2. npm install
   
6. Start the frontend development server
  1. npm run dev   


Live Demo :

Link : https://task-track-lovat.vercel.app

