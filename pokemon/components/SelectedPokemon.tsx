import React from 'react';
import { StyleSheet, Image, Text, TouchableOpacity, Animated } from 'react-native';
import { Pokemon } from '../types/pokemon';

interface SelectedPokemonProps {
  pokemon: Pokemon;
  scaleAnim: Animated.Value;
  onReset: () => void;
}

export const SelectedPokemon: React.FC<SelectedPokemonProps> = ({
  pokemon,
  scaleAnim,
  onReset,
}) => {
  return (
    <Animated.View
      style={[
        styles.selectedContainer,
        {
          transform: [{ scale: scaleAnim }],
        },
      ]}
    >
      <Image
        source={{
          uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`,
        }}
        style={styles.selectedImage}
      />
      <Text style={styles.selectedName}>
        You chose {pokemon.name}!
      </Text>
      <TouchableOpacity
        style={styles.resetButton}
        onPress={onReset}
      >
        <Text style={styles.resetButtonText}>Choose Again</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  selectedContainer: {
    alignItems: 'center',
  },
  selectedImage: {
    width: 200,
    height: 200,
  },
  selectedName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#333',
  },
  resetButton: {
    backgroundColor: '#ff5252',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    marginTop: 20,
  },
  resetButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 