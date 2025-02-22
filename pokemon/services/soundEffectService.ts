import { Audio } from 'expo-av';

class SoundEffectService {
  private sounds: { [key: string]: Audio.Sound } = {};
  private volume: number = 1.0;

  async loadSounds() {
    try {
      const buttonClick = new Audio.Sound();
      const regionSelect = new Audio.Sound();
      const pageFlip = new Audio.Sound();
      const startSound = new Audio.Sound();
      const introMusic = new Audio.Sound();

      await Promise.all([
        buttonClick.loadAsync(require('../assets/sounds/button-click.m4a')),
        regionSelect.loadAsync(require('../assets/sounds/button-click.m4a')),
        pageFlip.loadAsync(require('../assets/sounds/button-click.m4a')),
        startSound.loadAsync(require('../assets/sounds/button-click.m4a')),
        introMusic.loadAsync(require('../assets/sounds/intro.m4a')),
      ]);

      this.sounds = {
        buttonClick,
        regionSelect,
        pageFlip,
        startSound,
        introMusic,
      };
    } catch (error) {
      console.error('Error loading sounds:', error);
    }
  }

  async playSound(soundName: 'buttonClick' | 'regionSelect' | 'pageFlip' | 'startSound' | 'introMusic') {
    try {
      const sound = this.sounds[soundName];
      if (sound) {
        await sound.setVolumeAsync(this.volume);
        await sound.replayAsync();
      }
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  }

  async setVolume(volume: number) {
    this.volume = Math.max(0, Math.min(1, volume));
  }

  async unloadSounds() {
    try {
      await Promise.all(
        Object.values(this.sounds).map(sound => sound.unloadAsync())
      );
    } catch (error) {
      console.error('Error unloading sounds:', error);
    }
  }
}

export const soundEffectService = new SoundEffectService(); 