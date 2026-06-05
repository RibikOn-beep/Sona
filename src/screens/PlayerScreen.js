import { useState, useEffect, useRef } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, SafeAreaView, Modal, FlatList, TextInput
} from 'react-native';
import Slider from '@react-native-community/slider';
import { COLORS } from '../utils/colors';
import { useSona } from '../context/SonaContext';
import { LIBRARY } from '../data/library';

const TIMER_OPTIONS = [
  { label: '15 minute', value: 15 },
  { label: '30 minute', value: 30 },
  { label: '45 minute', value: 45 },
  { label: '60 minute', value: 60 },
  { label: '90 minute', value: 90 },
  { label: '3 ore', value: 180 },
  { label: '6 ore', value: 360 },
  { label: 'Loop infinit', value: -1 },
];

export default function PlayerScreen() {
  const { activeSounds, isPlaying, activeStory, addSound, removeSound, updateVolume, play, pause, stopAll, saveAtmosphere } = useSona();
  const [showLibrary, setShowLibrary] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showTimerModal, setShowTimerModal] = useState(false);
  const [atmosferaNume, setAtmosferaNume] = useState('');
  const [timerActiv, setTimerActiv] = useState(null);
  const [timerRamas, setTimerRamas] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('ploaie');
  const timerRef = useRef(null);
  const fadeRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (fadeRef.current) clearInterval(fadeRef.current);
    };
  }, []);

  const handleTogglePlay = async () => {
    if (isPlaying) {
      await pause();
    } else {
      await play();
    }
  };

  const handleVolumeChange = async (soundId, volume) => {
    await updateVolume(soundId, volume);
  };

  const handleRemoveSound = async (soundId) => {
    await removeSound(soundId);
  };

  const startTimer = (minute) => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (fadeRef.current) clearInterval(fadeRef.current);
    setShowTimerModal(false);

    if (minute === -1) {
      setTimerActiv(-1);
      setTimerRamas(-1);
      return;
    }

    const secunde = minute * 60;
    setTimerActiv(minute);
    setTimerRamas(secunde);

    timerRef.current = setInterval(() => {
      setTimerRamas(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          startFadeOut();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const startFadeOut = async () => {
    const durataSec = 120;
    const steps = 40;
    const interval = (durataSec * 1000) / steps;
    let step = 0;

    const { default: AudioService } = await import('../services/AudioService');

    fadeRef.current = setInterval(async () => {
      step++;
      const factor = 1 - (step / steps);
      for (const s of activeSounds) {
        await AudioService.setVolume(s.id, Math.max(0, factor * s.volume));
      }
      if (step >= steps) {
        clearInterval(fadeRef.current);
        await stopAll();
        setTimerActiv(null);
        setTimerRamas(null);
      }
    }, interval);
  };

  const cancelTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (fadeRef.current) clearInterval(fadeRef.current);
    setTimerActiv(null);
    setTimerRamas(null);
  };

  const formatTimer = (sec) => {
    if (sec === -1) return '∞';
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    if (h > 0) return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const handleSave = () => {
    if (!atmosferaNume.trim()) return;
    saveAtmosphere(atmosferaNume.trim());
    setAtmosferaNume('');
    setShowSaveModal(false);
  };

  const categoryData = LIBRARY[selectedCategory];

  if (activeStory) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.storyActive}>
          <Text style={styles.storyActiveIcon}>✨</Text>
          <Text style={styles.storyActiveTitlu}>Poveste sonoră activă</Text>
          <Text style={styles.storyActiveSubtitlu}>Mergi la tab-ul Povești pentru a controla redarea</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.titlu}>Player</Text>
          {activeSounds.length > 0 && (
            <TouchableOpacity onPress={() => setShowSaveModal(true)}>
              <Text style={styles.salveazaBtn}>Salvează</Text>
            </TouchableOpacity>
          )}
        </View>

        {activeSounds.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.emptyIcon}>🎵</Text>
            <Text style={styles.emptyTitlu}>Niciun sunet activ</Text>
            <Text style={styles.emptySubtitlu}>Alege o stare din ecranul principal sau adaugă sunete din bibliotecă</Text>
            <TouchableOpacity style={styles.addBtnPrimar} onPress={() => setShowLibrary(true)}>
              <Text style={styles.addBtnPrimarText}>Deschide biblioteca</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <View style={styles.soundsList}>
              {activeSounds.map(s => (
                <View key={s.id} style={styles.soundCard}>
                  <View style={styles.soundHeader}>
                    <Text style={styles.soundName}>{s.name}</Text>
                    <TouchableOpacity onPress={() => handleRemoveSound(s.id)} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                      <Text style={styles.removeBtn}>✕</Text>
                    </TouchableOpacity>
                  </View>
                  <Slider
                    style={styles.slider}
                    minimumValue={0}
                    maximumValue={1}
                    value={s.volume}
                    onValueChange={(v) => handleVolumeChange(s.id, v)}
                    minimumTrackTintColor={COLORS.accent}
                    maximumTrackTintColor={COLORS.border}
                    thumbTintColor={COLORS.accent}
                  />
                  <View style={styles.volumeRow}>
                    <Text style={styles.volumeLabel}>0</Text>
                    <Text style={styles.volumeValue}>{Math.round(s.volume * 100)}%</Text>
                    <Text style={styles.volumeLabel}>100</Text>
                  </View>
                </View>
              ))}

              {activeSounds.length < 4 && (
                <TouchableOpacity style={styles.addBtn} onPress={() => setShowLibrary(true)}>
                  <Text style={styles.addBtnText}>+ Adaugă sunet</Text>
                </TouchableOpacity>
              )}
            </View>

            <View style={styles.controls}>
              <TouchableOpacity
                style={[styles.playBtn, isPlaying && styles.playBtnActive]}
                onPress={handleTogglePlay}
                activeOpacity={0.8}
              >
                <Text style={styles.playBtnIcon}>{isPlaying ? '⏸' : '▶'}</Text>
                <Text style={styles.playBtnText}>{isPlaying ? 'Pauză' : 'Redă'}</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.timerSection}>
              {timerActiv ? (
                <View style={styles.timerActiv}>
                  <View>
                    <Text style={styles.timerActivLabel}>
                      {timerActiv === -1 ? 'Loop infinit activ' : 'Timer activ'}
                    </Text>
                    <Text style={styles.timerActivRamas}>{formatTimer(timerRamas)}</Text>
                  </View>
                  <TouchableOpacity onPress={cancelTimer} style={styles.timerCancelBtn}>
                    <Text style={styles.timerCancelText}>Anulează</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity style={styles.timerBtn} onPress={() => setShowTimerModal(true)}>
                  <Text style={styles.timerBtnIcon}>⏱</Text>
                  <Text style={styles.timerBtnText}>Setează timer</Text>
                </TouchableOpacity>
              )}
            </View>
          </>
        )}
      </ScrollView>

      <Modal visible={showLibrary} animationType="slide" presentationStyle="pageSheet">
        <SafeAreaView style={styles.modalSafe}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitlu}>Bibliotecă</Text>
            <TouchableOpacity onPress={() => setShowLibrary(false)}>
              <Text style={styles.modalClose}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriiScroll} contentContainerStyle={styles.categoriiContent}>
            {Object.entries(LIBRARY).map(([key, cat]) => (
              <TouchableOpacity
                key={key}
                style={[styles.categorieBtn, selectedCategory === key && styles.categorieBtnActiv]}
                onPress={() => setSelectedCategory(key)}
              >
                <Text style={styles.categorieIcon}>{cat.icon}</Text>
                <Text style={[styles.categorieName, selectedCategory === key && styles.categorieNameActiv]}>{cat.label}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <FlatList
            data={categoryData.sounds}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.soundsListModal}
            renderItem={({ item }) => {
              const esteActiv = activeSounds.find(s => s.id === item.id);
              return (
                <TouchableOpacity
                  style={[styles.soundItemModal, esteActiv && styles.soundItemModalActiv]}
                  onPress={() => esteActiv ? handleRemoveSound(item.id) : addSound(item)}
                >
                  <Text style={styles.soundItemName}>{item.name}</Text>
                  <Text style={[styles.soundItemCheck, esteActiv && styles.soundItemCheckActiv]}>
                    {esteActiv ? '✓' : '+'}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </SafeAreaView>
      </Modal>

      <Modal visible={showSaveModal} transparent animationType="fade">
        <View style={styles.overlayModal}>
          <View style={styles.saveModal}>
            <Text style={styles.saveModalTitlu}>Salvează atmosfera</Text>
            <TextInput
              style={styles.saveInput}
              placeholder="Numele atmosferei..."
              placeholderTextColor={COLORS.textMuted}
              value={atmosferaNume}
              onChangeText={setAtmosferaNume}
              autoFocus
            />
            <View style={styles.saveModalBtns}>
              <TouchableOpacity onPress={() => setShowSaveModal(false)} style={styles.saveModalCancel}>
                <Text style={styles.saveModalCancelText}>Anulează</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSave} style={styles.saveModalConfirm}>
                <Text style={styles.saveModalConfirmText}>Salvează</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal visible={showTimerModal} transparent animationType="fade">
        <View style={styles.overlayModal}>
          <View style={styles.timerModal}>
            <Text style={styles.timerModalTitlu}>Setează timer</Text>
            <Text style={styles.timerModalSub}>Fade-out 2 minute la final</Text>
            {TIMER_OPTIONS.map(opt => (
              <TouchableOpacity key={opt.value} style={styles.timerOption} onPress={() => startTimer(opt.value)}>
                <Text style={[styles.timerOptionText, opt.value === -1 && { color: COLORS.accent }]}>{opt.label}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity onPress={() => setShowTimerModal(false)} style={styles.timerModalCancel}>
              <Text style={styles.saveModalCancelText}>Anulează</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background },
  container: { paddingBottom: 32 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 24, paddingTop: 48, paddingBottom: 24 },
  titlu: { fontSize: 28, fontWeight: '500', color: COLORS.textPrimary },
  salveazaBtn: { fontSize: 14, color: COLORS.accent },
  empty: { alignItems: 'center', paddingHorizontal: 40, paddingTop: 60 },
  emptyIcon: { fontSize: 48, marginBottom: 16 },
  emptyTitlu: { fontSize: 18, fontWeight: '500', color: COLORS.textPrimary, marginBottom: 8 },
  emptySubtitlu: { fontSize: 14, color: COLORS.textMuted, textAlign: 'center', lineHeight: 22, marginBottom: 32 },
  addBtnPrimar: { backgroundColor: COLORS.surface, borderWidth: 1, borderColor: COLORS.border, borderRadius: 12, paddingHorizontal: 24, paddingVertical: 14 },
  addBtnPrimarText: { color: COLORS.accent, fontSize: 15, fontWeight: '500' },
  soundsList: { paddingHorizontal: 16, gap: 10 },
  soundCard: { backgroundColor: COLORS.surface, borderWidth: 1, borderColor: COLORS.border, borderRadius: 16, padding: 16 },
  soundHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  soundName: { fontSize: 15, fontWeight: '500', color: COLORS.textPrimary, flex: 1 },
  removeBtn: { fontSize: 16, color: COLORS.textMuted, paddingLeft: 12 },
  slider: { width: '100%', height: 36 },
  volumeRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: -4 },
  volumeLabel: { fontSize: 11, color: COLORS.textMuted },
  volumeValue: { fontSize: 12, color: COLORS.accent, fontWeight: '500' },
  addBtn: { backgroundColor: COLORS.surface, borderWidth: 1, borderColor: COLORS.border, borderRadius: 16, padding: 16, alignItems: 'center' },
  addBtnText: { color: COLORS.textSecondary, fontSize: 15 },
  controls: { paddingHorizontal: 16, marginTop: 24 },
  playBtn: { backgroundColor: COLORS.surface, borderWidth: 1, borderColor: COLORS.border, borderRadius: 16, paddingVertical: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10 },
  playBtnActive: { borderColor: COLORS.accent },
  playBtnIcon: { fontSize: 20 },
  playBtnText: { fontSize: 16, fontWeight: '500', color: COLORS.textPrimary },
  timerSection: { paddingHorizontal: 16, marginTop: 12 },
  timerBtn: { backgroundColor: COLORS.surface, borderWidth: 1, borderColor: COLORS.border, borderRadius: 16, paddingVertical: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  timerBtnIcon: { fontSize: 16 },
  timerBtnText: { fontSize: 14, color: COLORS.textSecondary },
  timerActiv: { backgroundColor: COLORS.surface, borderWidth: 1, borderColor: COLORS.accent, borderRadius: 16, paddingVertical: 14, paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  timerActivLabel: { fontSize: 12, color: COLORS.textMuted, marginBottom: 2 },
  timerActivRamas: { fontSize: 22, fontWeight: '500', color: COLORS.accent },
  timerCancelBtn: { paddingHorizontal: 12, paddingVertical: 6 },
  timerCancelText: { fontSize: 13, color: COLORS.textMuted },
  storyActive: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 40 },
  storyActiveIcon: { fontSize: 48, marginBottom: 16 },
  storyActiveTitlu: { fontSize: 18, fontWeight: '500', color: COLORS.textPrimary, marginBottom: 8, textAlign: 'center' },
  storyActiveSubtitlu: { fontSize: 14, color: COLORS.textMuted, textAlign: 'center', lineHeight: 22 },
  modalSafe: { flex: 1, backgroundColor: COLORS.background },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 24, paddingTop: 24, paddingBottom: 16 },
  modalTitlu: { fontSize: 22, fontWeight: '500', color: COLORS.textPrimary },
  modalClose: { fontSize: 18, color: COLORS.textMuted, padding: 4 },
  categoriiScroll: { maxHeight: 60 },
  categoriiContent: { paddingHorizontal: 16, gap: 8, alignItems: 'center' },
  categorieBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: COLORS.border, backgroundColor: COLORS.surface },
  categorieBtnActiv: { borderColor: COLORS.accent },
  categorieIcon: { fontSize: 14 },
  categorieName: { fontSize: 13, color: COLORS.textMuted },
  categorieNameActiv: { color: COLORS.accent },
  soundsListModal: { paddingHorizontal: 16, paddingTop: 16, gap: 8 },
  soundItemModal: { backgroundColor: COLORS.surface, borderWidth: 1, borderColor: COLORS.border, borderRadius: 12, paddingHorizontal: 16, paddingVertical: 14, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  soundItemModalActiv: { borderColor: COLORS.accent },
  soundItemName: { fontSize: 15, color: COLORS.textPrimary, flex: 1 },
  soundItemCheck: { fontSize: 18, color: COLORS.textMuted, marginLeft: 12 },
  soundItemCheckActiv: { color: COLORS.accent },
  overlayModal: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center', alignItems: 'center', padding: 24 },
  saveModal: { backgroundColor: COLORS.surface, borderRadius: 20, padding: 24, width: '100%' },
  saveModalTitlu: { fontSize: 18, fontWeight: '500', color: COLORS.textPrimary, marginBottom: 16 },
  saveInput: { backgroundColor: COLORS.background, borderWidth: 1, borderColor: COLORS.border, borderRadius: 12, paddingHorizontal: 16, paddingVertical: 12, fontSize: 15, color: COLORS.textPrimary, marginBottom: 20 },
  saveModalBtns: { flexDirection: 'row', gap: 10 },
  saveModalCancel: { flex: 1, paddingVertical: 12, alignItems: 'center', borderRadius: 12, borderWidth: 1, borderColor: COLORS.border },
  saveModalCancelText: { color: COLORS.textMuted, fontSize: 15 },
  saveModalConfirm: { flex: 1, paddingVertical: 12, alignItems: 'center', borderRadius: 12, backgroundColor: COLORS.accent },
  saveModalConfirmText: { color: '#fff', fontSize: 15, fontWeight: '500' },
  timerModal: { backgroundColor: COLORS.surface, borderRadius: 20, padding: 24, width: '100%' },
  timerModalTitlu: { fontSize: 18, fontWeight: '500', color: COLORS.textPrimary, marginBottom: 4 },
  timerModalSub: { fontSize: 13, color: COLORS.textMuted, marginBottom: 20 },
  timerOption: { paddingVertical: 14, borderBottomWidth: 0.5, borderBottomColor: COLORS.border },
  timerOptionText: { fontSize: 16, color: COLORS.textPrimary },
  timerModalCancel: { marginTop: 16, alignItems: 'center', paddingVertical: 10 },
});
