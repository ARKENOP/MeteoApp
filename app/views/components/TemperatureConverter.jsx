import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

const TemperatureConverter = ({ onConvert }) => {
  const [isCelsius, setIsCelsius] = useState(true);

  const toggleTemperatureUnit = () => {
    setIsCelsius((prev) => !prev);
    onConvert && onConvert(!isCelsius);
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={toggleTemperatureUnit}>
        <Text style={styles.text}>
          Convertir en {isCelsius ? 'Fahrenheit' : 'Celsius'}
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 10,
  },
  text: {
    fontSize: 16,
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default TemperatureConverter;