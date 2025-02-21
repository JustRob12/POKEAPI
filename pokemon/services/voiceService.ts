import * as Speech from 'expo-speech';

class PokemonVoiceService {
  speak(text: string) {
    Speech.stop();
    Speech.speak(text, {
      language: 'en',
      pitch: 1.0,
      rate: 0.9,
      voice: "com.apple.ttsbundle.Samantha-compact",
    });
  }

  stop() {
    Speech.stop();
  }
}

export const pokemonVoiceService = new PokemonVoiceService(); 