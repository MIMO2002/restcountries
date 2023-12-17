import React, { useState } from 'react';
import Modal from './Modal';

function CountryTable({countries, loading, error}) {

    const [selectedCountry, setSelectedCountry] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = (country) => {
        console.log("Selected country: " + country.name.official);
        setSelectedCountry(country);
        setIsModalOpen(true);
    };
    
    const handleCloseModal = () => {
        setSelectedCountry(null);
        setIsModalOpen(false);
    };    

    return ( 
        <div>
            {loading ? ('Loading...') : (
                <table>
                    <thead>
                        <tr>
                            <th>Flap</th>
                            <th>Country Name</th>
                            <th>CCA2</th>
                            <th>CCA3</th>
                            <th>Native Name</th>
                            <th>Alternative Name </th>
                            <th>Calling Codes</th>
                        </tr>
                    </thead>

                    <tbody>
                        {countries.map((country) => {

                            return (
                                <tr key={country.cca2}>
                                    <td className='Flag-img'>
                                        <img src={country.flags.png} alt="Flag" width="32" />
                                    </td>
                                    <td className='Official-name'>
                                        <a onClick={() => handleOpenModal(country)}>
                                            {country.name.official}
                                        </a>
                                    </td>
                                    <td>{country.cca2}</td>
                                    <td>{country.cca3}</td>
                                    <td className='Native-name'>
                                        {country.name.nativeName && Object.values(country.name.nativeName).map((nativeName, index) => (
                                            <React.Fragment key={index}>
                                                {nativeName.official}, {nativeName.common} {index < Object.values(country.name.nativeName).length - 1 && ', '}
                                            </React.Fragment>
                                        ))}
                                    </td>
                                    <td>{country.altSpellings ? country.altSpellings.join(', ') : ''}</td>
                                    <td>
                                        root: {country.idd.root},
                                        suffixes: {country.idd.suffixes && country.idd.suffixes.map((suffix, index) => (
                                            <React.Fragment key={index}>
                                                {suffix}{index < country.idd.suffixes.length - 1 && ', '}
                                            </React.Fragment>
                                        ))}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            )}  
            {error ? error : null}
            {isModalOpen && (
                <Modal country={selectedCountry} onClose={handleCloseModal} />
            )}


        </div>
     );
}

export default CountryTable;