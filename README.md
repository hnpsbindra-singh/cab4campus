Campus Cab is a MERN-based web application that helps students book E-rickshaws and transport vehicles inside the university campus. The platform connects students and drivers in real-time, making short-distance travel faster, cheaper, and more reliable.

Students can request rides from one location to another, and nearby drivers get notified and may accept the booking instantly. Payment can be done either online or with cash on-spot.

Key Features
👤 Student Side

Sign-up and login with OTP email verification

Enter pickup and drop locations

Shows driver details (name + phone number) after booking

Online payment + cash on delivery support

Fixed fare per ride

🚗 Driver Side

Drivers can login and see available ride requests

Accept rides in one click

Shows booking status and passenger details

Option to accept more rides after completing one

🧰 Tech Stack
Frontend

React (Vite)

Axios

Custom CSS (no frameworks)

Hosted on Vercel / Netlify

Backend

Node.js + Express

MongoDB Atlas + Mongoose

Nodemailer for OTP service

Hosted on Vercel/Render

🛠 System Architecture

JWT-based secure authentication

Email OTP verification for new users

Modular REST APIs for authentication and ride management

Centralized MongoDB database for all user and ride records

🔐 Authentication Features

Email based OTP verification

Protected backend routes

Server-side validation for sign-up and login

Error-handled APIs

🎯 Why we built this?

Campus distances are high and walking wastes crucial time.

Saves students’ travel cost.

Helps drivers get more business inside campus.

Eliminates waiting and uncertainty.

Encourages safer and more planned transportation.

📦 Application Modules
1. Student Module

Request a ride

Select payment type

View driver details

2. Driver Module

See all pending requests

Accept and complete rides

3. Admin/Database Management

Stores all ride history

Stores student/driver data

Stores payment status

🧪 Testing Covered

Ride booking flow

OTP verification

Login and authentication

API integration

Error handling and validation

Database connection

✔ Future Enhancements

Real-time tracking with Google Maps

Wallet & UPI auto-payment

Push notifications

Ride cancellation & rating system
