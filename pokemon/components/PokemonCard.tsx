import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, Animated, Modal, Dimensions } from 'react-native';
import { Pokemon } from '../types/pokemon';
import { POKEMON_DESCRIPTIONS } from '../data/pokemonDescriptions';
import { pokemonVoiceService } from '../services/voiceService';
import { LinearGradient } from 'expo-linear-gradient';
import { soundEffectService } from '../services/soundEffectService';

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

    // Play the Pokédex description when the card appears
    const description = POKEMON_DESCRIPTIONS[pokemon.id];
    if (description) {
      pokemonVoiceService.speak(description);
    }

    return () => {
      // Cleanup: stop any ongoing speech when component unmounts
      pokemonVoiceService.stop();
    };
  }, []);

  const handleChoose = async () => {
    await soundEffectService.playSound('buttonClick');
    pokemonVoiceService.stop(); // Stop any ongoing speech
    setShowModal(true);
    Animated.spring(modalAnimation, {
      toValue: 1,
      friction: 8,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  const handleLetsGo = async () => {
    await soundEffectService.playSound('buttonClick');
    setShowModal(false);
    onChoose(pokemon);
  };

  const getTypeGradient = (type: string): readonly [string, string] => {
    const baseType = type.split('/')[0].toLowerCase();
    switch (baseType) {
      case 'grass': return ['#56ab2f', '#a8e063'] as const;
      case 'fire': return ['#f12711', '#f5af19'] as const;
      case 'water': return ['#1488CC', '#2B32B2'] as const;
      default: return ['#808080', '#3fada8'] as const;
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={getTypeGradient(pokemon.type)}
        style={styles.pokemonCard}
      >
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.pokemonNumber}>#{pokemon.id.toString().padStart(3, '0')}</Text>
        </View>

        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.id}.png`,
            }}
            style={styles.pokemonImage}
          />
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.pokemonName}>{pokemon.name}</Text>
          <View style={styles.typeContainer}>
            <Text style={styles.pokemonType}>{pokemon.type}</Text>
          </View>

          <View style={styles.statsContainer}>
            <Text style={styles.statsTitle}>Base Stats</Text>
            {[
              { label: 'HP', value: pokemon.stats.hp, color: '#FF5959' },
              { label: 'Attack', value: pokemon.stats.attack, color: '#F5AC78' },
              { label: 'Defense', value: pokemon.stats.defense, color: '#FAE078' }
            ].map((stat, index) => (
              <View key={stat.label} style={styles.statRow}>
                <Text style={styles.statLabel}>{stat.label}</Text>
                <View style={styles.statBarContainer}>
                  <Animated.View 
                    style={[
                      styles.statBar,
                      { 
                        width: [hpWidth, attackWidth, defenseWidth][index].interpolate({
                          inputRange: [0, 100],
                          outputRange: ['0%', '100%'],
                        }),
                        backgroundColor: stat.color
                      }
                    ]} 
                  />
                </View>
                <Text style={styles.statValue}>{stat.value}</Text>
              </View>
            ))}
          </View>

          <View style={styles.descriptionContainer}>
            <Text style={styles.description}>
              {POKEMON_DESCRIPTIONS[pokemon.id]}
            </Text>
          </View>

          <TouchableOpacity 
            style={styles.chooseButton}
            onPress={handleChoose}
          >
            <Text style={styles.chooseButtonText}>I Choose You!</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <Modal
        transparent={true}
        visible={showModal}
        onRequestClose={handleLetsGo}
      >
        <View style={styles.modalOverlay}>
          <Animated.View style={[styles.modalContent, {
            transform: [{
              scale: modalAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: [0.3, 1],
              }),
            }],
            opacity: modalAnimation,
          }]}>
            <LinearGradient
              colors={getTypeGradient(pokemon.type)}
              style={styles.modalGradient}
            >
              <Image
                source={{
                  uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.id}.png`,
                }}
                style={styles.modalImage}
              />
              <Text style={styles.modalTitle}>Congratulations!</Text>
              <Text style={styles.modalText}>
                You chose {pokemon.name}!{'\n'}Start Your Journey
              </Text>
              <TouchableOpacity 
                style={styles.modalButton}
                onPress={handleLetsGo}
              >
                <Text style={styles.modalButtonText}>Let's Go!</Text>
              </TouchableOpacity>
            </LinearGradient>
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  pokemonCard: {
    width: '90%',
    maxWidth: 400,
    borderRadius: 25,
    overflow: 'hidden',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    zIndex: 2,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  pokemonNumber: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    opacity: 0.8,
  },
  imageContainer: {
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 1,
  },
  pokemonImage: {
    width: 280,
    height: 280,
    resizeMode: 'contain',
  },
  infoCard: {
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 25,
    marginTop: 200,
  },
  pokemonName: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    marginBottom: 10,
  },
  typeContainer: {
    alignSelf: 'center',
    backgroundColor: 'rgba(0,0,0,0.1)',
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 20,
    marginBottom: 20,
  },
  pokemonType: {
    fontSize: 16,
    color: '#666',
    fontWeight: '600',
  },
  statsContainer: {
    marginBottom: 20,
  },
  statsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  statLabel: {
    width: 70,
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  statBarContainer: {
    flex: 1,
    height: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    marginHorizontal: 10,
  },
  statBar: {
    height: '100%',
    borderRadius: 4,
  },
  statValue: {
    width: 30,
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  descriptionContainer: {
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 15,
    marginBottom: 20,
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    fontStyle: 'italic',
  },
  chooseButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  chooseButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '85%',
    maxWidth: 400,
    borderRadius: 25,
    overflow: 'hidden',
  },
  modalGradient: {
    padding: 25,
    alignItems: 'center',
  },
  modalImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  modalTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 15,
  },
  modalText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 24,
  },
  modalButton: {
    backgroundColor: 'rgba(255,255,255,0.3)',
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