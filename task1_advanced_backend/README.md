# Advanced Authentication API

Secure authentication REST API built with Node.js, Express.js and MongoDB.

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- HTTP-only Cookies
- Helmet
- Express Rate Limit
- CORS

## Features

- User registration
- Secure password hashing
- User login
- JWT authentication
- Refresh token rotation
- HTTP-only refresh-token cookies
- Protected routes
- Profile management
- Password change
- Logout
- Role-based authorization
- Rate limiting
- Security headers
- CORS
- Centralized error handling

## Installation

npm install

## Run

npm run dev

## API

POST /api/auth/register
POST /api/auth/login
POST /api/auth/refresh
POST /api/auth/logout
GET /api/auth/me
PATCH /api/auth/profile
PATCH /api/auth/change-password
GET /api/health

## Testing

Authentication flow successfully tested:

- Register: PASS
- Login: PASS
- Current User: PASS
- Profile Update: PASS
- Refresh Token: PASS
- Logout: PASS

## Security

Passwords are hashed using bcrypt.

Access tokens use JWT.

Refresh tokens use HTTP-only cookies.

Rate limiting and Helmet security are enabled.

## Author

Aniket
