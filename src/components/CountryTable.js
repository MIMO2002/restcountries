import React from 'react';

function CountryTable({countries, loading, error}) {
    return ( 
        <div>
            {loading ? ('Loading...') : (
                <table>
                    <tbody>
                        {countries.map((country) => {

                            return (
                                <tr key={country.cca2}>
                                    <td className='Flag-img'>
                                        <img src={country.flags.png} alt="Flag" width="32" />
                                    </td>
                                    <td className='Official-name'>{country.name.official}</td>
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
        </div>
     );
}

export default CountryTable;