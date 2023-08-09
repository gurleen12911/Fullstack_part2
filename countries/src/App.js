import React, { useState } from 'react';
import CountryInfo from './CountryInfo';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    setSelectedCountry(null); // Reset selected country when performing a new search
  };

  const handleCountryButtonClick = (country) => {
    setSelectedCountry(country);
  };

  return (
    <div>
      <h1>Country Information</h1>
      <input type="text" value={searchQuery} onChange={handleSearch} />
      <CountryInfo
        searchQuery={searchQuery}
        selectedCountry={selectedCountry}
        handleCountryButtonClick={handleCountryButtonClick}
      />
      {selectedCountry && (
        <div>
          <h2>{selectedCountry.name}</h2>
          <p>Capital: {selectedCountry.capital}</p>
          <p>Area: {selectedCountry.area} km²</p>
          <p>Languages: {selectedCountry.languages.map((lang) => lang.name).join(', ')}</p>
          <img src={selectedCountry.flags[0]} alt={`Flag of ${selectedCountry.name}`} />
        </div>
      )}
    </div>
  );
};

export default App;