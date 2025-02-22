import React, { useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Animated,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Audio } from 'expo-av';
import { soundEffectService } from '../services/soundEffectService';

interface SplashScreenProps {
  onComplete: () => void;
}

const { width, height } = Dimensions.get('window');

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.3)).current;
  const slideAnim = useRef(new Animated.Value(height)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    startIntro();
    return () => {
      // Cleanup any playing intro music when component unmounts
      const sound = soundEffectService.sounds?.introMusic;
      if (sound) {
        sound.stopAsync();
      }
    };
  }, []);

  const startIntro = async () => {
    // Stop any existing intro music first
    const sound = soundEffectService.sounds?.introMusic;
    if (sound) {
      await sound.stopAsync();
      await sound.setPositionAsync(0); // Reset to beginning
    }
    
    // Start animations and play intro music
    startAnimations();
    await soundEffectService.playSound('introMusic');
  };

  const startAnimations = () => {
    Animated.sequence([
      // Fade in and scale up the Pokéball
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 8,
          tension: 40,
          useNativeDriver: true,
        }),
      ]),
      // Rotate the Pokéball
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      // Slide up the title
      Animated.spring(slideAnim, {
        toValue: 0,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const handleStart = async () => {
    const sound = soundEffectService.sounds?.introMusic;
    if (sound) {
      await sound.stopAsync();
    }
    await soundEffectService.playSound('startSound');
    onComplete();
  };

  return (
    <LinearGradient
      colors={['#ff0000', '#cc0000']}
      style={styles.container}
    >
      <Animated.View
        style={[
          styles.logoContainer,
          {
            opacity: fadeAnim,
            transform: [
              { scale: scaleAnim },
              { rotate: spin },
            ],
          },
        ]}
      >
        <Image
          source={require('../assets/pokeball.png')}
          style={styles.pokeball}
        />
      </Animated.View>

      <Animated.View
        style={[
          styles.titleContainer,
          {
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <Text style={styles.title}>Pokédex</Text>
        <Text style={styles.subtitle}>Your Journey Begins Here</Text>

        <TouchableOpacity
          style={styles.startButton}
          onPress={handleStart}
        >
          <Text style={styles.startButtonText}>START</Text>
        </TouchableOpacity>
      </Animated.View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: 50,
  },
  pokeball: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  titleContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 3,
  },
  subtitle: {
    fontSize: 18,
    color: 'white',
    marginTop: 10,
    opacity: 0.9,
  },
  startButton: {
    backgroundColor: 'white',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 25,
    marginTop: 30,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  startButtonText: {
    color: '#cc0000',
    fontSize: 18,
    fontWeight: 'bold',
  },
}); 