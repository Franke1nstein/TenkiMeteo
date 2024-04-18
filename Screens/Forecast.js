import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Button, ActivityIndicator } from 'react-native';

// Define API key and base URL for weather data fetching
const API_KEY = 'fb2051e6bea60e62815de5e9a3a6869e'; // Replace with your valid API key
const BASE_URL = 'https://api.openweathermap.org/data/2.5/';

const Forecast = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }

      const data = await response.json();
      setWeatherData(data.list);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const renderForecastItem = (item) => {
    const date = new Date(item.dt * 1000);
    const day = date.toLocaleDateString('fr-FR', { weekday: 'long' });
    const time = date.toLocaleTimeString('fr-FR', { hour: 'numeric', minute: 'numeric' });

    return (
      <View key={item.dt} style={styles.forecastItem}>
        <Text style={styles.dayText}>{day}</Text>
        <Text style={styles.timeText}>{time}</Text>
        <Text style={styles.tempText}>{item.main.temp}°C</Text>
        <Text style={styles.descriptionText}>{item.weather[0].description}</Text>
      </View>
    );
  };

  return (
    <View style={styles.forecastContainer}>
      <TextInput
        value={city}
        onChangeText={setCity}
        placeholder="Enter the City"
        style={styles.input}
      />
      <Button title="Search" onPress={handleSearch} disabled={isLoading} />

      {isLoading && (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
      )}
      {error && <Text style={styles.errorText}>{error}</Text>}
      {weatherData.length > 0 && (
        <ScrollView style={styles.scrollView}>
          {weatherData.map(renderForecastItem)}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  forecastContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#00ffff', 
  },
  loader: {
    marginTop: 20,
    marginBottom: 20,
    alignSelf: 'center',
  },
  errorText: {
    fontSize: 18,
    textAlign: 'center',
    color: 'red',
  },
  scrollView: {
    flex: 1,
  },
  forecastItem: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  dayText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  timeText: {
    fontSize: 14,
  },
  tempText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  descriptionText: {
    fontSize: 14,
  },
});

export default Forecast;
