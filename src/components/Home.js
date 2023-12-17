import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CountryTable from './CountryTable';
import Search from './Search';

function Home() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]); // Separate state for filtered countries

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

  return (
    <div>
        <h1>Countries Catalog</h1>
        <Search onSearch={handleSearch} />
        <CountryTable loading={loading} error={error} countries={filteredCountries} />
    </div>
  );
}

export default Home;
