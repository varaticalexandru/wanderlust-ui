export interface Airports {
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
        detailedName: string;
        id: string;
        self: {
            href: string;
            methods: string[];
        };
        iataCode: string;
        address: {
            cityName: string;
            countryName: string;
        }
    }[];
}