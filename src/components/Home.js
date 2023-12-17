import React, { useState, useEffect } from 'react';
import axios from 'axios';


function Home() {

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [countries, setCountries] = useState({})

    useEffect(() => {
        axios.get('https://restcountries.com/v3.1/all')
            .then((response) => {
                setLoading(false)
                setCountries(response.data)
                setError('')
            })
            .catch((error) => {
                setLoading(false)
                setCountries({})
                setError("Something went wrong")
            })
    }, [])

    

    console.log(countries)
    return ( 
        <div>
            {loading ? 'Loading...' : (
                <tbody>
                    {countries.map((country) => {
                        return (
                            <tr key={country.cca2}>
                                <td>
                                    <img src={country.flags.png} alt="Flag" width="32" />
                                </td>
                                <td>{country.name.official}</td>
                                <td>{country.cca2}</td>
                                <td>{country.cca3}</td>
                            </tr>
                        );
                    })}
                </tbody>
                )}
            {error ? error : null}
        </div>
     );
}

export default Home;