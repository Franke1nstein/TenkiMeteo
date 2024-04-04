import React from 'react';
import { View, Text, Image, Button } from 'react-native';
import styles from '../Styles/HomeStyle.js'; 

const Home = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/Background.jpg')} style={styles.logo} />
      <Text style={styles.heading}>Welcome to My App!</Text>
      <Text style={styles.description}>This is the customized Home screen.</Text>
      <Button title="Explore More" onPress={() => {}} /> 
    </View>
  );
};

export default Home;