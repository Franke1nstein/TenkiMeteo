import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:50,
  },
  logo:{
    flex: 1,
    resizeMode: 'center', 
    marginTop : 20,
  },
  heading:{
    fontSize: 25,
    fontWeight: 'bold',
    justifyContent: 'center',
  },
  description:{
    fontSize: 15,
  },
  text: { 
    fontSize: 15,
  },
});

export default styles;