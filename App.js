import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';

const API_KEY = 'fb2051e6bea60e62815de5e9a3a6869e'; 
const BASE_URL = 'https://api.openweathermap.org/data/2.5/';

const SearchBar = ({ query, setQuery, onSearch }) => (
  <View style={styles.searchBarContainer}>
    <TextInput
      style={styles.searchBarInput}
      placeholder="Search any city"
      onChangeText={setQuery}
      value={query}
    />
    <TouchableOpacity style={styles.searchButton} onPress={() => onSearch(query)}>
      <Image
        source={require('./assets/search_icon.png')} 
        style={styles.searchIcon}
      />
    </TouchableOpacity>
  </View>
);

const WeatherDisplay = ({ weather, error }) => {
  if (error) {
    return <Text style={styles.errorText}>{error.message}: {error.query}</Text>;}
  if (!weather.main) return null; // Handle no weather data

  const temperature = Math.round(weather.main.temp);
  return (
    <View style={styles.weatherDisplay}>
      <Text style={styles.cityText}>{weather.name}</Text>
      <Text style={styles.descriptionText}>{weather.weather[0].description}</Text>
      <Text style={styles.temperatureText}>{temperature}°C</Text>
      <Text style={styles.feelsLikeText}>Feels like: {Math.round(weather.main.feels_like)}°C</Text>
      <Text style={styles.humidityText}>Humidity: {weather.main.humidity}%</Text>
      <Text style={styles.windText}>Wind speed: {weather.wind.speed.toFixed(3)*3.6} Km/h</Text>
      {/* Add more weather info display logic here */}
    </View>
  );
};

const App = () => {
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');
  const [weather, setWeather] = useState({});

  const handleSearch = async (city) => {
    try {
      const response = await fetch(`${BASE_URL}weather?q=${city}&units=metric&APPID=${API_KEY}`);
      const data = await response.json();
      //console.log("API data:", data);
      setWeather(data);
      setQuery('');
    } catch (error) {
      console.log(error);
      setError({ message: "Not Found", query: city });
    }
  };

  useEffect(() => {
    handleSearch('Antsiranana'); // Initial weather search
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('./assets/Background.jpg')}
        style={styles.backgroundImage}
    />
    <View style={styles.container}>
      <SearchBar query={query} setQuery={setQuery} onSearch={handleSearch} />
      {error.message && <Text style={styles.errorText}>{error.message}: {error.query}</Text>}
      {weather.main && <WeatherDisplay weather={weather} error={error} />}
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    flex: 1, 
    resizeMode: 'center', 
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  searchBarInput: {
    flex: 1,
    fontSize: 16,
    padding: 5,
  },
  searchButton: {
    padding: 10,
  },
  searchIcon: {
    width: 24,
    height: 24,
  },
  errorText: {
    color: 'red',
    fontSize: 15,
    marginBottom: 20,
  },
  weatherDisplay: {
    // Add styles for weather display elements here
  },
  cityText: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  temperatureText: {
    fontSize: 30,
  },
  descriptionText: {
    fontSize: 25,
  },
  feelsLikeText: {
    fontSize: 15,
  },
  humidityText: {
    fontSize: 15,
  },
  windText: {
    fontSize: 15,
  },
});

    export default App;
