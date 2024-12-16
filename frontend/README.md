Full-Stack Note-Taking Application
This is a full-stack note-taking application built with ReactJS (TypeScript) for the front-end and Node.js (TypeScript) with Express for the back-end. The application allows users to sign up using their email and OTP, create and delete notes, and store data securely using JWT authentication.

Features
User sign-up with email and OTP
JWT-based authentication for secure access
Ability to create and delete notes
Mobile-friendly design
Error handling for invalid inputs, OTP issues, and API failures
Technologies Used
Front-end: ReactJS (TypeScript), Axios, CSS
Back-end: Node.js (Express), TypeScript, JWT, MongoDB
Database: MongoDB
Version Control: Git
Requirements
Node.js (v14.x or later)
MongoDB (or MySQL/PostgreSQL for production)
A code editor (VS Code recommended)
Setup Instructions
1. Clone the Repository
Clone this repository to your local machine:


cd notes-app
2. Set Up the Backend
Install Dependencies:
Navigate to the server directory and install the backend dependencies:


cd app
npm install
Create a .env file in the server directory:
The .env file should contain the following environment variables:

env
MONGODB_URI=mongodb://localhost:27017/notes-app
JWT_SECRET=your_jwt_secret
PORT=5000
OPT_SECRET
Start the Backend Server:
Run the server using the following command:


npm start
The back-end server will start at http://localhost:5000.

3. Set Up the Frontend
Install Dependencies:
Navigate to the client directory and install the front-end dependencies:


cd client
npm install
Configure Axios:
Ensure the front-end is pointing to the correct back-end URL (update Axios defaults if needed). If running locally, Axios should be configured to connect to http://localhost:5000.

Start the Frontend Server:
Run the following command to start the front-end:


npm start
The front-end application will start at http://localhost:3000.

4. Testing
Sign-in: Enter your email, receive an OTP, and complete the sign-in process.
Login: After signing up, log in using the same email and OTP.
Create and Delete Notes: Once logged in, you will be able to create new notes and delete existing ones.
5. Deploying
Backend: Deploy the back-end to a cloud service such as render.
Frontend: Deploy the front-end to Vercel or any other static hosting provider.
File Structure
Frontend


User Authentication
POST /api/auth/signup - Sign up a new user with email and OTP.
POST /api/auth/login - Log in with OTP.
POST /api/auth/verify - Verify OTP sent to the email.
Notes
POST /api/notes - Create a new note (protected route).
GET /api/notes - Retrieve all notes for a user (protected route).
DELETE /api/notes/:id - Delete a note (protected route).