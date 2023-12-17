import React, { useEffect } from 'react';

const Modal = ({ country, onClose }) => {
     
    useEffect(() => {
        const closeOnOverlayClick = (event) => {
            if (event.target.classList.contains('modal-overlay')) {
                onClose();
            }
        };

        document.addEventListener('click', closeOnOverlayClick);

        return () => {
            document.removeEventListener('click', closeOnOverlayClick);
        };
    }, [onClose]);

    // List all languages of current country
    const languages = Object.entries(country.languages).map(([code, name]) => name);
    const languagesString = languages.join(', ');

    // Get currency name and symbol of current country
    const currencies = Object.entries(country.currencies).map(([code, currency]) => (
        `${currency.name} (${currency.symbol})`
      ));
    const currenciesString = currencies.join(', ');

    return ( 
        <div className="modal-overlay">
            <div className="modal">
                <h2>{country.name.official}</h2>
                <img src={country.flags.png} alt="Flag" width="200" />
                <p>Capital: {country.capital}</p>
                <p>Languages: {languagesString}</p>
                <p>Alternative Name: {country.altSpellings.join(', ')}</p>
                <p>Area: {country.area} km²</p>
                <p>Population: {country.population}</p>
                <p>Currencies: {currenciesString}</p>
                <p>Region: {country.region}</p>
                <p>Subregion: {country.subregion}</p>
                <p>Continents: {country.region}</p>
                <p>Coordinates of the Capital: Latitude: {country.capitalInfo.latlng[0]}, Longitude: {country.capitalInfo.latlng[1]}</p>
                <p>Timezone: {country.timezones[0]}</p>
                <p>Car site: {country.car.side}</p>
                <p>TLD: {country.tld[0]}</p>
                <p>Independent: {country.independent}</p>
                <p>UN member: {country.unMember}</p>
                <p>Google Maps: <a href={country.maps.googleMaps} target="_blank" rel="noopener noreferrer">Google Maps Link</a></p>
                <p>OpenStreetMap: <a href={country.maps.openStreetMaps} target="_blank" rel="noopener noreferrer">OpenStreetMap Link</a></p>
                
                {/*Close modal button */}
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    )
};

export default Modal;
