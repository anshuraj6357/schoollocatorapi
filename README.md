# 🏫 School Finder API

A **Node.js + Express.js** backend project that allows users to **register, login, update their profile, upload school details**, and **view schools sorted from nearest to farthest** based on their location.

---

##  Features

-  **Authentication**
  - User Registration
  - User Login (JWT-based)
  - Update User Profile

-  **School Management**
  - Authenticated users can upload school details
  - -send email on the successfull school registered and school updation 
  - Anyone can view schools sorted by nearest → farthest

-  **Distance Calculation**
  - Uses Haversine formula to calculate distances between user location and schools

---

##  Tech Stack

- **Backend**: Node.js, Express.js  
- **Database**: MySQL  
- **Authentication**: JWT (JSON Web Token)  
- **Distance Sorting**: Haversine formula  

---

##  Project Structure


.
├── src
│ ├── controllers
│ │ ├── authController.js
│ │ ├── schoolController.js
│ ├── models
│ │ ├── User.js
│ │ ├── School.js
│ ├── routes
│ │ ├── authRoutes.js
│ │ ├── schoolRoutes.js
│ ├── middleware
│ │ ├── authMiddleware.js
│ └── app.js
├── config
│ ├── db.js
├── package.json
└── README.md




---

##  Installation & Setup

1. **Clone the repo**
```bash
git clone https://github.com/anshuraj6357/schoollocatorapi.git
cd schoollocatorapi


