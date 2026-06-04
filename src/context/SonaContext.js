import { createContext, useContext, useState, useRef } from 'react';

const SonaContext = createContext(null);

export function SonaProvider({ children }) {
  const [activeSounds, setActiveSounds] = useState([]);
  const [activeStory, setActiveStory] = useState(null);
  const [timerMinutes, setTimerMinutes] = useState(null);
  const [alarmTime, setAlarmTime] = useState(null);
  const [savedAtmospheres, setSavedAtmospheres] = useState([]);

  const addSound = (sound) => {
    if (activeSounds.length >= 4) return;
    if (activeSounds.find(s => s.id === sound.id)) return;
    setActiveSounds(prev => [...prev, { ...sound, volume: 0.7 }]);
  };

  const removeSound = (soundId) => {
    setActiveSounds(prev => prev.filter(s => s.id !== soundId));
  };

  const updateVolume = (soundId, volume) => {
    setActiveSounds(prev =>
      prev.map(s => s.id === soundId ? { ...s, volume } : s)
    );
  };

  const saveAtmosphere = (name) => {
    if (activeSounds.length === 0) return;
    const atmosphere = {
      id: Date.now().toString(),
      name,
      sounds: [...activeSounds],
      createdAt: new Date().toISOString(),
    };
    setSavedAtmospheres(prev => [...prev, atmosphere].slice(0, 10));
  };

  const loadAtmosphere = (atmosphere) => {
    setActiveSounds(atmosphere.sounds);
  };

  return (
    <SonaContext.Provider value={{
      activeSounds,
      activeStory,
      timerMinutes,
      alarmTime,
      savedAtmospheres,
      addSound,
      removeSound,
      updateVolume,
      saveAtmosphere,
      loadAtmosphere,
      setActiveStory,
      setTimerMinutes,
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
