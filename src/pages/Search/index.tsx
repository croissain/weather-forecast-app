import Card from '@components/Card';
import Icon from '@components/Icon';
import { Typography } from '@components/Typography';
import { ROUTE_PATHS } from '@constants';
import { useClickOutside } from '@hooks/useClickoutside';
import Flex from '@layouts/Flex';
import { TLocation, useLocation } from '@providers/LocationProvider';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import s from './style.module.scss';

const LOCAL_STORAGE_KEY = 'weather_search_history';

const Search = () => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<TLocation[]>([]);
  const [searchFailed, setSearchFailed] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [history, setHistory] = useState<TLocation[]>([]);
  const { setLocation } = useLocation();
  const navigate = useNavigate();

  useClickOutside(dropdownRef, () => setShowDropdown(false));

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
      setShowDropdown(true);
      setSearchFailed(data.length === 0);
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setSearchFailed(false);
    setSuggestions([]);
    setShowDropdown(true);
  };

  return (
    <div className={s.search}>
      <div className={s.search_wrapper} ref={dropdownRef}>
        <Flex className={s.search_inputWrapper}>
          <input
            value={query}
            onChange={handleChange}
            placeholder="Search country or city here..."
            className={s.search_input}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSearch();
            }}
          />
          <button
            type="button"
            onClick={handleSearch}
            className={s.search_button}
          >
            <Typography color="white">Search</Typography>
          </button>
        </Flex>
        {searchFailed && (
          <Typography color="error" className={s.search_error}>
            Invalid country or city
          </Typography>
        )}

        {/* Suggestions */}
        {showDropdown && suggestions.length !== 0 && (
          <ul className={s.search_dropdown}>
            {suggestions.map((item) => (
              <li
                className={s.search_dropdown_item}
                key={`${item.name}_${item.lat}_${item.lon}`}
                onClick={() => handleSelect(item)}
                style={{ cursor: 'pointer' }}
              >
                {item.name}, {item.state ? `${item.state}, ` : ''}
                {item.country}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Search History */}
      {history.length > 0 && (
        <>
          <Typography
            variant="body"
            weight={600}
            className={s.search_history_label}
          >
            Search History
          </Typography>
          <Card>
            <ul>
              {history.map((item, idx) => (
                <Flex
                  as="li"
                  justify="between"
                  align="center"
                  key={`${item.name}_${item.lat}_${item.lon}`}
                  onClick={() => handleSelect(item)}
                  className={s.search_history_item}
                >
                  <Typography>
                    {item.name}, {item.country}
                  </Typography>
                  <button
                    className={s.search_history_delete}
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleDeleteHistory(idx);
                    }}
                  >
                    <Icon name="trash" className={s.search_icon} />
                  </button>
                </Flex>
              ))}
            </ul>
          </Card>
        </>
      )}
    </div>
  );
};

export default Search;
