interface Profile {
  id: string;
  name: string;
  imageId: string;
  bio: string;
  showLocation: boolean;
  location: Location
}

interface Location {
  lat: number;
  lng: number;
}
