import React from 'react';
import { View, Text, Image, Button } from 'react-native';
import styles from '../Styles/HomeStyle.js'; 

const Home = ({ navigation }) => {
  const handleShowCurrentWeather = () => {
    navigation.navigate('CurrentWeather'); // Navigate to CurrentWeather screen
  };
  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/Background.jpg')} style={styles.logo} />
      <Text style={styles.heading}>Welcome to My App!</Text>
      <Text style={styles.description}>This is the Home screen.</Text>
      <Button title="Get Started" onPress={handleShowCurrentWeather} />
    </View>
  );
  
};

export default Home;