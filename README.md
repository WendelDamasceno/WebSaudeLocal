# Health App

## Overview
The Health App is a comprehensive application designed to assist users in managing their health-related needs. It provides functionalities for user registration, login, and access to various health services, including hospitals, clinics, and emergency services. The app integrates with external APIs to deliver real-time information and offers features such as telemedicine, medication availability checks, and community support.

## Features
- **User Authentication**: Users can log in, register, or continue without an account for limited access.
- **Health Condition Tracking**: Users can register with their health conditions, age, name, and email.
- **API Integration**: Connects to a free API to search for hospitals, clinics, fire departments, and police stations based on user location.
- **Custom Filters**: Users can filter health units by medical specialty, estimated wait times, and community ratings.
- **Service Ratings**: Users can rate services based on quality of care, cleanliness, and overall experience.
- **Emergency Button**: Quick access to call emergency services like ambulances and fire departments.
- **Medication Availability**: Users can check the availability of essential medications at local pharmacies and health units.
- **Telemedicine Integration**: Connects users to teleconsultation services for non-urgent cases.
- **Smart Notifications**: Users receive notifications about new clinics, wait time changes, and vaccination campaigns.
- **History and Favorites**: Users can save frequently visited locations for quick access.
- **Community Chat**: A forum for users to share information and experiences regarding health services.

## Project Structure
```
health-app
├── backend
│   ├── src
│   │   ├── controllers
│   │   ├── models
│   │   ├── routes
│   │   ├── services
│   │   └── app.js
│   ├── package.json
│   ├── .env
│   └── README.md
├── frontend
│   ├── public
│   ├── src
│   │   ├── components
│   │   ├── services
│   │   ├── App.js
│   │   ├── index.js
│   │   └── App.css
│   ├── package.json
│   └── README.md
├── database
│   ├── migrations
│   ├── seeders
│   ├── config.js
│   └── README.md
└── README.md
```

## Getting Started

### Prerequisites
- Node.js
- npm
- MongoDB (or any other database of your choice)

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd health-app
   ```

2. Set up the backend:
   - Navigate to the `backend` directory:
     ```
     cd backend
     ```
   - Install dependencies:
     ```
     npm install
     ```
   - Create a `.env` file and configure your environment variables.

3. Set up the frontend:
   - Navigate to the `frontend` directory:
     ```
     cd ../frontend
     ```
   - Install dependencies:
     ```
     npm install
     ```

4. Set up the database:
   - Navigate to the `database` directory and follow the instructions in the README.md for migrations and seeders.

### Running the Application

- Start the backend server:
  ```
  cd backend
  npm start
  ```

- Start the frontend application:
  ```
  cd frontend
  npm start
  ```

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any suggestions or improvements.

## License
This project is licensed under the MIT License - see the LICENSE file for details.