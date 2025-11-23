# Social Activity Feed 🌐

A modern, interactive **social feed web application** built using **React**, **Node.js**, and **MongoDB**.  
The platform allows users to create posts, like posts, follow others, and view a real-time activity feed. Admin users can manage other users, promoting them to admin or deleting accounts. The UI is responsive and enhanced with **Framer Motion** animations for a polished, professional look.

---

## Table of Contents

- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Architecture](#architecture)  
- [Installation](#installation)  
- [Usage](#usage)  
- [Folder Structure](#folder-structure)  
- [Future Enhancements](#future-enhancements)  
- [License](#license)  

---

## Features

### User Features

- **Authentication:** Login and Signup using JWT.  
- **Posts:** Users can create, like, and delete their own posts.  
- **Follow/Block:** Users can follow or block other users.  
- **Activity Feed:** Real-time feed of posts, likes, follows, and user actions.  
- **Responsive UI:** Works on desktop and mobile.  
- **Animations:** Smooth transitions using **Framer Motion**.  

### Admin Features

- **Admin Panel:** Admins can view all users (derived from activity feed).  
- **User Management:** Promote a user to admin or delete users.  
- **Access Control:** Only admins or owners can access admin controls.  

---

## Tech Stack

| Layer         | Technology |
|---------------|------------|
| Frontend      | React, React Router, TailwindCSS, Framer Motion |
| Backend       | Node.js, Express.js |
| Database      | MongoDB |
| Authentication| JWT |
| Icons         | React Icons |

---
 

### Admin Features

- **Admin Panel:** Admins can view all users (derived from activity feed).  
- **User Management:** Promote a user to admin or delete users.  
- **Access Control:** Only admins or owners can access admin controls.  

---

## Tech Stack

| Layer         | Technology |
|---------------|------------|
| Frontend      | React, React Router, TailwindCSS, Framer Motion |
| Backend       | Node.js, Express.js |
| Database      | MongoDB |
| Authentication| JWT |
| Icons         | React Icons |

---

## Architecture
# Social Activity Feed 🌐

A modern, interactive **social feed web application** built using **React**, **Node.js**, and **MongoDB**.  
The platform allows users to create posts, like posts, follow others, and view a real-time activity feed. Admin users can manage other users, promoting them to admin or deleting accounts. The UI is responsive and enhanced with **Framer Motion** animations for a polished, professional look.

---

## Table of Contents

- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Architecture](#architecture)  
- [Installation](#installation)  
- [Usage](#usage)  
- [Folder Structure](#folder-structure)  
- [Future Enhancements](#future-enhancements)  
- [License](#license)  

---

## Features

### User Features

- **Authentication:** Login and Signup using JWT.  
- **Posts:** Users can create, like, and delete their own posts.  
- **Follow/Block:** Users can follow or block other users.  
- **Activity Feed:** Real-time feed of posts, likes, follows, and user actions.  
- **Responsive UI:** Works on desktop and mobile.  
- **Animations:** Smooth transitions using **Framer Motion**.  




## Architecture

- **Frontend:** Handles UI, routes, authentication, and interactions.  
- **Backend:** Provides RESTful APIs for users, posts, and activity feed. Handles authentication, CRUD operations, and admin actions.  
- **Database:** Stores users, posts, likes, and other metadata.  

---

## Installation

1. Clone the repository:

git clone https://github.com/YourUsername/social-activity-feed.git
cd social-activity-feed

2. Install frontend dependencies:
cd frontend
npm install

3.Install backend dependencies:
cd ../backend
npm install

4.Create a .env file in the backend folder:
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

5.Start the backend server:
npm run dev

6.Start the frontend server:
cd ../frontend
npm run dev

Open your browser at http://localhost:3000

Usage:
Login / Signup: Create an account or login.
Create Post: Click the + icon in the navbar to open the post modal.
Like / Delete Post: Like any post or delete your own post.
Activity Feed: View user activities including posts, likes, follows, and deletions.
Admin Panel: Admins can promote users or delete accounts.

Folder Structure
frontend/
 ├─ src/
 │   ├─ components/      # Reusable components (Feed, PostCard, Navbar)
 │   ├─ context/         # Auth context
 │   ├─ pages/           # Pages (Home, Login, Signup, Profile, AdminPanel)
 │   └─ services/        # API service functions
backend/
 ├─ controllers/         # Route logic (posts, users)
 ├─ models/              # Mongoose models (Post, User)
 ├─ routes/              # API routes
 └─ server.js            # Entry point


Future Enhancements
Realtime updates using Socket.io
Comments on posts
Notifications for likes/follows
Dark mode toggle
Pagination or infinite scrolling for feed



Author
Prithvi Raj
Built with ❤️ for a modern social feed experience.



