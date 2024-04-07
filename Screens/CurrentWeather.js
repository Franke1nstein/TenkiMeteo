// Import necessary React components and styling library
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ImageBackground } from 'react-native';


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
  const [backgroundImage, setBackgroundImage] = useState(require('../assets/images/Background.jpg'));

    // Function to update background image based on weather description
    const handleWeatherChange = (weather) => {
      const description = weather?.weather?.[0]?.description?.toLowerCase(); // Use optional chaining
      if (!description) return;
      const imageMap = {
        // Map weather descriptions to appropriate Img
          'rainy': require('../assets/DescriptImg/rainy.png'),
          'cloudy': require('../assets/DescriptImg/cloudy.png'),
          'sunny': require('../assets/DescriptImg/sunny.png'),
          'overcast clouds': require('../assets/DescriptImg/overcast clouds.jpg'),
          'clear sky': require('../assets/DescriptImg/ClearSky.jpg'),
          'few clouds': require('../assets/DescriptImg/ClearSky.jpg'),
          'scattered clouds': require('../assets/DescriptImg/scattered clouds.jpg'),
          'broken clouds': require('../assets/DescriptImg/broken clouds.jpg'),
          'overcast clouds': require('../assets/DescriptImg/overcast sky.png'),
          'mist': require('../assets/DescriptImg/mist.jpg'),
          'smoke': require('../assets/DescriptImg/smoke.jpg'),
          'haze': require('../assets/DescriptImg/haze.jpg'),
          'rain shower': require('../assets/DescriptImg/rain shower.jpg'),
          'light rain': require('../assets/DescriptImg/light rain.jpg'),
          'moderate rain': require('../assets/DescriptImg/moderate rain.jpg'),
          'heavy rain': require('../assets/DescriptImg/heavy rain.jpg'),
          'drizzle': require('../assets/DescriptImg/drizzle.jpg'),
          'snowfall': require('../assets/DescriptImg/snowfall.jpg'),
          'heavy snow': require('../assets/DescriptImg/heavy snow.jpg'),
          'blizzard': require('../assets/DescriptImg/blizzard.jpg'),
          'thunderstorm': require('../assets/DescriptImg/thunderstorm.jpg'),
          
        // Add more mappings for other weather descriptions
      };
      const matchingImage = imageMap[description];
      if (matchingImage) {
        setBackgroundImage(matchingImage);
      } else {
        // Handle cases where there's no matching img
        setBackgroundImage(require('../assets/images/Background.jpg')); // Use a default image
      console.warn(`No matching image found for weather description: ${description}`);
    }
    }

  // Function to handle search logic and fetch weather data
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
  useEffect(() => {
    // Trigger background update for initial weather
    handleWeatherChange(weather);
  }, [weather]);
  return (
    <View style={styles.container}>
      <Image
        source={backgroundImage} // Use backgroundImage state for dynamic background
        style={styles.backgroundImage}
        resizeMode='cover'
    />
    <View style={styles.container}>
      <SearchBar query={query} setQuery={setQuery} onSearch={handleSearch} />
      {error.message && <Text style={styles.errorText}>{error.message}: {error.query}</Text>}
      {weather.main && <WeatherDisplay weather={weather} error={error} />}
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
    
    backgroundColor: '#00ffff', // Uncomment for blue background
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