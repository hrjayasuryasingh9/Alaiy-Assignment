# 👟 Stepzo

**Stepzo** is a modern e-commerce platform focused on delivering an engaging and seamless experience for shoe lovers. The platform offers a curated selection across three primary categories — **Sneakers**, **Sandals**, and **Loafers** — while also providing full shopping capabilities including cart, wishlist, and detailed product views with secure payment integration.

---

## 🔍 Project Overview

Stepzo is not just a shoe store — it's a complete shopping solution featuring:

- User authentication (signup, login, password recovery)
- Responsive and intuitive UI
- Product filtering by categories
- Wishlist and cart functionalities with real-time updates
- Detailed product views with recommendations
- Stripe-powered secure payment system
- Order management with status updates

---

## 🖥️ Key Features

- ✅ **User Authentication**: Email verification, JWT-based sessions, secure password reset
- 👟 **Product Categories**: Filter and browse products by Sneakers, Sandals, and Loafers
- ❤️ **Wishlist**: Add, remove, and manage your favorite products
- 🛒 **Shopping Cart**: Add to cart, update quantities, and view totals in real-time
- 💳 **Checkout**: View order summary and complete secure payments using Stripe
- 📦 **Order Tracking**: View order history and live status updates
- 📱 **Responsive Design**: Optimized for desktop and mobile experiences

---

## ⚙️ Tech Stack

### Frontend

- **React.js**
- **React Router DOM**
- **Zustand**
- **Axios**
- **Tailwind CSS & DaisyUI**
- **JWT in LocalStorage**

### Backend

- **Node.js** + **Express**
- **Prisma**
- **Cloudinary**
- **Nodemailer**
- **Crypto**, **Bcrypt**
- **REST API**

### Database

- **PostgreSQL**  
  Collections: `Users`, `Products`, `Cart`, `Orders`, `Order_Details`, `Wishlist`

---

## 📸 Screens Included

- Home Page with product categories & search
- Product Listing with filters and pagination
- Product Detail View
- Cart & Wishlist Pages
- Secure Login & Registration
- Checkout & Payment Status Pages
- Orders Page with status and history

---

## 🚀 Getting Started

### 🧠 Backend Setup

```bash
# Navigate to the backend directory
cd backend

# Install dependencies
npm install

# Set up environment variables
touch .env

# Add your environment variables as listed below
# Generate Prisma client and sync with your DB
npx prisma generate

#start backend
npm start
```

### 🧠 Frontend Setup

```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Configure Axios base URL in the project to point to the backend server

# Start the frontend
npm start
```

### 🛠️ Required `.env` Variables

```env
NODEMAILER_EMAIL=your_email@example.com
NODEMAILER_PASS=your_email_app_password

JWT_SECRET=your_jwt_secret

DATABASE_URL=your_postgresql_connection_string

STRIPE_SECRET_KEY=your_stripe_secret_key

FRONTEND_URL=your_frontend_url

```

```bash
# Run the development server
npm run dev
```

---

## 🌐 Live Demo

Check out the live version here 👉 [Stepzo Live Demo](https://alaiy-assignment.netlify.app/)  
⚠️ Please note: The server might take a few seconds to wake up if it's been idle.

---

## 🌐 Project Documentation

Check out the Project Documentation Here 👉 [Stepzo Project Documentation](https://alaiy-assignment.netlify.app/](https://drive.google.com/file/d/17MPI-h3B_McZW_kvnJk7bl7pvwB3ZARu/view?usp=sharing) 

---

## 📬 Contact

For feedback or collaboration, feel free to reach out:  
**Name:** [HR Jaya Surya Singh]  
**Email:** [hrjayasuryasingh@gmail.com]

---

