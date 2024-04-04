import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons'; // Import for icons

// Assuming these components are defined elsewhere
import Home from './Screens/Home.js';
import CurrentWeather from './Screens/CurrentWeather.js';
import Forecast from './Screens/Forecast.js';

const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home" color={color} size={24} />
            ),
          }}
        />
        <Tab.Screen
          name="CurrentWeather"
          component={CurrentWeather}
          options={{
            tabBarLabel: 'Current Weather',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="weather-sunny" color={color} size={24} />
            ),
          }}
        />
        <Tab.Screen
          name="Forecast"
          component={Forecast}
          options={{
            tabBarLabel: 'Forecast',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="calendar-range" color={color} size={24} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
