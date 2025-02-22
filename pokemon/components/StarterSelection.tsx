import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  Image,
  Dimensions,
  ImageBackground,
  Modal,
  ScrollView
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Pokemon, STARTERS } from '../types/pokemon';
import { soundEffectService } from '../services/soundEffectService';

interface StarterSelectionProps {
  onSelect: (pokemon: Pokemon) => void;
}

const regions = [
  { name: "KANTO", gen: 1, gradient: ['#FF4E50', '#F9D423'] as const },
  { name: "JOHTO", gen: 2, gradient: ['#4776E6', '#8E54E9'] as const },
  { name: "HOENN", gen: 3, gradient: ['#00B4DB', '#0083B0'] as const },
  { name: "SINNOH", gen: 4, gradient: ['#834d9b', '#d04ed6'] as const },
  { name: "UNOVA", gen: 5, gradient: ['#1D976C', '#93F9B9'] as const },
  { name: "KALOS", gen: 6, gradient: ['#2C3E50', '#3498db'] as const }
];

export const StarterSelection: React.FC<StarterSelectionProps> = ({ onSelect }) => {
  const [selectedRegion, setSelectedRegion] = useState(regions[0]);
  const [showRegionModal, setShowRegionModal] = useState(false);

  const getStartersByRegion = (gen: number) => {
    const startIndex = (gen - 1) * 3;
    return STARTERS.slice(startIndex, startIndex + 3);
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

  const handleRegionSelect = async (region: typeof regions[0]) => {
    await soundEffectService.playSound('regionSelect');
    setSelectedRegion(region);
    setShowRegionModal(false);
  };

  return (
    <ImageBackground 
      source={require('../assets/pokeball-background.png')}
      style={styles.container}
      imageStyle={styles.backgroundImage}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Every Journey Starts with a Choice</Text>
          <Text style={styles.subtitle}>Choose your first partner carefully</Text>
        </View>

        <TouchableOpacity 
          style={styles.regionDropdown}
          onPress={() => setShowRegionModal(true)}
        >
          <LinearGradient
            colors={selectedRegion.gradient}
            style={styles.dropdownGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.selectedRegionText}>{selectedRegion.name} REGION</Text>
            <Text style={styles.dropdownIcon}>▼</Text>
          </LinearGradient>
        </TouchableOpacity>

        <View style={styles.starterTriangle}>
          <View style={styles.topStarter}>
            <LinearGradient
              colors={getTypeGradient('fire')}
              style={styles.starterGradient}
            >
              <TouchableOpacity
                style={styles.starterButton}
                onPress={() => onSelect(getStartersByRegion(selectedRegion.gen)[1])}
              >
                <Image
                  source={{
                    uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${getStartersByRegion(selectedRegion.gen)[1].id}.png`
                  }}
                  style={styles.pokemonImage}
                />
                <View style={styles.pokemonInfo}>
                  <Text style={styles.pokemonName}>
                    {getStartersByRegion(selectedRegion.gen)[1].name}
                  </Text>
                  <View style={styles.typeTag}>
                    <Text style={styles.pokemonType}>
                      {getStartersByRegion(selectedRegion.gen)[1].type}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </LinearGradient>
          </View>

          <View style={styles.bottomStarters}>
            {[0, 2].map((index) => (
              <LinearGradient
                key={index}
                colors={getTypeGradient(index === 0 ? 'grass' : 'water')}
                style={styles.starterGradient}
              >
                <TouchableOpacity
                  style={styles.starterButton}
                  onPress={() => onSelect(getStartersByRegion(selectedRegion.gen)[index])}
                >
                  <Image
                    source={{
                      uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${getStartersByRegion(selectedRegion.gen)[index].id}.png`
                    }}
                    style={styles.pokemonImage}
                  />
                  <View style={styles.pokemonInfo}>
                    <Text style={styles.pokemonName}>
                      {getStartersByRegion(selectedRegion.gen)[index].name}
                    </Text>
                    <View style={styles.typeTag}>
                      <Text style={styles.pokemonType}>
                        {getStartersByRegion(selectedRegion.gen)[index].type}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </LinearGradient>
            ))}
          </View>
        </View>

        <Modal
          visible={showRegionModal}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setShowRegionModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Select Region</Text>
              <ScrollView style={styles.regionList}>
                {regions.map((region) => (
                  <TouchableOpacity
                    key={region.name}
                    style={styles.regionOption}
                    onPress={() => handleRegionSelect(region)}
                  >
                    <LinearGradient
                      colors={region.gradient}
                      style={styles.regionOptionGradient}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                    >
                      <Text style={styles.regionOptionText}>{region.name}</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                ))}
              </ScrollView>
              <TouchableOpacity 
                style={styles.closeButton}
                onPress={() => setShowRegionModal(false)}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </ImageBackground>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  backgroundImage: {
    opacity: 0.05,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  regionDropdown: {
    marginBottom: 30,
    borderRadius: 25,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  dropdownGradient: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  selectedRegionText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  dropdownIcon: {
    fontSize: 18,
    color: '#fff',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    maxHeight: '70%',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  regionList: {
    marginBottom: 20,
  },
  regionOption: {
    marginBottom: 10,
    borderRadius: 15,
    overflow: 'hidden',
  },
  regionOptionGradient: {
    padding: 15,
  },
  regionOptionText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: '#666',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  starterTriangle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  topStarter: {
    marginBottom: 30,
    alignItems: 'center',
  },
  bottomStarters: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    gap: 20,
  },
  starterGradient: {
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5.84,
  },
  starterButton: {
    width: width * 0.42,
    aspectRatio: 0.9,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pokemonImage: {
    width: '100%',
    height: '75%',
    resizeMode: 'contain',
  },
  pokemonInfo: {
    alignItems: 'center',
    marginTop: 8,
  },
  pokemonName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  typeTag: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 4,
  },
  pokemonType: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
}); 