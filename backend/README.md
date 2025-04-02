# Health App Backend

This is the backend for the Health App, built using Node.js and Express. The backend provides RESTful APIs for user management and integrates with external services to provide health-related information.

## Features

- User Authentication: Login and registration functionality for users.
- Health Data Management: Users can provide their health conditions, age, name, and email during registration.
- API Integration: Connects to external APIs to search for hospitals, clinics, and emergency services based on user location.
- User Ratings: Users can rate services based on quality of care, cleanliness, and overall experience.
- Emergency Services: Quick access to call emergency services directly from the app.
- Medicine Availability: Check the availability of essential medications at local pharmacies and health units.
- Telemedicine Integration: Connect users to telemedicine services for non-urgent cases.
- Notifications: Users receive updates about new clinics, changes in wait times, and vaccination campaigns.
- Favorites and History: Users can save frequently visited locations for quick access.
- Community Chat: A forum for users to share information and experiences regarding healthcare services.

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/health-app.git
   ```

2. Navigate to the backend directory:
   ```
   cd health-app/backend
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Create a `.env` file in the backend directory and configure your environment variables.

5. Start the server:
   ```
   npm start
   ```

## API Endpoints

- `POST /api/users/login`: Authenticate a user.
- `POST /api/users/register`: Register a new user.
- `GET /api/users/:id`: Fetch user data.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.