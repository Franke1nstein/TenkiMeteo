import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo:{
    flex: 1,
    resizeMode: 'center', // Resize to cover container
    width : '100%',
    marginTop : 20,
  },
  heading:{
    fontSize: 25,
    fontWeight: 'bold',
  },
  description:{
    fontSize: 15,
  },
  text: { 
    fontSize: 15,
  },
});

export default styles;