import { ROUTE_PATHS } from '@constants';
import { TLocation, useLocation } from '@providers/LocationProvider';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LOCAL_STORAGE_KEY = 'weather_search_history';

const Search = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<TLocation[]>([]);
  const [history, setHistory] = useState<TLocation[]>([]);
  const { setLocation } = useLocation();
  const navigate = useNavigate();

  // Load history on mount
  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      setHistory(JSON.parse(stored));
    }
  }, []);

  const updateHistory = (newItem: TLocation) => {
    const exists = history.find(
      (h) => h.name === newItem.name && h.country === newItem.country,
    );
    if (!exists) {
      const updated = [newItem, ...history].slice(0, 10); // max 10 items
      setHistory(updated);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    }
  };

  const handleSearch = async () => {
    if (!query.trim()) return;
    try {
      const res = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${process.env.OPEN_WEATHER_API_KEY}`,
      );
      const data = await res.json();
      setSuggestions(data);
    } catch (err) {
      console.error('Search failed:', err);
    }
  };

  const handleSelect = (loc: TLocation) => {
    const selected = {
      name: loc.name,
      country: loc.country,
      lat: loc.lat,
      lon: loc.lon,
    };
    setLocation(selected);
    updateHistory(selected);
    navigate(ROUTE_PATHS.HOME);
  };

  const handleDeleteHistory = (index: number) => {
    const updated = [...history];
    updated.splice(index, 1);
    setHistory(updated);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  };

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search city"
      />
      <button type="button" onClick={handleSearch}>
        Search
      </button>

      {/* Suggestions */}
      <ul>
        {suggestions.map((item) => (
          <li
            key={`${item.name}_${item.lat}_${item.lon}`}
            onClick={() => handleSelect(item)}
            style={{ cursor: 'pointer' }}
          >
            {item.name}, {item.state ? `${item.state}, ` : ''}
            {item.country}
          </li>
        ))}
      </ul>

      {/* Search History */}
      {history.length > 0 && (
        <>
          <h3>Search History</h3>
          <ul>
            {history.map((item, idx) => (
              <li key={`${item.name}_${item.lat}_${item.lon}`}>
                <span
                  onClick={() => handleSelect(item)}
                  style={{ cursor: 'pointer', marginRight: 10 }}
                >
                  {item.name}, {item.country}
                </span>
                <button type="button" onClick={() => handleDeleteHistory(idx)}>
                  ❌
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Search;
