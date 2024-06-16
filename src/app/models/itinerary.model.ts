export interface Itinerary {
  id?: string;
  placeId?: string;
  name?: string;
  companion?: string;
  children?: boolean;
  pets?: boolean;
  budget?: string;
  cityName: string;
  countryName: string;
  latitude: number;
  longitude: number;
  tripLength: number;
  startDate: string;
  endDate: string;
  dailyRecommendationsNumber: number;
  summary: string;
  schedule: Array<DailyPlan>;
}

export interface ItineraryList {
  itineraries: Array<Itinerary>
}

export interface DailyPlan {
  day: number;
  description: string;
  recommendations: Array<Recommendation>;
  color?: string;
}

export interface Recommendation {
  id: string;
  name: string;
  description: string;
  location: Location;
  content?: any;
}

export interface Location {
  latitude: number;
  longitude: number;
}

export interface InterestSelection {
  ordinal: number;
  selectedOptions: Array<string>;
}