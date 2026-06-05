import { Audio } from 'expo-av';

class AudioService {
  constructor() {
    this.activeSounds = {};
    this.isInitialized = false;
  }

  async init() {
    if (this.isInitialized) return;
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      staysActiveInBackground: true,
      playsInSilentModeIOS: true,
    });
    this.isInitialized = true;
  }

  async stopAll() {
    for (const key of Object.keys(this.activeSounds)) {
      try {
        await this.activeSounds[key].stopAsync();
        await this.activeSounds[key].unloadAsync();
      } catch (e) {}
    }
    this.activeSounds = {};
  }

  async playSound(id, file, volume = 0.7) {
    await this.init();
    if (this.activeSounds[id]) {
      try {
        await this.activeSounds[id].setVolumeAsync(volume);
        return;
      } catch (e) {
        delete this.activeSounds[id];
      }
    }
    try {
      const { sound } = await Audio.Sound.createAsync(
        file,
        { isLooping: true, volume, shouldPlay: true }
      );
      this.activeSounds[id] = sound;
    } catch (e) {
      console.warn('AudioService.playSound error:', e);
    }
  }

  async stopSound(id) {
    if (!this.activeSounds[id]) return;
    try {
      await this.activeSounds[id].stopAsync();
      await this.activeSounds[id].unloadAsync();
    } catch (e) {}
    delete this.activeSounds[id];
  }

  async setVolume(id, volume) {
    if (!this.activeSounds[id]) return;
    try {
      await this.activeSounds[id].setVolumeAsync(volume);
    } catch (e) {}
  }

  async pauseAll() {
    for (const sound of Object.values(this.activeSounds)) {
      try { await sound.pauseAsync(); } catch (e) {}
    }
  }

  async resumeAll() {
    await this.init();
    for (const sound of Object.values(this.activeSounds)) {
      try { await sound.playAsync(); } catch (e) {}
    }
  }

  async fadeOutAndStop(durationSec = 120) {
    const steps = 30;
    const interval = (durationSec * 1000) / steps;
    let step = 0;

    return new Promise((resolve) => {
      const fadeInterval = setInterval(async () => {
        step++;
        const factor = 1 - (step / steps);
        for (const sound of Object.values(this.activeSounds)) {
          try { await sound.setVolumeAsync(Math.max(0, factor)); } catch (e) {}
        }
        if (step >= steps) {
          clearInterval(fadeInterval);
          await this.stopAll();
          resolve();
        }
      }, interval);
    });
  }

  getActiveIds() {
    return Object.keys(this.activeSounds);
  }

  hasActive() {
    return Object.keys(this.activeSounds).length > 0;
  }
}

export default new AudioService();
