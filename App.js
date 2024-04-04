import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Assuming these components are defined elsewhere
import Home from './Screens/Home.js';
import CurrentWeather from './Screens/CurrentWeather.js';
import Forecast from './Screens/Forecast.js';

const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Home} options={{ tabBarLabel: 'Home' }} />
        <Tab.Screen
          name="CurrentWeather"
          component={CurrentWeather}
          options={{ tabBarLabel: 'Current Weather' }}
        />
        <Tab.Screen name="Forecast" component={Forecast} options={{ tabBarLabel: 'Forecast' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
