import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CountryInfo = ({ searchQuery, selectedCountry, handleCountryButtonClick }) => {
  const [countries, setCountries] = useState([]);
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://restcountries.com/v2/name/${searchQuery}`
        );
        setCountries(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (searchQuery) {
      fetchData();
    }
  }, [searchQuery]);

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (selectedCountry) {
        try {
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${selectedCountry.capital}&appid=${process.env.REACT_APP_API_KEY}&units=metric`
          );
          setWeatherData(response.data);
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchWeatherData();
  }, [selectedCountry]);

  if (!searchQuery) {
    return null;
  }

  if (countries.length > 10) {
    return <p>Too many matches, please make your query more specific.</p>;
  }

  if (countries.length > 1) {
    return (
      <ul>
        {countries.map((country) => (
          <li key={country.alpha3Code}>
            {country.name}
            <button onClick={() => handleCountryButtonClick(country)}>
              Show
            </button>
          </li>
        ))}
      </ul>
    );
  }

  if (countries.length === 1) {
    const country = countries[0];

    return (
      <div>
        <h2>{country.name}</h2>
        <p>Capital: {country.capital}</p>
        <p>Area: {country.area} km²</p>
        <p>Languages: {country.languages.map((lang) => lang.name).join(', ')}</p>
        <img src={country.flags[0]} alt={`Flag of ${country.name}`} />

        {weatherData && (
          <div>
            <h3>Weather in {country.capital}</h3>
            <p>Temperature: {weatherData.main.temp} °C</p>
            <p>Description: {weatherData.weather[0].description}</p>
            <img
              src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
              alt="Weather Icon"
            />
          </div>
        )}
      </div>
    );
  }

  return <p>No matches found.</p>;
};

export default CountryInfo;
