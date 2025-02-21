import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Pokemon, STARTERS } from './types/pokemon';
import { PokeBall } from './components/PokeBall';
import { PokemonCard } from './components/PokemonCard';
import { Pokedex } from './screens/Pokedex';

const STORAGE_KEY = '@starter_pokemon';

export default function App() {
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [starterPokemon, setStarterPokemon] = useState<Pokemon | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkStarterPokemon();
  }, []);

  const checkStarterPokemon = async () => {
    try {
      const savedPokemon = await AsyncStorage.getItem(STORAGE_KEY);
      if (savedPokemon) {
        setStarterPokemon(JSON.parse(savedPokemon));
      }
    } catch (error) {
      console.error('Error loading starter pokemon:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectPokemon = (pokemon: Pokemon) => {
    setSelectedPokemon(pokemon);
  };

  const handleBack = () => {
    setSelectedPokemon(null);
  };

  const handleChoosePokemon = async (pokemon: Pokemon) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(pokemon));
      setStarterPokemon(pokemon);
    } catch (error) {
      console.error('Error saving starter pokemon:', error);
    }
  };

  if (isLoading) {
    return null; // Or a loading spinner
  }

  if (starterPokemon) {
    return <Pokedex starterPokemon={starterPokemon} />;
  }

  return (
    <View style={styles.container}>
      {!selectedPokemon ? (
        <View style={styles.starterContainer}>
          {STARTERS.map((pokemon) => (
            <PokeBall
              key={pokemon.id}
              pokemon={pokemon}
              onSelect={handleSelectPokemon}
            />
          ))}
        </View>
      ) : (
        <PokemonCard 
          pokemon={selectedPokemon}
          onBack={handleBack}
          onChoose={handleChoosePokemon}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  starterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    flexWrap: 'wrap',
  },
});
