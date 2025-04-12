import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

export type TLocation = {
  name: string;
  country: string;
  lat: number;
  lon: number;
  state?: string;
};

interface LocationProviderProps {
  children: React.ReactNode;
}
type LocationContextType = {
  location: TLocation | null;
  setLocation: React.Dispatch<React.SetStateAction<TLocation | null>>;
};

const LocationContext = createContext<LocationContextType | undefined>(
  undefined,
);

export const LocationProvider = ({ children }: LocationProviderProps) => {
  const [location, setLocation] = useState<TLocation | null>(null);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const res = await fetch(
            `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${process.env.OPEN_WEATHER_API_KEY}`,
          );
          const data = await res.json();
          if (data?.[0]) {
            const loc = {
              name: data[0].name,
              country: data[0].country,
              lat: data[0].lat,
              lon: data[0].lon,
            };
            setLocation(loc);
          }
        } catch (err) {
          console.error('Failed to fetch location name:', err);
        }
      },
      (err) => {
        console.warn('Geolocation permission denied.', err);
      },
    );
  }, []);
  const value = useMemo(() => ({ location, setLocation }), [location]);

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};
