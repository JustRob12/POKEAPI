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
import { GEN1_POKEMON } from '../data/gen1Pokemon';
import { GEN2_POKEMON } from '../data/gen2Pokemon';
import { GEN3_POKEMON } from '../data/gen3Pokemon';
import { GEN4_POKEMON } from '../data/gen4Pokemon';
import { GEN5_POKEMON } from '../data/gen5Pokemon';
import { GEN6_POKEMON } from '../data/gen6Pokemon';
import { POKEMON_DESCRIPTIONS } from '../data/pokemonDescriptions';
import { pokemonVoiceService } from '../services/voiceService';
import { soundEffectService } from '../services/soundEffectService';

interface PokedexProps {
  starterPokemon: Pokemon;
  onOpenSettings: () => void;
}

// Add this type for the generation data
type GenerationKey = "Kanto" | "Johto" | "Hoenn" | "Sinnoh" | "Unova" | "Kalos";

export const Pokedex: React.FC<PokedexProps> = ({ starterPokemon, onOpenSettings }) => {
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [selectedGeneration, setSelectedGeneration] = useState<GenerationKey>("Kanto");
  const hpWidth = useRef(new Animated.Value(0)).current;
  const attackWidth = useRef(new Animated.Value(0)).current;
  const defenseWidth = useRef(new Animated.Value(0)).current;
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Show 3 Pokémon per row, 2 rows

  const generationData: Record<GenerationKey, Pokemon[]> = {
    "Kanto": GEN1_POKEMON,
    "Johto": GEN2_POKEMON,
    "Hoenn": GEN3_POKEMON,
    "Sinnoh": GEN4_POKEMON,
    "Unova": GEN5_POKEMON,
    "Kalos": GEN6_POKEMON,
  };

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

      // Play the Pokédex description with name
      const description = POKEMON_DESCRIPTIONS[selectedPokemon.id];
      if (description) {
        const pokedexText = `${selectedPokemon.name}. ${description}`;
        pokemonVoiceService.speak(pokedexText);
      }
    }
    return () => {
      pokemonVoiceService.stop();
    };
  }, [selectedPokemon]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedGeneration]);

  const handlePokemonPress = async (pokemon: Pokemon) => {
    await soundEffectService.playSound('buttonClick');
    setSelectedPokemon(pokemon);
  };

  const handleCloseModal = () => {
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

  // First, create a helper function to split Pokemon into rows
  const splitIntoRows = (pokemon: Pokemon[], rowCount: number) => {
    const result: Pokemon[][] = [];
    const itemsPerRow = 3; // Fixed to 3 columns
    
    for (let i = 0; i < rowCount; i++) {
      result.push(pokemon.slice(i * itemsPerRow, (i + 1) * itemsPerRow));
    }
    
    return result;
  };

  // Add pagination helper functions
  const getCurrentPagePokemon = (pokemonList: Pokemon[]) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return pokemonList.slice(startIndex, startIndex + itemsPerPage);
  };

  const getTotalPages = (pokemonList: Pokemon[]) => {
    return Math.ceil(pokemonList.length / itemsPerPage);
  };

  const renderGeneration = (pokemon: Pokemon[], genName: string) => {
    const totalPages = getTotalPages(pokemon);
    const currentPokemon = getCurrentPagePokemon(pokemon);

    return (
      <View style={styles.generationSection}>
        <Text style={styles.sectionTitle}>{genName}</Text>
        <View style={styles.allRowsContainer}>
          {splitIntoRows(currentPokemon, 2).map((row, rowIndex) => (
            <View key={rowIndex} style={styles.rowContainer}>
              {row.map((pokemon) => (
                <TouchableOpacity
                  key={pokemon.id}
                  style={styles.gridItem}
                  onPress={() => handlePokemonPress(pokemon)}
                >
                  <Image
                    source={{
                      uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.id}.png`,
                    }}
                    style={styles.gridImage}
                  />
                  <Text style={styles.gridPokemonName}>{pokemon.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>
        
        <View style={styles.paginationContainer}>
          
          <TouchableOpacity 
          
            style={[styles.pageButton, currentPage === 1 && styles.pageButtonDisabled]}
            onPress={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
          >
            <Text style={styles.pageButtonText} onPress={handlePrevious}>Previous</Text>
            
          </TouchableOpacity>
          
          <Text style={styles.pageText}>Page {currentPage} of {totalPages}</Text>
          
          <TouchableOpacity 
            style={[styles.pageButton, currentPage === totalPages && styles.pageButtonDisabled]}
            onPress={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
          >
            <Text style={styles.pageButtonText} onPress={handleNext}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const handleNext = async () => {
    await soundEffectService.playSound('buttonClick');
    setCurrentPage(prev => Math.min(getTotalPages(generationData[selectedGeneration]), prev + 1));
  };

  const handlePrevious = async () => {
    await soundEffectService.playSound('buttonClick');
    setCurrentPage(prev => Math.max(1, prev - 1));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Pokédex</Text>
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={onOpenSettings}
        >
          <Text style={styles.settingsButtonText}>⚙️</Text>
        </TouchableOpacity>
      </View>
      
      {/* Starter Pokemon Section - Fixed */}
      <View style={styles.starterSection}>
        <Text style={styles.sectionTitle}>Your Starter Pokémon</Text>
        <View style={styles.pokemonCard}>
          <Image
            source={{
              uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${starterPokemon.id}.png`,
            }}
            style={[styles.pokemonImage, { resizeMode: 'contain' }]}
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

      {/* Generation Selector */}
      <View style={styles.generationSelector}>
        <Text style={styles.sectionTitle}>Select Region:</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.generationScroll}
        >
          {Object.keys(generationData).map((gen) => (
            <TouchableOpacity
              key={gen}
              style={[
                styles.generationButton,
                selectedGeneration === gen && styles.selectedGenerationButton
              ]}
              onPress={() => setSelectedGeneration(gen as GenerationKey)}
            >
              <Text style={[
                styles.generationButtonText,
                selectedGeneration === gen && styles.selectedGenerationText
              ]}>
                {gen} Pokédex
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Pokemon List */}
      <ScrollView style={styles.mainScroll}>
        {renderGeneration(generationData[selectedGeneration], `${selectedGeneration} Pokédex`)}
      </ScrollView>

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
                    uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${selectedPokemon.id}.png`,
                  }}
                  style={[styles.modalImage, { resizeMode: 'contain' }]}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginVertical: 20,
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
    padding: 10,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    paddingHorizontal: 10,
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
    resizeMode: 'contain',
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
  scrollContainer: {
    flex: 1,
  },
  mainScroll: {
    flex: 1,
  },
  generationSection: {
    flex: 1,
    paddingHorizontal: 10,
  },
  horizontalScroll: {
    height: 320,
  },
  allRowsContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    marginBottom: 5,
  },
  gridItem: {
    width: '31%', // Slightly less than 33.33% to account for margins
    aspectRatio: 0.8,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  gridImage: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain',
  },
  gridPokemonName: {
    fontSize: 12,
    fontWeight: '600',
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
    resizeMode: 'contain',
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
  settingsButton: {
    padding: 10,
  },
  settingsButtonText: {
    fontSize: 24,
  },
  generationSelector: {
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  generationScroll: {
    flexGrow: 0,
  },
  generationButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    marginRight: 10,
    marginVertical: 5,
  },
  selectedGenerationButton: {
    backgroundColor: '#ff5252',
  },
  generationButtonText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '600',
  },
  selectedGenerationText: {
    color: 'white',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  pageButton: {
    backgroundColor: '#ff5252',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  pageButtonDisabled: {
    backgroundColor: '#cccccc',
  },
  pageButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  pageText: {
    fontSize: 14,
    color: '#666',
  },
}); 