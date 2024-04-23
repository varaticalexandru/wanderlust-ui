export interface PopularDestinations {
    meta: {
        count: number;
        links: {
            self: string;
        };
    },
    data: {
        type: string;
        destination: string
        subType: string;
        analytics: {
            flights: {
                score: number;
            },
            travelers: {
                score: number;
            }
        };
    }[];
}