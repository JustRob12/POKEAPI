import * as Speech from 'expo-speech';
import { Platform } from 'react-native';
import { Audio } from 'expo-av';

class PokemonVoiceService {
  private isSpeaking: boolean = false;
  private volume: number = 1.0;

  async setVolume(volume: number) {
    this.volume = Math.max(0, Math.min(1, volume));
  }

  async speak(text: string) {
    try {
      // Stop any ongoing speech
      if (this.isSpeaking) {
        await this.stop();
      }

      // Format text for better pronunciation
      const formattedText = text
        .replace(/\./g, '... ')
        .replace(/,/g, ', ')
        .replace(/Pokémon/g, 'Pokemon');

      this.isSpeaking = true;
      
      const options = {
        language: 'en-US',
        pitch: 0.8,
        rate: Platform.OS === 'android' ? 0.75 : 0.85,
        volume: this.volume,
        voice: Platform.select({
          ios: "com.apple.speech.synthesis.voice.samantha",
          android: "en-us-x-sfg#female_1",
          default: "Samantha",
        }),
        onDone: () => {
          this.isSpeaking = false;
        },
        onError: (error: any) => {
          console.error('Speech error:', error);
          this.isSpeaking = false;
        }
      };

      // Add electronic beep sound effect before speaking
      const beepSound = new Audio.Sound();
      await beepSound.loadAsync(require('../assets/sounds/pokedex-beep.m4a'));
      await beepSound.playAsync();
      
      // Short delay after beep
      await new Promise(resolve => setTimeout(resolve, 300));

      await Speech.speak(formattedText, options);
    } catch (error) {
      console.error('Error in speak:', error);
      this.isSpeaking = false;
    }
  }

  async stop() {
    try {
      await Speech.stop();
      this.isSpeaking = false;
    } catch (error) {
      console.error('Error stopping speech:', error);
    }
  }

  isCurrentlySpeaking(): boolean {
    return this.isSpeaking;
  }
}

export const pokemonVoiceService = new PokemonVoiceService();