import { Period } from "./period.model";
import { Destination } from "./user-destination.model";

export interface Preferences {
    destination?: Destination,
    period?: Period,
    companion?: string,
    pets?: boolean,
    children?: boolean,
    interests?: any
}