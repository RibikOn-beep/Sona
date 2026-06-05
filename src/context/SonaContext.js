import { createContext, useContext, useState, useCallback } from 'react';
import AudioService from '../services/AudioService';

const SonaContext = createContext(null);

export function SonaProvider({ children }) {
  const [activeSounds, setActiveSounds] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeStory, setActiveStory] = useState(null);
  const [savedAtmospheres, setSavedAtmospheres] = useState([]);
  const [alarmTime, setAlarmTime] = useState(null);

  const loadStare = useCallback(async (sounds) => {
    await AudioService.stopAll();
    setActiveSounds([]);
    setIsPlaying(false);
    setActiveStory(null);

    const newSounds = sounds.map(s => ({ ...s, volume: 0.7 }));
    setActiveSounds(newSounds);

    for (const s of newSounds) {
      await AudioService.playSound(s.id, s.file, s.volume);
    }
    setIsPlaying(true);
  }, []);

  const addSound = useCallback(async (sound) => {
    if (activeSounds.length >= 4) return;
    if (activeSounds.find(s => s.id === sound.id)) return;
    const newSound = { ...sound, volume: 0.7 };
    setActiveSounds(prev => [...prev, newSound]);
    if (isPlaying) {
      await AudioService.playSound(newSound.id, newSound.file, newSound.volume);
    }
  }, [activeSounds, isPlaying]);

  const removeSound = useCallback(async (soundId) => {
    await AudioService.stopSound(soundId);
    setActiveSounds(prev => prev.filter(s => s.id !== soundId));
  }, []);

  const updateVolume = useCallback(async (soundId, volume) => {
    setActiveSounds(prev =>
      prev.map(s => s.id === soundId ? { ...s, volume } : s)
    );
    await AudioService.setVolume(soundId, volume);
  }, []);

  const play = useCallback(async () => {
    await AudioService.init();
    if (activeSounds.length === 0) return;
    for (const s of activeSounds) {
      await AudioService.playSound(s.id, s.file, s.volume);
    }
    setIsPlaying(true);
  }, [activeSounds]);

  const pause = useCallback(async () => {
    await AudioService.pauseAll();
    setIsPlaying(false);
  }, []);

  const stopAll = useCallback(async () => {
    await AudioService.stopAll();
    setActiveSounds([]);
    setIsPlaying(false);
  }, []);

  const saveAtmosphere = useCallback((name) => {
    if (activeSounds.length === 0) return;
    const atmosphere = {
      id: Date.now().toString(),
      name,
      sounds: [...activeSounds],
      createdAt: new Date().toISOString(),
    };
    setSavedAtmospheres(prev => [...prev, atmosphere].slice(0, 10));
  }, [activeSounds]);

  const loadAtmosphere = useCallback(async (atmosphere) => {
    await loadStare(atmosphere.sounds);
  }, [loadStare]);

  return (
    <SonaContext.Provider value={{
      activeSounds,
      isPlaying,
      activeStory,
      savedAtmospheres,
      alarmTime,
      addSound,
      removeSound,
      updateVolume,
      play,
      pause,
      stopAll,
      loadStare,
      saveAtmosphere,
      loadAtmosphere,
      setActiveStory,
      setAlarmTime,
      setSavedAtmospheres,
    }}>
      {children}
    </SonaContext.Provider>
  );
}

export const useSona = () => {
  const ctx = useContext(SonaContext);
  if (!ctx) throw new Error('useSona must be used within SonaProvider');
  return ctx;
};
