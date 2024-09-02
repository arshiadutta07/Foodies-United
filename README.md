Prerequisites:
Node.js (Version 14.x or later recommended)
npm (Node Package Manager, comes with Node.js)
Git (for version control)

Clone the Repository: git clone https://github.com/arshiadutta07/Foodies-United.git 
cd FOODIES UNITED

# Setting Up BackEnd
1. cd BackEnd
2. Install Dependencies: npm install
3. Create Database: Create Database in MySQL server first.
4. Create .env file inside BackEnd folder.
5. Configure the .env File: Inside the .env file, add environment variables in the following format -
JWT_SECRET_KEY="your_strong_secret_key"
GOOGLE_CLIENT_ID="your_google_client_id"
GOOGLE_CLIENT_SECRET=your_google_client_secret 
SESSION_SECRET = "your_passport_session_secret"
DATABASE_NAME = "your_database_name"
DATABASE_USERNAME = "your_database_username"
DATABASE_PASSWORD = "your_database_password"
6. Start Project: npm start

# Setting Up FrontEnd
1. cd frontend
2. npm install
3. Start Project: npm start
