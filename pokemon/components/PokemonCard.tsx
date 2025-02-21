import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, Animated, Modal, Dimensions } from 'react-native';
import { Pokemon } from '../types/pokemon';

interface PokemonCardProps {
  pokemon: Pokemon;
  onBack: () => void;
  onChoose: (pokemon: Pokemon) => void;
}

export const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon, onBack, onChoose }) => {
  const [showModal, setShowModal] = useState(false);
  const modalAnimation = useRef(new Animated.Value(0)).current;
  const hpWidth = useRef(new Animated.Value(0)).current;
  const attackWidth = useRef(new Animated.Value(0)).current;
  const defenseWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animate all bars sequentially
    Animated.sequence([
      Animated.timing(hpWidth, {
        toValue: (pokemon.stats.hp / 150) * 100,
        duration: 800,
        useNativeDriver: false,
      }),
      Animated.timing(attackWidth, {
        toValue: (pokemon.stats.attack / 150) * 100,
        duration: 800,
        useNativeDriver: false,
      }),
      Animated.timing(defenseWidth, {
        toValue: (pokemon.stats.defense / 150) * 100,
        duration: 800,
        useNativeDriver: false,
      }),
    ]).start();
  }, []);

  const handleChoose = () => {
    setShowModal(true);
    Animated.spring(modalAnimation, {
      toValue: 1,
      friction: 8,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  const closeModal = () => {
    Animated.timing(modalAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setShowModal(false);
      onChoose(pokemon);
    });
  };

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'water': return '#6890F0';
      case 'fire': return '#F08030';
      case 'grass': return '#78C850';
      default: return '#A8A878';
    }
  };

  return (
    <View style={styles.pokemonCard}>
      <Image
        source={{
          uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`,
        }}
        style={styles.pokemonImage}
      />
      <Text style={styles.pokemonName}>{pokemon.name}</Text>
      <View style={[styles.typeContainer, { backgroundColor: getTypeColor(pokemon.type) }]}>
        <Text style={styles.pokemonType}>{pokemon.type}</Text>
      </View>
      
      <View style={styles.statsContainer}>
        <Text style={styles.statsTitle}>Base Stats</Text>
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
          <Text style={styles.statValue}>{pokemon.stats.hp}</Text>
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
          <Text style={styles.statValue}>{pokemon.stats.attack}</Text>
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
          <Text style={styles.statValue}>{pokemon.stats.defense}</Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.chooseButton} onPress={handleChoose}>
          <Text style={styles.chooseButtonText}>I Choose You!</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>← Back to Selection</Text>
        </TouchableOpacity>
      </View>

      <Modal
        transparent={true}
        visible={showModal}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <Animated.View 
            style={[
              styles.modalContent,
              {
                transform: [
                  {
                    scale: modalAnimation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.3, 1],
                    }),
                  },
                ],
                opacity: modalAnimation,
              },
            ]}
          >
            <Image
              source={{
                uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`,
              }}
              style={styles.modalImage}
            />
            <Text style={styles.modalTitle}>Congratulations!</Text>
            <Text style={styles.modalText}>
              You chose {pokemon.name}!{'\n'}Start Your Journey
            </Text>
            <TouchableOpacity 
              style={styles.modalButton}
              onPress={closeModal}
            >
              <Text style={styles.modalButtonText}>Let's Go!</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  pokemonCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    margin: 10,
    width: 300,
  },
  pokemonImage: {
    width: 200,
    height: 200,
  },
  pokemonName: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333',
  },
  typeContainer: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 15,
    marginTop: 8,
  },
  pokemonType: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  statsContainer: {
    width: '100%',
    marginTop: 20,
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 15,
  },
  statsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
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
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  chooseButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginBottom: 10,
  },
  chooseButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  backButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#666',
    borderRadius: 25,
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
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
    alignItems: 'center',
    width: Dimensions.get('window').width * 0.8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalImage: {
    width: 150,
    height: 150,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  modalText: {
    fontSize: 18,
    color: '#666',
    marginTop: 10,
    textAlign: 'center',
    lineHeight: 24,
  },
  modalButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 20,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
}); 