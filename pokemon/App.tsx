import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Pokemon, STARTERS } from './types/pokemon';
import { PokeBall } from './components/PokeBall';
import { PokemonCard } from './components/PokemonCard';
import { Pokedex } from './screens/Pokedex';
import { Settings } from './components/Settings';
import { StarterSelection } from './components/StarterSelection';
import { SplashScreen } from './screens/SplashScreen';
import { musicService } from './services/musicService';
import { soundEffectService } from './services/soundEffectService';


const STORAGE_KEY = '@starter_pokemon';

export default function App() {
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [starterPokemon, setStarterPokemon] = useState<Pokemon | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    checkStarterPokemon();
    soundEffectService.loadSounds();
    return () => {
      soundEffectService.unloadSounds();
    };
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

  const handleResetStarter = async () => {
    try {
      // Reset all storage and states
      await AsyncStorage.removeItem(STORAGE_KEY);
      setStarterPokemon(null);
      setSelectedPokemon(null);
      setShowSettings(false);
      setShowSplash(true);
      
      // Reset all services to default
      musicService.stopBackgroundMusic();
      musicService.setVolume(0.1);
      soundEffectService.setVolume(1.0);
      
    } catch (error) {
      console.error('Error resetting starter pokemon:', error);
    }
  };

  const handleSplashComplete = () => {
    setShowSplash(false);
    musicService.playBackgroundMusic();
  };

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  if (isLoading) {
    return null;
  }

  if (starterPokemon) {
    return (
      <>
        <Pokedex 
          starterPokemon={starterPokemon} 
          onOpenSettings={() => setShowSettings(true)}
        />
        <Settings
          visible={showSettings}
          onClose={() => setShowSettings(false)}
          onResetStarter={handleResetStarter}
        />
      </>
    );
  }

  return (
    <View style={styles.container}>
      {!selectedPokemon ? (
        <StarterSelection onSelect={handleSelectPokemon} />
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
