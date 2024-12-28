import React from 'react';

export const SearchBar = ({ onSearch }) => {
  return (
    <div className='search-bar'>
      <input
        type="text"
        placeholder="Buscar libro por título..."
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
};