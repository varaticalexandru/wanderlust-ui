export const backend_api = {
    base_uri: "http://localhost:8000/api",
    auth_uri: "http://localhost:8000/auth",
}

export const environment = {
    production: false,
    amadeus: {
        api_key: '',
        api_secret: '',
        auth_uri: 'https://test.api.amadeus.com/v1/security/oauth2/token',  // returns bearer access token 
        search_destination_uri: 'https://test.api.amadeus.com/v1/reference-data/locations/cities', // returns list of cities based on search term (autocompletion)
        popular_destinations_uri: 'https://test.api.amadeus.com/v1/travel/analytics/air-traffic/traveled', // returns list of popular destinations
        airport_search_uri: 'https://test.api.amadeus.com/v1/reference-data/locations', // returns airport details based on its IATA code
    },
    pixabay: {
        api_key: '',
        fetch_media_url: `${backend_api.base_uri}/pixabay/media`
    },
    staticResources: {
        country_codes_path: 'assets\\files\\ISO_3166-1_alpha-2_country_codes.csv' // path to country codes (mapping) file
    },
    googleMaps: {
        api_key: '',
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
        user_uri: `${backend_api.auth_uri}/user`,

    }
};