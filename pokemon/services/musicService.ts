import { Audio } from 'expo-av';

class MusicService {
  private backgroundMusic: Audio.Sound | null = null;
  private volume: number = 0.1;

  async playBackgroundMusic() {
    try {
      if (this.backgroundMusic) {
        await this.backgroundMusic.stopAsync();
      }

      const { sound } = await Audio.Sound.createAsync(
        require('../assets/music/background-music.mp3'),
        {
          isLooping: true,
          shouldPlay: true,
          volume: 0.1,
        }
      );
      
      this.backgroundMusic = sound;
    } catch (error) {
      console.error('Error playing background music:', error);
    }
  }

  async stopBackgroundMusic() {
    try {
      if (this.backgroundMusic) {
        await this.backgroundMusic.stopAsync();
        await this.backgroundMusic.unloadAsync();
        this.backgroundMusic = null;
      }
    } catch (error) {
      console.error('Error stopping background music:', error);
    }
  }

  async setVolume(volume: number) {
    try {
      if (this.backgroundMusic) {
        await this.backgroundMusic.setVolumeAsync(Math.max(0, Math.min(1, volume)));
      }
    } catch (error) {
      console.error('Error setting volume:', error);
    }
  }
}

export const musicService = new MusicService(); 