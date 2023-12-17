import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CountryTable from './CountryTable';
import Search from './Search';

function Home() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]); // Separate state for filtered countries
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
      .then((response) => {
        setLoading(false);
        setCountries(response.data);
        setFilteredCountries(response.data); // Initialize filteredCountries with all countries
        setError('');
      })
      .catch((error) => {
        setLoading(false);
        setCountries([]);
        setFilteredCountries([]);
        setError("Something went wrong");
      });
  }, []);

  // Search function for countries
  const handleSearch = (searchTerm) => {
    if (searchTerm.trim() === '') {
      setFilteredCountries(countries); // Reset to all countries when search term is empty
    } else {
      const filteredCountries = countries.filter((country) =>
        country.name.official.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCountries(filteredCountries);
    }
  };

  // Sort functions by country name
  const handleSort = () => {
        const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
        setSortOrder(newOrder);
        const sortedCountries = [...filteredCountries].sort((a, b) => {
        const nameA = a.name.official.toLowerCase();
        const nameB = b.name.official.toLowerCase();

        if (newOrder === 'asc') {
            return nameA.localeCompare(nameB);
        } else {
            return nameB.localeCompare(nameA);
        }
        });
        setFilteredCountries(sortedCountries);
    };

  return (
    <div>
        <h1 className="Header" onClick={() => setFilteredCountries(countries)}>Countries Catalog</h1>
        <Search onSearch={handleSearch} />
        <button onClick={handleSort}>Sort by Name ({sortOrder === 'asc' ? 'Asc' : 'Desc'})</button>
        <CountryTable loading={loading} error={error} countries={filteredCountries} />
    </div>
  );
}

export default Home;
