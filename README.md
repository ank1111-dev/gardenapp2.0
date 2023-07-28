# Aussie Garden Wizard
Aussie Garden Wizard is a web application that helps users find suitable plants for their garden based on the weather conditions in their location and the specific climate zone. The app fetches weather details for the user's entered location and determines the climate zone based on the temperature and precipitation data. It then suggests a list of plants that thrive in the identified climate zone (For Australia Only).

## Features
1. Weather Details: Fetches weather details (temperature, humidity, precipitation, wind speed, etc.) for the entered location using the OpenWeatherMap API.
2. Climate Zone Determination: Determines the climate zone based on the temperature and precipitation data obtained from the weather details.
3. Plant Suggestions: Suggests a list of plants that are suitable for the identified climate zone. Each plant displays its name and a brief description.
4. Plant Details: When clicked on a plant name, the app displays further details of the selected plant, including ideal growing conditions, care tips, and information about pests and diseases.
5. Error Handling: Provides error messages for invalid location inputs and cases where plants are not available for the identified climate zone.

## Technologies Used
1. React.js: Front-end library for building user interfaces.
2. Material-UI v5: UI component library for styling the application.
3. React Router: For handling routing and navigation within the app.
4. Canva: For logo and images

## Installation and Setup
1. Clone the repository: git clone https://github.com/ank1111-dev/gardenapp2.0.git
2. Navigate to the project directory: cd gardenapp2.0
3. Install dependencies: npm install 
4. Obtain an API key from OpenWeatherMap (https://openweathermap.org/) and store it as an environment variable named REACT_APP_WEATHER_API_KEY in a .env file at the root of the project.
5. Obtain an API key from Plant.id (https://web.plant.id/plant-identification-api/) and store it as an environment variable named REACT_APP_PLANT_API_KEY in a .env file at the root of the project.
6. Start the development server: npm start
7. Open the app in your web browser at http://localhost:3000.

## Usage
1. Enter a valid Australian postcode or city name in the search bar to fetch weather details for the location.
2. The app will display weather information, including temperature, humidity, precipitation, wind speed, and weather conditions.
3. The app will determine the climate zone based on the weather data and suggest a list of plants suitable for that climate zone.
4. Click on a plant name to view more details about the selected plant, including its ideal growing conditions, care tips, and information about pests and diseases.
5.  If there are no plants available for the identified climate zone, the app will display an appropriate error message.
    
## Contributing
Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License
This project is licensed under the MIT License. See the LICENSE.txt file for details.
