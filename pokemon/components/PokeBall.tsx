import React from 'react';
import { StyleSheet, TouchableOpacity, Image, Animated } from 'react-native';
import { Pokemon } from '../types/pokemon';

interface PokeBallProps {
  pokemon: Pokemon;
  onSelect: (pokemon: Pokemon) => void;
}

export const PokeBall: React.FC<PokeBallProps> = ({ pokemon, onSelect }) => {
  return (
    <TouchableOpacity
      style={styles.pokeBallContainer}
      onPress={() => onSelect(pokemon)}
    >
      <Image
        source={require('../assets/pokeball.png')}
        style={styles.pokeBallImage}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  pokeBallContainer: {
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pokeBallImage: {
    width: 100,
    height: 100,
  },
}); 