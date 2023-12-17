import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CountryTable from './CountryTable';
import Search from './Search';
import './Modal.css';
import './Home.css'

function Home() {
    const rowsPerPage = 25;
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [countries, setCountries] = useState([]);
    const [filteredCountries, setFilteredCountries] = useState([]); // Separate state for filtered countries
    const [sortOrder, setSortOrder] = useState('asc');
    const [currentPage, setCurrentPage] = useState(1);
    

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
            setCurrentPage(1); // Reset to the first page when performing a new search
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

    // Calculate pagination
    const indexOfLastCountry = currentPage * rowsPerPage;
    const indexOfFirstCountry = indexOfLastCountry - rowsPerPage;
    const currentCountries = filteredCountries.slice(indexOfFirstCountry, indexOfLastCountry);
    const totalCountries = filteredCountries.length;
    const totalPages = Math.ceil(totalCountries / rowsPerPage);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);


    return (
        <div>
            <header>
                <h1 className="header" onClick={() => {setFilteredCountries(countries); setCurrentPage(1)}}>Countries Catalog</h1>
                <div className='topPage'>
                    <Search onSearch={handleSearch} />
                    <button className='sortButton' onClick={handleSort}>
                        Sort by Name ({sortOrder === 'asc' ? 'Asc' : 'Desc'})
                    </button>
                </div>
            </header>

            <CountryTable loading={loading} error={error} countries={currentCountries} />

            <div className='buttonPage'>
                <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
                    Previous
                </button>
                <span>{`Page ${currentPage} of ${totalPages}`}</span>
                <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
                    Next
                </button>
            </div>
        </div>
    );
}

export default Home;
