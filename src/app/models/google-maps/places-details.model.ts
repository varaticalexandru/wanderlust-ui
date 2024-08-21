
export interface PlacesDetailsRequest {
    textQuery: string,
    pageSize: number
};

export interface PlaceDetailsResponse {
    places: Array<Place>
} 

export interface Place {
    id: string,
    location: {
        latitude: number,
        longitude: number
    },
    displayName: {
        text: string
    },
    photos: Array<Photo>
};

export interface Photo {
    name: string;
}