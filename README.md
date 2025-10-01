# Chat Application

A real-time chat application built with Node.js, Express, Socket.IO, and MongoDB.

## Features

- Real-time messaging with Socket.IO
- User authentication with JWT
- Secure password hashing with bcrypt
- MongoDB database integration
- Environment variable configuration for security

## Setup Instructions

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd Chat_application
```

### 2. Install dependencies
```bash
cd backend
npm install
```

### 3. Environment Configuration
Create a `.env` file in the `backend` directory with the following variables:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/database_name?retryWrites=true&w=majority&appName=ClusterName

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=1d

# CORS Configuration
CORS_ORIGIN=*

# Socket.IO Configuration
SOCKET_CORS_ORIGIN=*
```

**Important:** Copy `env.example` to `.env` and fill in your actual values. Never commit the `.env` file to version control.

### 4. Run the application
```bash
npm start
```

The server will start on the port specified in your `.env` file (default: 3000).

## API Endpoints

### Authentication
- `POST /auth/signup` - Register a new user
- `POST /auth/signin` - Login user

### Users
- `GET /users` - Get user information (requires authentication)

## Socket.IO Events

### Client to Server
- `join_room` - Join a chat room
- `send_message` - Send a message to a room
- `typing` - Send typing indicator

### Server to Client
- `user_joined` - User joined a room
- `receive_message` - Receive a new message
- `user_typing` - User is typing indicator

## Security Features

- Environment variables for sensitive configuration
- JWT token authentication
- Password hashing with bcrypt
- CORS configuration
- Input validation and error handling

## Tech Stack

- **Backend:** Node.js, Express.js
- **Real-time:** Socket.IO
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT, bcrypt
- **Environment:** dotenv