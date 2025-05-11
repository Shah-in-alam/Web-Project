# Campaign Management System - Frontend

This is the **frontend** of the Campaign Management System, built using **Vue.js**. The application allows users to explore campaigns, book spots, view features, and manage reviews. Admins can manage campaigns and features.

## Features
- **User Authentication**: Sign Up, Sign In, and Logout functionality.
- **Campaign Management**: View available campaigns with embedded Google Maps.
- **Booking System**: Create and manage bookings.
- **Feature Management**: Explore and suggest new features.
- **Admin Panel**: Manage campaigns, bookings, and features (for admin users).
- **Responsive Design**: Fully responsive UI for all devices.

## Project Structure
```
frontend/
├── public/               # Static assets
├── src/
│   ├── assets/           # Images and static files
│   ├── components/       # Vue components (Navbar, Footer, etc.)
│   ├── views/            # Pages (Home, Booking, Campaign, etc.)
│   ├── router/           # Vue Router configuration
│   ├── store/            # Vuex Store (if used)
│   ├── App.vue           # Root Vue component
│   ├── main.js           # Application entry point
├── package.json          # Project dependencies and scripts
```

## Project Setup
### Install Dependencies
```bash
npm install
```

### Compiles and hot-reloads for development
```bash
npm run serve
```

### Compiles and minifies for production
```bash
npm run build
```

### Lints and fixes files
```bash
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
