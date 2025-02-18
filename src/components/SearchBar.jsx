import React from 'react';
import { FaSearch } from 'react-icons/fa';

export const SearchBar = ({ onSearch }) => {
  return (
    <div className="search-container">

      <input
        type="text"
        className="search-input"
        placeholder="Buscar libro por título..."
        onChange={(e) => onSearch(e.target.value)}
      />
      <FaSearch className="search-icon" />
    </div>
  );
};