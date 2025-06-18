# VerifiNet

A fact-checking and crisis mapping platform built with the MERN stack (MongoDB, Express.js, React.js, Node.js).

## Features

- User Authentication
- Crisis Mapping
- Tip Submission
- Fact Verification
- Historical Data
- Analytics Dashboard
- Journalist Management

## Project Structure

```
verifinet/
├── client/                 # React frontend
│   ├── public/
│   └── src/
│       ├── components/     # React components
│       ├── context/       # React context
│       ├── hooks/         # Custom hooks
│       └── utils/         # Utility functions
├── server/                # Node.js backend
│   ├── config/           # Configuration files
│   ├── middleware/       # Express middleware
│   ├── models/          # Mongoose models
│   ├── routes/          # API routes
│   └── uploads/         # File uploads
└── package.json
```

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/verifinet.git
cd verifinet
```

2. Install server dependencies:
```bash
npm install
```

3. Install client dependencies:
```bash
cd client
npm install
```

4. Create a .env file in the root directory:
```
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=5000
```

## Running the Application

1. Start the server (development):
```bash
npm run server
```

2. Start the client (in a new terminal):
```bash
cd client
npm start
```

3. For production:
```bash
npm run build  # Build the client
npm start     # Start the production server
```

## API Endpoints

### Public Routes
- POST `/api/auth/register` - Register a new user
- POST `/api/auth/login` - Login user

### Protected Routes
- GET `/api/dashboard/stats` - Get dashboard statistics
- GET `/api/crisis/incidents` - Get crisis incidents
- POST `/api/crisis/incidents` - Submit new incident
- GET `/api/verification/pending` - Get pending verifications
- POST `/api/verification/:id` - Submit verification
- GET `/api/verification/history` - Get verification history

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 