export interface Location {
  id: string;
  name: string;
  address: string;
  hours: string;
  phone: string;
  mapsUrl: string;
  image: string;
}

export const locations: Location[] = [
  {
    id: 'koramangala',
    name: 'Koramangala (The Original)',
    address: '3, 8th Main road, Koramangala 4th Block, Bengaluru - 560034',
    hours: '8:00 AM – 9:00 PM',
    phone: '+91 80 4094 9490',
    mapsUrl: 'https://www.google.com/maps/search/The+Hole+In+The+Wall+Cafe+Koramangala+Bengaluru',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80'
  },
  {
    id: 'indiranagar',
    name: 'Indiranagar Branch',
    address: '12th Main Rd, HAL 2nd Stage, Indiranagar, Bengaluru',
    hours: '8:00 AM – 10:00 PM',
    phone: '+91 91234 56789',
    mapsUrl: 'https://www.google.com/maps/search/The+Hole+In+The+Wall+Cafe+Indiranagar+Bengaluru',
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80'
  },
  {
    id: 'kammanahalli',
    name: 'Kammanahalli Branch',
    address: 'Kalyan Nagar, Kammanahalli Main Rd, Bengaluru',
    hours: '8:30 AM – 9:00 PM',
    phone: '+91 99456 92562',
    mapsUrl: 'https://www.google.com/maps/search/The+Hole+In+The+Wall+Cafe+Kammanahalli+Bengaluru',
    image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80'
  },
  {
    id: 'hyderabad',
    name: 'Hyderabad (Jubilee Hills)',
    address: 'Road No. 45, Jubilee Hills, Hyderabad',
    hours: '8:00 AM – 10:30 PM',
    phone: '+91 40 1234 5678',
    mapsUrl: 'https://www.google.com/maps/search/The+Hole+In+The+Wall+Cafe+Jubilee+Hills+Hyderabad',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80'
  }
];
