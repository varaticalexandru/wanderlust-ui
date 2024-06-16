export interface PlacePhotoUriResponse {
  photoUri: string;
}

export interface PlacePhotosResponse {
  photos: Array<PlacePhoto>;
}

export interface PlacePhoto {
  name: string;
}
