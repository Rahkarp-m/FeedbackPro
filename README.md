# Feedback Platform Backend

## Project Description
This project serves as the backend for the Feedback Platform, providing functionalities such as Google OAuth authentication and integration with Frill.co for feedback management.

## Installation
1. Clone the repository.
2. Navigate to the backend directory.
3. Run npm install to install dependencies.

## Usage
- Start the server with npm start or npm run dev for development mode.

## API Endpoints
The backend handles various routes for authentication and feedback operations. Refer to the source code for detailed endpoint information.

## Dependencies
- Express
- Mongoose
- Passport
- Axios
- dotenv

## Environment Variables
The following environment variables are used in the project:
- PORT: The port number for the server.
- MONGODB_URI: MongoDB connection string.
- GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET: Credentials for Google OAuth.
- SESSION_SECRET: Secret key for session management.
- FRILL_WEBHOOK_SECRET and FRILL_WEBHOOK_URL: Credentials for Frill.co integration.
