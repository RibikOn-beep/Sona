import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import TrackPlayer from 'react-native-track-player';
import TabNavigator from './src/navigation/TabNavigator';
import { SonaProvider } from './src/context/SonaContext';
import { playbackService } from './src/services/playbackService';

TrackPlayer.registerPlaybackService(() => playbackService);

export default function App() {
  useEffect(() => {
    setupPlayer();
  }, []);

  const setupPlayer = async () => {
    try {
      await TrackPlayer.setupPlayer({
        maxCacheSize: 1024 * 50,
      });
      await TrackPlayer.updateOptions({
        capabilities: [],
        compactCapabilities: [],
        progressUpdateEventInterval: 1,
      });
    } catch (e) {
    }
  };

  return (
    <SonaProvider>
      <NavigationContainer>
        <StatusBar style="light" />
        <TabNavigator />
      </NavigationContainer>
    </SonaProvider>
  );
}
