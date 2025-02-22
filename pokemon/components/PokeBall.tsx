import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Image, Animated, Easing } from 'react-native';
import { Pokemon } from '../types/pokemon';
import { POKEMON_DESCRIPTIONS } from '../data/pokemonDescriptions';
import { pokemonVoiceService } from '../services/voiceService';

interface PokeBallProps {
  pokemon: Pokemon;
  onSelect: (pokemon: Pokemon) => void;
}

export const PokeBall: React.FC<PokeBallProps> = ({ pokemon, onSelect }) => {
  const [rotation] = useState(new Animated.Value(0));
  const [scale] = useState(new Animated.Value(1));

  const handlePress = () => {
    // Stop any previous speech
    pokemonVoiceService.stop();
    
    // Animate the PokeBall
    Animated.sequence([
      // First scale down
      Animated.timing(scale, {
        toValue: 0.8,
        duration: 150,
        useNativeDriver: true,
      }),
      // Then scale up and rotate
      Animated.parallel([
        Animated.timing(scale, {
          toValue: 1.2,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(rotation, {
          toValue: 1,
          duration: 300,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ]),
      // Finally return to normal size
      Animated.timing(scale, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start(() => {
      rotation.setValue(0);
      onSelect(pokemon);
    });
  };

  const handlePressIn = () => {
    // Play a short description
    const description = `${pokemon.name}, a ${pokemon.type} type Pokémon.`;
    pokemonVoiceService.speak(description);

    // Animate scale down
    Animated.timing(scale, {
      toValue: 0.9,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    // Return to normal size
    Animated.timing(scale, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const spin = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <TouchableOpacity
      style={styles.pokeBallContainer}
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={0.7}
    >
      <Animated.View
        style={[
          styles.pokeBallWrapper,
          {
            transform: [
              { scale: scale },
              { rotate: spin },
            ],
          },
        ]}
      >
        <Image
          source={require('../assets/pokeball.png')}
          style={styles.pokeBallImage}
        />
        <Animated.View style={styles.shine} />
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  pokeBallContainer: {
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pokeBallWrapper: {
    width: 100,
    height: 100,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  pokeBallImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  shine: {
    position: 'absolute',
    top: '15%',
    left: '15%',
    width: '20%',
    height: '20%',
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderRadius: 50,
    transform: [{ rotate: '45deg' }],
  },
}); 