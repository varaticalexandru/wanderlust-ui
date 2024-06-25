GITHUB LINKS:
https://github.com/varaticalexandru/wanderlust-api
https://github.com/varaticalexandru/wanderlust-ui


Application README
Overview
This application is a full-stack project using Angular for the frontend and Spring Boot for the backend. The guide below provides instructions on how to set up and run the application locally for development purposes.

Prerequisites
Ensure you have the following installed on your system:

Node.js and npm
Angular CLI
Java Development Kit (JDK)
Maven
MongoDB (or access to a MongoDB instance)
Frontend Setup

Environment File
Create a file named environment.ts in the src/environments directory with the following template:

export const backend_api = {
    base_uri: "http://localhost:8000/api",
    auth_uri: "http://localhost:8000/auth",
};

export const environment = {
    production: false,
    amadeus: {
        api_key: 'YOUR_AMADEUS_API_KEY',
        api_secret: 'YOUR_AMADEUS_API_SECRET',
        auth_uri: 'https://test.api.amadeus.com/v1/security/oauth2/token', 
        search_destination_uri: 'https://test.api.amadeus.com/v1/reference-data/locations/cities', 
        popular_destinations_uri: 'https://test.api.amadeus.com/v1/travel/analytics/air-traffic/traveled',
        airport_search_uri: 'https://test.api.amadeus.com/v1/reference-data/locations',
    },
    pixabay: {
        api_key: 'YOUR_PIXABAY_API_KEY',
        fetch_media_url: `${backend_api.base_uri}/pixabay/media`
    },
    staticResources: {
        country_codes_path: 'assets\\files\\ISO_3166-1_alpha-2_country_codes.csv' 
    },
    googleMaps: {
        api_key: 'YOUR_GOOGLE_MAPS_API_KEY',
        search_text_uri: 'https://places.googleapis.com/v1/places:searchText',
        place_details_uri: 'https://places.googleapis.com/v1',
    },
    openai: {
        fetch_recommendations_uri: `${backend_api.base_uri}/recommendations`
    },
    itinerary: {
        uri: `${backend_api.base_uri}/itineraries`
    },
    auth: {
        login_uri: `${backend_api.auth_uri}/login`,
        register_uri: `${backend_api.auth_uri}/register`,
    }
};


Starting the Frontend Server
Run the following commands in the terminal:

npm install
ng serve

Backend Setup
Environment File
Create a .env file in the root directory of your backend project with the following template:

PIXABAY_API_KEY=YOUR_PIXABAY_API_KEY

OPENAI_API_KEY=YOUR_OPENAI_API_KEY
ASSISTANT_ID=YOUR_ASSISTANT_ID
THREAD_ID=YOUR_THREAD_ID

MONGO_URI=YOUR_MONGO_URI
MONGO_DB=YOUR_MONGO_DB_NAME

Starting the Backend Server
Run the following commands in the terminal:

mvn clean install
java -jar target/wanderlust.jar

The backend server will start at http://localhost:8000.

Running the Application
Ensure MongoDB is running and accessible.
Start the backend server.
Start the frontend server.
Access the application at http://localhost:4200.


Troubleshooting
Verify all environment variables are correctly set in the respective .env and environment.ts files.
Check for any error messages in the terminal and logs, and ensure all dependencies are installed.
Ensure the backend server is running before starting the frontend server to avoid API connection issues.



Application README
Overview
This application is a full-stack project using Angular for the frontend and Spring Boot for the backend. The guide below provides instructions on how to set up and run the application locally for development purposes.

Prerequisites
Ensure you have the following installed on your system:

Node.js and npm
Angular CLI
Java Development Kit (JDK)
Maven
MongoDB (or access to a MongoDB instance)
Frontend Setup
Environment File
Create a file named environment.ts in the src/environments directory with the following template:

typescript
Copy code
export const backend_api = {
    base_uri: "http://localhost:8000/api",
    auth_uri: "http://localhost:8000/auth",
};

export const environment = {
    production: false,
    amadeus: {
        api_key: 'YOUR_AMADEUS_API_KEY',
        api_secret: 'YOUR_AMADEUS_API_SECRET',
        auth_uri: 'https://test.api.amadeus.com/v1/security/oauth2/token', 
        search_destination_uri: 'https://test.api.amadeus.com/v1/reference-data/locations/cities', 
        popular_destinations_uri: 'https://test.api.amadeus.com/v1/travel/analytics/air-traffic/traveled',
        airport_search_uri: 'https://test.api.amadeus.com/v1/reference-data/locations',
    },
    pixabay: {
        api_key: 'YOUR_PIXABAY_API_KEY',
        fetch_media_url: `${backend_api.base_uri}/pixabay/media`
    },
    staticResources: {
        country_codes_path: 'assets\\files\\ISO_3166-1_alpha-2_country_codes.csv' 
    },
    googleMaps: {
        api_key: 'YOUR_GOOGLE_MAPS_API_KEY',
        search_text_uri: 'https://places.googleapis.com/v1/places:searchText',
        place_details_uri: 'https://places.googleapis.com/v1',
    },
    openai: {
        fetch_recommendations_uri: `${backend_api.base_uri}/recommendations`
    },
    itinerary: {
        uri: `${backend_api.base_uri}/itineraries`
    },
    auth: {
        login_uri: `${backend_api.auth_uri}/login`,
        register_uri: `${backend_api.auth_uri}/register`,
    }
};
Starting the Frontend Server
Run the following commands in the terminal:

bash
Copy code
cd frontend
npm install
ng serve
The frontend development server will start at http://localhost:4200.

Backend Setup
Environment File
Create a .env file in the root directory of your backend project with the following template:

plaintext
Copy code
PIXABAY_API_KEY=YOUR_PIXABAY_API_KEY

OPENAI_API_KEY=YOUR_OPENAI_API_KEY
ASSISTANT_ID=YOUR_ASSISTANT_ID
THREAD_ID=YOUR_THREAD_ID

MONGO_URI=YOUR_MONGO_URI
MONGO_DB=YOUR_MONGO_DB_NAME
Starting the Backend Server
Run the following commands in the terminal:

bash
Copy code
cd backend
mvn clean install
java -jar target/your-backend-app.jar
Replace your-backend-app.jar with the actual name of the generated jar file.

The backend server will start at http://localhost:8000.

Running the Application
Ensure MongoDB is running and accessible.
Start the backend server.
Start the frontend server.
Access the application at http://localhost:4200.
Troubleshooting
Verify all environment variables are correctly set in the respective .env and environment.ts files.
Check for any error messages in the terminal and logs, and ensure all dependencies are installed.
Ensure the backend server is running before starting the frontend server to avoid API connection issues.
Additional Notes
The application uses several third-party APIs, ensure you have valid API keys for each service and they are correctly configured in the environment files.
For production deployment, update the environment.prod.ts file and the backend environment variables accordingly.