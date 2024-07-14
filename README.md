# CommerceCraft

## Overview

This Fullstack E-Commerce Project is a comprehensive web application that allows users to search for products using images, leveraging the ResNet50 model with PyTorch. The project features a robust backend built with Django Rest Framework, a PostgreSQL database, and a modern frontend developed with Next.js and Redux Toolkit. This application offers a seamless shopping experience with efficient image-based product search capabilities.

## Features

- [x]**Image-Based Search**: Users can upload images to search for products using a ResNet50 model.
- [x]**User Authentication**: Secure user registration and login functionality.
- [x]**Product Management**: Admin can add, update, and delete products.
- [x]**Shopping Cart**: Users can add products to their cart and proceed to checkout.
- [x]**Order Management**: Track orders and view order history.
- [x]**Responsive Design**: Optimized for both desktop and mobile devices.

## Technologies Used

- **Backend**: Django Rest Framework
- **Database**: PostgreSQL
- **Machine Learning**: ResNet50 model with PyTorch
- **Frontend**: Next.js, Redux Toolkit

## Installation

### Prerequisites

- Python 3.x
- Node.js
- PostgreSQL
- Git
- venv

### Backend Setup

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/hasnainAli22/fullstack-ecom.git
   cd fullstack-ecom/backend
   ```

2. **Create and Activate Virtual Environment**:

   ```bash
   python3 -m venv venv
   .\venv\Scripts\activate
   ```

3. **Build .env from env.example**

4. **Install Dependencies**:

   ```bash
   pip install -r requirements.txt
   ```

5. **Setup Database**:

   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

6. **Create Superuser**:

   ```bash
   python manage.py createsuperuser
   ```

### Frontend Setup

1. **Navigate to Frontend Directory**:

   ```bash
   cd ./frontend
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Run Development Server**:

   ```bash
   npm run dev
   ```

4. **Access the Application:**:
   Open your web browser and go to <http://localhost:3000>

## Usage

### Image-Based Search

1. Access the application at <http://localhost:3000>.
2. Use the search bar to upload an image and search for products.
3. Browse the search results and view product details.

### Admin Panel

1. Access the admin panel at <http://127.0.0.1:8000/admin>.
2. Use the admin credentials created during the createsuperuser step to log in.
3. Manage products, orders, and users.
