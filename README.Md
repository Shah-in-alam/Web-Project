# Campaign Management System

A full-stack web application for managing campaigns, bookings, features, and user reviews. This project is built with **Vue.js** for the frontend and **Node.js/Express** with **Prisma** for the backend.

---

## Features

- **User Authentication:** Sign Up, Sign In, Logout, and Password Reset.
- **Campaign Management:** View, create, and manage campaigns (with Google Maps integration).
- **Booking System:** Book campaign spots and manage your bookings.
- **Feature Management:** Explore and suggest new features.
- **Review System:** Submit and view reviews for campaign spots.
- **Admin Panel:** Admins can manage campaigns, bookings, features, and users.
- **Responsive Design:** Works on desktop, tablet, and mobile devices.
- **Social Media Links:** Footer includes links to X, Instagram, and Facebook.
- **Modern UI:** Clean, modern, and responsive interface with animated forms and cards.

---


## Project Structure


Web-Project/
 ├── Backend/ 
 # Node.js/Express backend with Prisma ORM 
 │ ├── routes/ # API route handlers (users, campaigns, bookings, etc.) 
 │ 
 ├── prisma/ # Prisma schema and migrations 
 │ ├── app.js # Express app setup │ 
 └── ... # Other backend files 
 ├── frontend/ # Vue.js frontend │
 ├── src/ │
 │ ├── assets/
  # Images and static files │ 
 │ ├── components/ # Vue components (Navbar, Footer, etc.) │ 
 │ ├── views/ # Page views (Home, Booking, Campaign, etc.) │ 
 │ ├── router/ # Vue Router configuration │ 
 │ ├── App.vue # Root Vue component │ 
 │ └── main.js # Entry point 
 │ └── ... # Other frontend files 
 └── README.md # Project documentation
# Frontend Setup
The frontend will run at http://localhost:8080 by default.
The backend will run at http://localhost:3000 by default.
# API Endpoints
User: /users/signup, /users/signin, /users/reset-password
Campaign: /campaign
Booking: /booking
Feature: /feature
Review: /review
# Technologies Used
Frontend: Vue.js, Vue Router, Axios, Font Awesome, CSS3
Backend: Node.js, Express, Prisma ORM, bcryptjs
Database: MySQL or PostgreSQL
# UI Highlights
Navbar: Includes logo, navigation links, and user/admin options.
Footer: Contains About Us, Contact Us, and social media links (X, Instagram, Facebook) using <router-link> for internal navigation.
Booking Page: Modern card design, animated form, and sticky footer.
Review Page: Displays all reviews with spot ID, user, and rating.
Forget Password: Animated, modern reset form with a link back to login.
# Author
 Mohammad Shahin Alam 
# Suppervisor 
 Collin Van Der Vorst 
# Contact
For questions or support, please contact [mshahinalam37@gmail.com].

