# 🎯 Campaign Management System
A modern full-stack web application for managing campaigns, bookings, features, and user reviews. Built with Vue.js (frontend) and Node.js/Express with Prisma ORM (backend), and designed to be scalable, responsive, and user-friendly.

# 🚀 Features
🔐 User Authentication – Sign Up, Sign In, Logout, and Password Reset.

🏕️ Campaign Management – Create, view, and manage campaigns (with Google Maps integration).

📅 Booking System – Book campaign spots and manage reservations.

🌟 Feature Management – Explore and suggest campaign features.

📝 Review System – Submit and browse user reviews for campaigns.

🛠️ Admin Dashboard – Manage users, bookings, features, and campaigns.

📱 Responsive Design – Mobile-friendly interface.

🌐 Social Media Footer – Links to Instagram, Facebook, and X (Twitter).

✨ Modern UI – Clean design with smooth animations and transitions.

# 🧱 Project Structure
Web-Project/
├── Backend/                # Node.js/Express backend
│   ├── routes/            # API routes (users, campaigns, bookings, etc.)
│   ├── prisma/            # Prisma schema & migrations
│   └── app.js             # Express app setup
│
├── Frontend/              # Vue.js frontend
│   ├── src/
│   │   ├── assets/        # Images & static assets
│   │   ├── components/    # Navbar, Footer, etc.
│   │   ├── views/         # Pages (Home, Booking, Campaigns, etc.)
│   │   ├── router/        # Vue Router config
│   │   ├── App.vue        # Root component
│   │   └── main.js        # Vue app entry
│
└── README.md              # Project documentation

# 🌐 Deployment Info
Frontend: Runs on http://localhost:8080

Backend: Runs on http://localhost:3000

🔌 API Endpoints
Category	Endpoints
User	POST /users/signup, POST /users/signin, POST /users/reset-password
Campaign	GET /campaigns, POST /campaigns, DELETE /campaigns/:id
Booking	POST /booking
Feature	GET /features, POST /features
Review	POST /review, GET /review

🧰 Technologies Used
Frontend:

Vue.js, Vue Router

Axios, Font Awesome

CSS3, Scoped Styling

Backend:

Node.js, Express.js

Prisma ORM

bcrypt (for password hashing)

Database:

MySQL (or PostgreSQL supported)

# 🎨 UI Highlights
Navbar: Dynamic links based on user role (User/Admin)

Footer: Informational sections + social media icons (Instagram, Facebook, X)

Booking Page: Card layout with animations and a sticky footer

Review Page: Review listing with user, spot ID, and ratings

Forget Password Page: Clean, modern animated form

# 👨‍💻 Author
## Mohammad Shahin Alam
📧 mshahinalam37@gmail.com

# 🎓 Supervisor
Collin Van Der Vorst
