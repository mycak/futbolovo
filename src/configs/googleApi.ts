import { generateMapIcon } from '@/utils';
import { Libraries } from '@react-google-maps/api';
import { ClustererOptions } from '@react-google-maps/marker-clusterer';

export const libraries: Libraries = ['places', 'routes', 'maps', 'marker'];

export const googleApiConfig = (lng: string) => ({
  id: `futbolovo-${lng}`,
  language: lng,
  region: 'PL',
  version: 'weekly',
  libraries,
  googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY as string,
});

export const clusterConfig: ClustererOptions = {
  gridSize: 35,
  maxZoom: 50,
  minimumClusterSize: 2,
  styles: [
    {
      url: generateMapIcon('cluster'),
      width: 45,
      height: 45,
      textColor: 'black',
      textSize: 13,
      anchorText: [1, 0],
    },
    {
      url: generateMapIcon('cluster'),
      width: 65,
      height: 65,
      textColor: 'black',
      textSize: 14,
      anchorText: [1, -1],
    },
  ],
  calculator: (markers) => {
    const clusterSize = markers.length;
    let index = 0;
    if (clusterSize > 8) {
      index = 1;
    }
    return {
      text: String(clusterSize),
      index: index + 1,
    };
  },
};

export const initialMapCords = {
  // Warsaw cords
  lat: 52.229676,
  lng: 21.012229,
};
