import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  Modal,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { musicService } from '../services/musicService';
import { pokemonVoiceService } from '../services/voiceService';
import Slider from '@react-native-community/slider';
import { soundEffectService } from '../services/soundEffectService';

interface SettingsProps {
  visible: boolean;
  onClose: () => void;
  onResetStarter: () => void;
}

export const Settings: React.FC<SettingsProps> = ({ 
  visible, 
  onClose,
  onResetStarter 
}) => {
  const [musicVolume, setMusicVolume] = useState(0.1);
  const [voiceVolume, setVoiceVolume] = useState(1.0);
  const [showCredits, setShowCredits] = useState(false);

  const handleMusicVolumeChange = async (value: number) => {
    setMusicVolume(value);
    await musicService.setVolume(value);
  };

  const handleVoiceVolumeChange = async (value: number) => {
    setVoiceVolume(value);
    await pokemonVoiceService.setVolume(value);
  };

  const handleClose = async () => {
    await soundEffectService.playSound('buttonClick');
    onClose();
  };

  const handleResetStarter = async () => {
    await soundEffectService.playSound('buttonClick');
    Alert.alert(
      "Reset Starter Pokémon",
      "Are you sure you want to reset your starter Pokémon? This will reset all settings to default.",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Reset", 
          style: "destructive",
          onPress: async () => {
            await soundEffectService.playSound('buttonClick');
            setMusicVolume(0.1);  // Reset to default 10%
            setVoiceVolume(1.0);  // Reset to default 100%
            onResetStarter();
          }
        }
      ]
    );
  };

  const handleShowCredits = async () => {
    await soundEffectService.playSound('buttonClick');
    setShowCredits(true);
  };

  const handleCloseCredits = async () => {
    await soundEffectService.playSound('buttonClick');
    setShowCredits(false);
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Settings</Text>
          
          <View style={styles.volumeControl}>
            <Text style={styles.volumeLabel}>Background Music</Text>
            <Slider
              style={styles.slider}
              value={musicVolume}
              onValueChange={handleMusicVolumeChange}
              minimumValue={0}
              maximumValue={1}
              step={0.1}
              minimumTrackTintColor="#ff0000"
              maximumTrackTintColor="#d3d3d3"
              thumbTintColor="#ff0000"
            />
            <Text style={styles.volumeValue}>{Math.round(musicVolume * 100)}%</Text>
          </View>

          <View style={styles.volumeControl}>
            <Text style={styles.volumeLabel}>Pokédex Voice</Text>
            <Slider
              style={styles.slider}
              value={voiceVolume}
              onValueChange={handleVoiceVolumeChange}
              minimumValue={0}
              maximumValue={1}
              step={0.1}
              minimumTrackTintColor="#ff0000"
              maximumTrackTintColor="#d3d3d3"
              thumbTintColor="#ff0000"
            />
            <Text style={styles.volumeValue}>{Math.round(voiceVolume * 100)}%</Text>
          </View>

          <TouchableOpacity 
            style={styles.option}
            onPress={handleShowCredits}
          >
            <Text style={styles.optionText}>Credits</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.option}
            onPress={handleResetStarter}
          >
            <Text style={styles.optionText}>Reset Starter Pokémon</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.closeButton}
            onPress={handleClose}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>

          {/* Credits Modal */}
          <Modal
            visible={showCredits}
            transparent={true}
            animationType="fade"
            onRequestClose={handleCloseCredits}
          >
            <View style={styles.modalOverlay}>
              <View style={[styles.modalContent, styles.creditsContent]}>
                <Text style={styles.creditsTitle}>Credits</Text>
                
                <Text style={styles.developerName}>Roberto Prisoris</Text>
                <Text style={styles.developerRole}>Developer</Text>

                <View style={styles.specialThanks}>
                  <Text style={styles.thanksTitle}>Special Thanks</Text>
                  <Text style={styles.thanksText}>
                    To Lady, my GF, for keeping supporting me
                  </Text>
                </View>

                <TouchableOpacity 
                  style={styles.closeButton}
                  onPress={handleCloseCredits}
                >
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
    width: '80%',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  volumeControl: {
    width: '100%',
    marginBottom: 20,
  },
  volumeLabel: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  volumeValue: {
    fontSize: 14,
    color: '#666',
    textAlign: 'right',
  },
  option: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    marginBottom: 10,
  },
  optionText: {
    fontSize: 16,
    color: '#ff3333',
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: '#666',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 10,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  creditsContent: {
    alignItems: 'center',
    maxWidth: '90%',
  },
  creditsTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  developerName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ff3333',
    marginBottom: 5,
  },
  developerRole: {
    fontSize: 18,
    color: '#666',
    marginBottom: 30,
  },
  specialThanks: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 30,
  },
  thanksTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  thanksText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    fontStyle: 'italic',
    lineHeight: 24,
  },
}); 