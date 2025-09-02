Civic Issue Tracker
A web-based platform designed to bridge the gap between citizens and municipal authorities for reporting and resolving local civic issues like potholes, broken streetlights, and overflowing trash bins.

This project allows citizens to submit reports through a simple web interface, and provides a dashboard for municipal staff to view, track, and manage these issues in real-time.

Tech Stack
Frontend (Citizen Portal): HTML, CSS, JavaScript

Frontend (Admin Dashboard): React.js

Backend: Node.js with Express.js

Database: (To be added - e.g., MongoDB, PostgreSQL, Firebase Firestore)

Image Storage: (To be added - e.g., Firebase Storage, Cloudinary)

Project Structure
The project uses a monorepo structure to keep all code in a single repository.

/
├── admin/              # React project for the Municipality Dashboard
├── client/             # HTML/CSS/JS project for the Citizen Portal
└── server/             # Node.js backend server

How to Run Locally
To get a local copy up and running, follow these simple steps.

Prerequisites
Node.js and npm installed on your machine. You can download them here.

Installation & Setup
Clone the repository:

git clone [https://github.com/your-username/civic-issue-tracker.git](https://github.com/your-username/civic-issue-tracker.git)
cd civic-issue-tracker

Set up the Backend Server:

cd server
npm install

Set up the Admin Dashboard (React App):

cd ../admin
npm install

(Note: The citizen portal in client/ requires no installation.)

Running the Application
Start the Backend Server:

Navigate to the server directory and run:

node server.js

The server will be running on http://localhost:3000.

View the Citizen Portal:

Open your browser and navigate to http://localhost:3000.

Start the Admin Dashboard:

In a new terminal, navigate to the admin directory and run:

npm start

The React development server will open the admin dashboard, typically on http://localhost:3001.