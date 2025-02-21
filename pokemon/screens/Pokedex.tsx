import React, { useState, useRef, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  Image, 
  ScrollView, 
  TouchableOpacity,
  Modal,
  Dimensions,
  Animated
} from 'react-native';
import { Pokemon } from '../types/pokemon';
import { GEN6_POKEMON } from '../data/gen6Pokemon';
import { POKEMON_DESCRIPTIONS } from '../data/pokemonDescriptions';
import { pokemonVoiceService } from '../services/voiceService';

interface PokedexProps {
  starterPokemon: Pokemon;
}

export const Pokedex: React.FC<PokedexProps> = ({ starterPokemon }) => {
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const hpWidth = useRef(new Animated.Value(0)).current;
  const attackWidth = useRef(new Animated.Value(0)).current;
  const defenseWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (selectedPokemon) {
      // Reset animations
      hpWidth.setValue(0);
      attackWidth.setValue(0);
      defenseWidth.setValue(0);

      // Animate all bars sequentially
      Animated.sequence([
        Animated.timing(hpWidth, {
          toValue: (selectedPokemon.stats.hp / 150) * 100,
          duration: 800,
          useNativeDriver: false,
        }),
        Animated.timing(attackWidth, {
          toValue: (selectedPokemon.stats.attack / 150) * 100,
          duration: 800,
          useNativeDriver: false,
        }),
        Animated.timing(defenseWidth, {
          toValue: (selectedPokemon.stats.defense / 150) * 100,
          duration: 800,
          useNativeDriver: false,
        }),
      ]).start();

      // Play the Pokédex description
      const description = POKEMON_DESCRIPTIONS[selectedPokemon.id];
      if (description) {
        pokemonVoiceService.speak(description);
      }
    }
    return () => {
      // Cleanup: stop any ongoing speech when component unmounts
      pokemonVoiceService.stop();
    };
  }, [selectedPokemon]);

  const handlePokemonPress = (pokemon: Pokemon) => {
    setSelectedPokemon(pokemon);
  };

  const handleCloseModal = () => {
    pokemonVoiceService.stop();
    setSelectedPokemon(null);
  };

  const getTypeColor = (type: string) => {
    const baseType = type.split('/')[0].toLowerCase();
    switch (baseType) {
      case 'water': return '#6890F0';
      case 'fire': return '#F08030';
      case 'grass': return '#78C850';
      case 'fighting': return '#C03028';
      case 'psychic': return '#F85888';
      case 'dark': return '#705848';
      default: return '#A8A878';
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Your Pokédex</Text>
      
      {/* Starter Pokemon Section */}
      <View style={styles.starterSection}>
        <Text style={styles.sectionTitle}>Your Starter Pokémon</Text>
        <View style={styles.pokemonCard}>
          <Image
            source={{
              uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${starterPokemon.id}.png`,
            }}
            style={styles.pokemonImage}
          />
          <View style={styles.pokemonInfo}>
            <Text style={styles.pokemonName}>{starterPokemon.name}</Text>
            <Text style={[
              styles.pokemonType,
              { backgroundColor: getTypeColor(starterPokemon.type), color: 'white' }
            ]}>{starterPokemon.type}</Text>
            <View style={styles.statsContainer}>
              <Text>HP: {starterPokemon.stats.hp}</Text>
              <Text>Attack: {starterPokemon.stats.attack}</Text>
              <Text>Defense: {starterPokemon.stats.defense}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Gen 6 Pokemon Grid */}
      <Text style={styles.sectionTitle}>Kalos Pokédex</Text>
      <View style={styles.gridContainer}>
        {GEN6_POKEMON.map((pokemon) => (
          <TouchableOpacity
            key={pokemon.id}
            style={styles.gridItem}
            onPress={() => handlePokemonPress(pokemon)}
          >
            <Image
              source={{
                uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`,
              }}
              style={styles.gridImage}
            />
            <Text style={styles.gridPokemonName}>{pokemon.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Pokemon Detail Modal */}
      <Modal
        visible={selectedPokemon !== null}
        transparent={true}
        animationType="slide"
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedPokemon && (
              <>
                <Image
                  source={{
                    uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${selectedPokemon.id}.png`,
                  }}
                  style={styles.modalImage}
                />
                <Text style={styles.modalPokemonName}>{selectedPokemon.name}</Text>
                <Text style={[
                  styles.modalPokemonType,
                  { backgroundColor: getTypeColor(selectedPokemon.type) }
                ]}>{selectedPokemon.type}</Text>
                
                <View style={styles.modalStats}>
                  <Text style={styles.modalStatsTitle}>Base Stats</Text>
                  <View style={styles.statRow}>
                    <Text style={styles.statLabel}>HP:</Text>
                    <View style={styles.statBarContainer}>
                      <Animated.View 
                        style={[
                          styles.statBar,
                          { 
                            width: hpWidth.interpolate({
                              inputRange: [0, 100],
                              outputRange: ['0%', '100%'],
                            }),
                            backgroundColor: '#FF5959'
                          }
                        ]} 
                      />
                    </View>
                    <Text style={styles.statValue}>{selectedPokemon.stats.hp}</Text>
                  </View>
                  <View style={styles.statRow}>
                    <Text style={styles.statLabel}>Attack:</Text>
                    <View style={styles.statBarContainer}>
                      <Animated.View 
                        style={[
                          styles.statBar,
                          { 
                            width: attackWidth.interpolate({
                              inputRange: [0, 100],
                              outputRange: ['0%', '100%'],
                            }),
                            backgroundColor: '#F5AC78'
                          }
                        ]} 
                      />
                    </View>
                    <Text style={styles.statValue}>{selectedPokemon.stats.attack}</Text>
                  </View>
                  <View style={styles.statRow}>
                    <Text style={styles.statLabel}>Defense:</Text>
                    <View style={styles.statBarContainer}>
                      <Animated.View 
                        style={[
                          styles.statBar,
                          { 
                            width: defenseWidth.interpolate({
                              inputRange: [0, 100],
                              outputRange: ['0%', '100%'],
                            }),
                            backgroundColor: '#FAE078'
                          }
                        ]} 
                      />
                    </View>
                    <Text style={styles.statValue}>{selectedPokemon.stats.defense}</Text>
                  </View>
                </View>

                {/* Add description text */}
                <Text style={styles.pokemonDescription}>
                  {POKEMON_DESCRIPTIONS[selectedPokemon.id]}
                </Text>

                <TouchableOpacity
                  style={styles.modalCloseButton}
                  onPress={handleCloseModal}
                >
                  <Text style={styles.modalCloseButtonText}>Close</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  starterSection: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  pokemonCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    padding: 10,
  },
  pokemonImage: {
    width: 100,
    height: 100,
  },
  pokemonInfo: {
    flex: 1,
    marginLeft: 15,
  },
  pokemonName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  pokemonType: {
    fontSize: 16,
    color: '#666',
    marginVertical: 5,
  },
  statsContainer: {
    marginTop: 5,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10,
  },
  gridItem: {
    width: (Dimensions.get('window').width - 60) / 3,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  gridImage: {
    width: 80,
    height: 80,
  },
  gridPokemonName: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 5,
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    width: Dimensions.get('window').width * 0.85,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalImage: {
    width: 200,
    height: 200,
  },
  modalPokemonName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  modalPokemonType: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 15,
    marginTop: 8,
    color: 'white',
    fontWeight: 'bold',
  },
  modalStats: {
    width: '100%',
    marginTop: 20,
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 15,
  },
  modalStatsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  statLabel: {
    width: 80,
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  statBarContainer: {
    flex: 1,
    height: 12,
    backgroundColor: '#e0e0e0',
    borderRadius: 6,
    marginHorizontal: 10,
  },
  statBar: {
    height: '100%',
    borderRadius: 6,
  },
  statValue: {
    width: 30,
    fontSize: 14,
    textAlign: 'right',
    fontWeight: '600',
    color: '#666',
  },
  modalCloseButton: {
    backgroundColor: '#ff5252',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
    marginTop: 20,
  },
  modalCloseButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  pokemonDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 15,
    marginHorizontal: 10,
    lineHeight: 20,
    fontStyle: 'italic',
  },
}); 