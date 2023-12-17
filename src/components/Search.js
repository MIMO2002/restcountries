import React, { useState } from 'react';

function Search({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value);
  };

  return (
      <input
        className='searchInput'
        type="text"
        placeholder="Search by country name"
        value={searchTerm}
        onChange={handleSearch}
      />
  );
}

export default Search;
