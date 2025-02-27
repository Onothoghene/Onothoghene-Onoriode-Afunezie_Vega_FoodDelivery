# Onothoghene-Onoriode-Afunezie_Vega_FoodDelivery

This repository contains the source code for the Vega Food Delivery project, which includes both the API and the frontend applications.

Introduction
Vega Food Delivery is an online food delivery platform that allows users to browse menus, place orders, and make payments. The project is divided into two main parts:

 **BACKEND API**
 The backend service that handles data storage, business logic, and communication with the frontend. API for the food delivery platform built using ASP.NET Core, AutoMapper, Entity Framework Core, Hangfire (for background job), zoho smtp to send mails, and MediatR. The API provides endpoints for users to browse restaurants, add menu items to their cart, place orders, and process payments. It follows the Onion Architecture and includes In-Memory DB for development/testing

**Features**
User Authentication & Authorization (JWT-based, Identity Management)
Restaurant Management (CRUD operations for restaurants and couriers)
Menu Item Management (CRUD operations with images)
Cart System (Add, update, and remove items)
Orders & Payments (Placing orders, updating payment status)
Background Jobs (Using Hangfire for automated tasks like updating restaurant availability)
Data Seeding (Preloaded users, menu items, restaurant, and comments)
 Access API Endpoints
Swagger UI: http://localhost:50771/swagger/index.html (after the project has been built and ran)

**Prerequisites**
.NET 7 or later
Visual Studio / VS Code

**Default Credential**
**Admins** == Email- superadmin2@gmail.com / superadmin1@gmail.com (Password- Admin@123!)
**Users** == Email -basicuser1@gmail.com / basicuser2@gmail.com / basicuser3@gmail.com" (Password- 123Pa$$word!)


**Frontend**: The user interface where users can interact with the application.

Features
User authentication and authorization
Browse and search for restaurants
Place orders and make payments
View order history and order status
Admin panel for managing restaurants and menu items


**Frontend**
Vega Food Delivery is a React-based food ordering application that allows users to browse menu items, add them to the cart, rate food items, leave comments, and manage orders efficiently.

**Features**

**Authentication System**
User Registration & Login
Email Verification
Password Reset & Forgot Password
Role-based Access Control (Admin & User)

**Food Ordering System**
View and browse food items
Add items to cart
View cart with total price calculation
Remove items from the cart

**Reviews & Ratings**
Users can leave ratings and comments for food items
Sorting food items by Category
Paginated comment display (default: 1 comment, expandable to more)

**Admin Panel**

Manage food menu items
Manage Rstaurants and Courier

**Tech Stack**

Frontend: React, React Router, Bootstrap
State Management: Context API, useState, useEffect
Backend API Calls: Axios
Authentication: JWT-based authentication with role-based access
Notifications: React Hot Toast

**Project Structure**

src/
│-- api/
│   ├── axiosInstance.js
│-- components/
│   ├── AddToCartButton.js
│   ├── CartBadge.js
│   ├── Comments.js
│   ├── CommentForm.js
│   ├── MenuItem.js
│   ├── MenuItemDetails.js
│   ├── Navbar.js
│-- context/
│   ├── AuthContext.js
│   ├── CartContext.js
│-- hooks/
│   ├── useAuth.js
│-- pages/
│   ├── Home.js
│   ├── Menu.js
│   ├── Cart.js
│   ├── Login.js
│   ├── Registration.js
│-- services/
│   ├── AuthService.js
│   ├── CartService.js
│   ├── CommentService.js
│-- utils/
│   ├── ProtectedRoute.js
│   ├── ErrorBoundary.js
│-- App.js
│-- index.js


**API Endpoints**

Authentication
POST ==== /api/v1/Account/authenticate ==== Login User
POST === /api/v1/Account/register === Register User
POST === /api/v1/Account/forgot-password === Request Password Reset
POST === /api/v1/Account/reset-password === Reset Password
POST === /api/v1/Account/verify === Verify OTP

 **Menu Items**
GET === /api/v1/MenuItem === Fetch all menu items
GET === /api/v1/MenuItem/{id} === Get details of a menu item
POST === /api/v1/MenuItem === Create a new menu item (Admin)
PUT === /api/v1/MenuItem/{id} === Update menu item (Admin)
DELETE === /api/v1/MenuItem/{id} === Delete menu item (Admin)

**Cart**
GET === /api/v1/CartItem/user === Get cart items for logged-in user
PUT === /api/v1/CartItem/user === Add/Update cart item
DELETE === /api/v1/CartItem/{id} === Remove item from cart

 **Comments & Ratings**
GET === /api/v1/Comment/{id} === Get a single comment by ID
GET === /api/v1/Comment/menu-item/{menuItemId} === Get comments for a food item
PUT === /api/v1/Comment === Add/Update comment

