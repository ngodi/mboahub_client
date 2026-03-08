import React, { useState, useEffect, useRef } from 'react';
import { locationSearchStyle as s } from './style';

const LocationSearch = ({ setCity, setStreet, setCountry, setCoordinates }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const debounceRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const search = async (value) => {
    if (value.length < 3) {
      setSuggestions([]);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(
        `https://photon.komoot.io/api/?q=${encodeURIComponent(value)}&limit=5&lang=en`,
      );
      const data = await res.json();
      setSuggestions(data.features || []);
      setShowDropdown(true);
    } catch {
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => search(value), 400);
  };

  const handleSelect = (feature) => {
    const props = feature.properties;
    const [lng, lat] = feature.geometry.coordinates;

    const parts = [
      props.name,
      props.street,
      props.city || props.town || props.village,
      props.country,
    ].filter(Boolean);

    const fullAddress = parts.join(', ');

    setQuery(fullAddress);
    setCity(props.city || props.town || props.village);
    setStreet(fullAddress);
    setCountry(props.country);
    setCoordinates({ lat, lng });
    setShowDropdown(false);
    setSuggestions([]);
  };

  const formatSuggestion = (feature) => {
    const p = feature.properties;
    const primary = p.name || p.street || p.city || '';
    const secondary = [p.city || p.town, p.state, p.country]
      .filter(Boolean)
      .join(', ');
    return { primary, secondary };
  };

  return (
    <div ref={wrapperRef} style={s.wrapper}>
      <label style={s.label}>Search Location</label>
      <div style={s.inputWrap}>
        <input
          type='text'
          value={query}
          onChange={handleInputChange}
          onFocus={() => suggestions.length > 0 && setShowDropdown(true)}
          placeholder='Search street, city or area...'
          style={s.input}
          autoComplete='off'
        />
        {loading && <span style={s.spinner}>⟳</span>}
      </div>

      {showDropdown && suggestions.length > 0 && (
        <ul style={s.dropdown}>
          {suggestions.map((feature, i) => {
            const { primary, secondary } = formatSuggestion(feature);
            return (
              <li
                key={i}
                style={s.suggestion}
                onMouseDown={() => handleSelect(feature)}
              >
                <span style={s.suggestionPrimary}>📍 {primary}</span>
                {secondary && (
                  <span style={s.suggestionSecondary}>{secondary}</span>
                )}
              </li>
            );
          })}
        </ul>
      )}

      {showDropdown &&
        query.length >= 3 &&
        suggestions.length === 0 &&
        !loading && <div style={s.noResults}>No locations found</div>}
    </div>
  );
};

export default LocationSearch;
