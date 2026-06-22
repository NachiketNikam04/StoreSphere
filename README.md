# Store Rating Platform

## Overview

Store Rating Platform is a full-stack web application that allows users to browse stores, submit ratings, and manage store-related information based on role-based access control.

The application supports three types of users:

* Admin
* Store Owner
* Normal User

The system uses JWT Authentication, PostgreSQL Database (NeonDB), Express.js Backend, React.js Frontend, and Role-Based Authorization.

---

# Features

## Authentication

* User Signup
* User Login
* JWT Token Authentication
* Protected Routes
* Forgot Password
* Change Password
* Profile Management

---

## Admin Features

### Dashboard

View platform statistics:

* Total Users
* Total Stores
* Total Ratings

### User Management

* View all users
* Search users
* Sort users
* View user details
* Create new users

### Store Management

* View all stores
* Search stores
* Sort stores
* Create new stores
* Assign stores to Store Owners

### Profile Management

* Update profile details
* Change password

---

## Store Owner Features

### Dashboard

* View assigned stores
* View average ratings

### Reviews

* View all reviews received
* Sort reviews by:

  * Rating
  * User Name
  * User Email

### My Store

* Update store information
* View average store rating

### Profile

* Update profile details
* Change password

---

## Normal User Features

### Browse Stores

* Search stores
* View average ratings
* Submit ratings
* Update ratings
* Submit reviews

### My Ratings

* View all submitted ratings
* View review history

### Profile

* Update profile details
* Change password

---

# Technology Stack

## Frontend

* React.js
* React Router DOM
* React Hook Form
* Axios
* React Toastify
* Tailwind CSS

## Backend

* Node.js
* Express.js
* JWT Authentication
* bcryptjs

## Database

* PostgreSQL
* NeonDB

---

# Why NeonDB?

The project uses NeonDB instead of a locally installed PostgreSQL database.

Advantages:

* Cloud-hosted PostgreSQL
* Free tier available
* Easy deployment
* No local database setup required
* PostgreSQL compatible
* Secure connection support
* Suitable for production deployment

Since NeonDB is fully PostgreSQL compatible, all PostgreSQL queries work without modification.

---

# Database Schema

## Users Table

Stores:

* User Name
* Email
* Address
* Password Hash
* Role

Roles:

* ADMIN
* STORE_OWNER
* NORMAL_USER

---

## Stores Table

Stores:

* Store Name
* Store Email
* Store Address
* Owner ID

---

## Ratings Table

Stores:

* User ID
* Store ID
* Rating
* Review Text

Each user can rate a store and update their rating later.

---

# Admin Credentials

Default Admin Account:

Email:

[admin@platform.com](mailto:admin@platform.com)

Password:

Admin@123

Reason:

The admin account is pre-created so that evaluators can immediately access administrative functionality without first creating an admin user.

---

# Forgot Password Design Decision

A traditional email-based password reset was intentionally not implemented.

Reason:

Email-based reset requires:

* SMTP configuration
* App Passwords
* Third-party email services
* Additional environment secrets

For academic evaluation and security reasons:

* No email credentials are stored in source code.
* No Gmail App Passwords are committed to .env files.
* No external mail service dependency exists.

Instead, password reset is performed using:

* Registered Email
* Registered Full Name

This allows password recovery without exposing email credentials or external services.

---

# Environment Variables

Backend .env

```env
PORT=5000

DATABASE_URL=in .env

JWT_SECRET=in .env

OWNER_CODE=OWNER2026
```

OWNER_CODE is required when registering a Store Owner account.

---

# Installation Guide

# Backend Setup

Navigate to backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Run backend:

```bash
npm run dev
```

Backend runs on:

```text
http://localhost:5000
```

---

# Frontend Setup

Navigate to frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Run frontend:

```bash
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

# API Modules

Authentication:

```text
/api/auth/*
```

Admin:

```text
/api/admin/*
```

Normal User:

```text
/api/user/*
```

Store Owner:

```text
/api/owner/*
```

---

# Security Features

* Password Hashing using bcrypt
* JWT Authentication
* Protected Routes
* Role-Based Authorization
* Server-side Validation
* Email Uniqueness Validation
* Owner Code Validation
* Input Validation

---

# Project Workflow

## Admin

Creates and manages:

* Users
* Store Owners
* Stores

Assigns stores to Store Owners.

---

## Store Owner

Manages:

* Assigned Store
* Reviews
* Store Information

---

## Normal User

Can:

* Browse stores
* Submit ratings
* Update ratings
* Submit reviews
* View rating history

---

# Important Notes for Evaluators

## Development Environment Notice

This project is configured to use a cloud-hosted PostgreSQL database through NeonDB's free-tier environment.

During evaluation, if the application remains inactive for an extended period, the database connection may take a few seconds to become responsive again due to automatic resource optimization and idle connection management performed by the cloud database provider.

If this occurs:

1. Refresh the application.
2. Retry the previous action.
3. Ensure both frontend and backend development servers are running.

This behavior is related to the free-tier cloud database environment and does not affect the application's functionality or database integrity.

For production deployment, a dedicated always-on database instance is recommended.

---

## Testing Recommendation

For the best evaluation experience:

1. Start the backend server using:

```bash
npm run dev
```

2. Start the frontend server using:

```bash
npm run dev
```

3. Login using the provided Admin credentials.

4. Test the workflow in the following order:

* Admin Dashboard
* User Management
* Store Management
* Store Owner Dashboard
* Store Reviews
* User Store Browsing
* Rating Submission
* Rating Update
* Profile Management

This sequence demonstrates all major functionalities of the platform.

---

# Future Enhancements

* Email-based OTP Verification
* SMS Verification
* Store Images
* Advanced Analytics Dashboard
* Pagination
* Notifications
* WhatsApp Reminders
* Deployment on Vercel + Render
* Audit Logs
* Rating Trends and Insights

---

# Developed By

Nachiket Nikam

B.Tech Artificial Intelligence & Data Science from Dr. D.Y.Patil School of Science and Technology, Tathawade

Store Rating Platform Submission Project
