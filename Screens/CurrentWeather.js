// Import necessary React components and styling library
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ImageBackground, ActivityIndicator } from 'react-native';



// Define API key and base URL for weather data fetching
const API_KEY = 'fb2051e6bea60e62815de5e9a3a6869e'; 
const BASE_URL = 'https://api.openweathermap.org/data/2.5/';

// SearchBar component for user input and search 
const SearchBar = ({ query, setQuery, onSearch }) => (
  <View style={styles.searchBarContainer}>
    <TextInput
      style={styles.searchBarInput}
      placeholder="Search any city"
      onChangeText={setQuery}
      value={query}
    />
    <TouchableOpacity style={styles.searchButton} onPress={() => onSearch(query)}>
      <ImageBackground 
        source={require('../assets/search_icon.png')} 
        style={styles.searchIcon}
      />
    </TouchableOpacity>
  </View>
);

// WeatherDisplay component to display weather information or error messages
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
      <Text style={styles.windText}>Wind speed: {weather.wind.speed.toFixed(0)*3.6} Km/h</Text>
      {/* Add more weather info display logic here */}
    </View>
  );
};

// Main App component that manages state and renders the UI
const CurrentWeather = () => {

  const [query, setQuery] = useState('');
  const [error, setError] = useState('');
  const [weather, setWeather] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [backgroundImage, setBackgroundImage] = useState(require('../assets/images/Background.jpg'));

    // Function to update background image based on weather description
    const handleWeatherChange = (weather) => {
      const description = weather?.weather?.[0]?.description?.toLowerCase(); // Use optional chaining
      if (!description) return;
      const gifMap = {
        // Map weather descriptions to appropriate Img
          'blizzard': require('../assets/DescriptImg/blizzard.gif'),
          'broken clouds': require('../assets/DescriptImg/broken clouds.gif'),
          'clear sky': require('../assets/DescriptImg/clear sky.gif'),
          'drizzle': require('../assets/DescriptImg/drizzle.gif'),
          'dust whirls': require('../assets/DescriptImg/dust whirls.gif'),
          'few clouds': require('../assets/DescriptImg/few clouds.gif'),
          'broken clouds': require('../assets/DescriptImg/broken clouds.gif'),
          'fog': require('../assets/DescriptImg/fog.gif'),
          'haze': require('../assets/DescriptImg/haze.gif'),
          'heavy rain': require('../assets/DescriptImg/heavy rain.gif'),
          'heavy snow': require('../assets/DescriptImg/heavy snow.gif'),
          'light rain': require('../assets/DescriptImg/light rain.gif'),
          'mist': require('../assets/DescriptImg/mist.gif'),
          'moderate rain': require('../assets/DescriptImg/moderate rain.gif'),
          'overcast clouds': require('../assets/DescriptImg/overcast clouds.gif'),
          'rain-night': require('../assets/DescriptImg/rain-night.gif'),
          'rainy': require('../assets/DescriptImg/rainy.gif'),
          'sand': require('../assets/DescriptImg/sand.gif'),
          'scattered clouds': require('../assets/DescriptImg/scattered clouds.gif'),
          'shower rain': require('../assets/DescriptImg/shower rain.gif'),
          'sleet': require('../assets/DescriptImg/sleet.gif'),
          'smoke': require('../assets/DescriptImg/smoke.gif'),
          'snow': require('../assets/DescriptImg/snow.gif'),
          'snowfall': require('../assets/DescriptImg/snowfall.gif'),
          'thunderstorm': require('../assets/DescriptImg/thunderstorm.gif'),
          'tornado': require('../assets/DescriptImg/tornado.gif'),
          
        // Add more mappings for other weather descriptions
      };
      const matchingGif = gifMap[description];
      if (matchingGif) {
        setBackgroundImage(matchingGif);
      } else {
        // Handle cases where there's no matching img
        setBackgroundImage(require('../assets/images/Background.jpg')); // Use a default image
      console.warn(`No matching image found for weather description: ${description}`);
    }
    }

  // Function to handle search logic and fetch weather data
  const handleSearch = async (city) => {
    try {
      setIsLoading(true); 
      const response = await fetch(`${BASE_URL}weather?q=${city}&units=metric&APPID=${API_KEY}`);
      const data = await response.json();
      setWeather(data);
      setIsLoading(false);
      setQuery('');
    } catch (error) {
      console.log(error);
      setError({ message: "Not Found", query: city });
    }
  };

  useEffect(() => {
    handleSearch('Antsiranana'); // Initial weather search
  }, []);
  useEffect(() => {
    // Trigger background update for initial weather
    handleWeatherChange(weather);
  }, [weather]);
  return (
    <View style={styles.container}>
      <Image
        source={backgroundImage}
        style={styles.backgroundImage}
        resizeMode='cover'
      />
      <View style={styles.container}>
        <SearchBar query={query} setQuery={setQuery} onSearch={handleSearch} />
        {error.message && <Text style={styles.errorText}>{error.message}: {error.query}</Text>}
        {isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" style={styles.loader} /> // Using ActivityIndicator here
        ) : (
          weather.main && <WeatherDisplay weather={weather} error={error} />
        )}
      </View>
    </View>
  );
};

// Stylesheet for UI components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'center', // Resize to cover container
    width : '100%',
    marginTop : 20,
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
  },
  weatherDisplay: {
    
    backgroundColor: '#00ffff', 
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    
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
    export default CurrentWeather;