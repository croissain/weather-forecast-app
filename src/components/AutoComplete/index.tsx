import React, { useEffect, useRef, useState } from 'react';

import s from './style.module.scss';

type Option = {
  label: string;
  value: string;
};

interface AutoCompleteProps {
  options: Option[];
  placeholder?: string;
  onSelect?: (value: Option) => void;
}

export const AutoComplete = ({
  options,
  placeholder,
  onSelect,
}: AutoCompleteProps) => {
  const [inputValue, setInputValue] = useState('');
  const [filtered, setFiltered] = useState<Option[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (inputValue.trim()) {
      const lowerInput = inputValue.toLowerCase();
      const results = options.filter((opt) =>
        opt.label.toLowerCase().includes(lowerInput),
      );
      setFiltered(results);
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  }, [inputValue, options]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (option: Option) => {
    setInputValue(option.label);
    setShowDropdown(false);
    onSelect?.(option);
  };

  return (
    <div className={s.wrapper} ref={wrapperRef}>
      <input
        type="text"
        className={s.input}
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onFocus={() => inputValue && setShowDropdown(true)}
      />
      {showDropdown && (
        <ul className={s.dropdown}>
          {filtered.length ? (
            filtered.map((option) => (
              <li
                key={option.value}
                className={s.option}
                onClick={() => handleSelect(option)}
              >
                {option.label}
              </li>
            ))
          ) : (
            <li className={s.noResult}>No results found</li>
          )}
        </ul>
      )}
    </div>
  );
};
