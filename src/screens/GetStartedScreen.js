import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

export default function GetStartedScreen({ navigation }) {
  const handleContinue = () => {
    navigation.navigate('Language');
  };

  return (
    <View style={styles.container}>
      {/* Use Image component to display PNG */}
      <Image
        source={require('../../assets/get-started-image.png')} // Make sure your file extension is correct (PNG)
        style={styles.image}
        resizeMode="contain" // Adjust how the image is scaled to fit
      />
      <Text style={styles.title}>One app for all services.</Text>
      <Text style={styles.subtitle}>
        Services made simple just for you
      </Text>

      <TouchableOpacity style={styles.button} onPress={handleContinue}>
        <Text style={styles.buttonText}>Get started</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  image: {
    width: '100%', // Adjust to the width of the screen
    height: 250, // Set the height of the image
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginBottom: 60,
  },
  button: {
    backgroundColor: '#001',
    paddingVertical: 16,
    paddingHorizontal: 60,
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
    position: 'absolute',
    bottom: 40,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
