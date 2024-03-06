export interface AmadeusDestinations {
    meta: {
        count: number;
        links: {
            self: string;
        };
    },
    data: {
        type: string;
        subType: string;
        name: string;
        iataCode: string;
        geoCode: {
            latitude: number;
            longitude: number;
        },
        address: {
            countryCode: string;
            stateCode: string;
        }
    }[];
}
