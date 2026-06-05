import { useState, useEffect, useRef, useCallback } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, SafeAreaView
} from 'react-native';
import { Audio } from 'expo-av';
import { COLORS } from '../utils/colors';

const POVESTI = [
  {
    id: 'tren_noapte',
    titlu: 'Trenul de noapte',
    descriere: 'O călătorie nocturnă spre somn adânc',
    durata: 90,
    icon: '🚂',
    stare: 'Somn',
    culoare: COLORS.somn,
    suprafata: COLORS.somnSurface,
    border: COLORS.somnBorder,
    textColor: '#c8c8e8',
    segmente: [
      { start: 0, end: 15, sunete: [{ id: 'compartiment_dormit', file: require('../../assets/audio/library/calatorie/compartiment_dormit.ogg'), volum: 0.6 }, { id: 'tren_sine', file: require('../../assets/audio/library/calatorie/tren_pe_sine_clasice.ogg'), volum: 0.4 }] },
      { start: 15, end: 40, sunete: [{ id: 'tren_sine', file: require('../../assets/audio/library/calatorie/tren_pe_sine_clasice.ogg'), volum: 0.6 }, { id: 'tren_ploaie', file: require('../../assets/audio/library/calatorie/tren_prin_ploaie.ogg'), volum: 0.3 }, { id: 'compartiment_dormit', file: require('../../assets/audio/library/calatorie/compartiment_dormit.ogg'), volum: 0.2 }] },
      { start: 40, end: 65, sunete: [{ id: 'ploaie_fereastra', file: require('../../assets/audio/library/ploaie/ploaie_pe_fereastra.ogg'), volum: 0.6 }, { id: 'tren_sine', file: require('../../assets/audio/library/calatorie/tren_pe_sine_clasice.ogg'), volum: 0.3 }, { id: 'compartiment_dormit', file: require('../../assets/audio/library/calatorie/compartiment_dormit.ogg'), volum: 0.1 }] },
      { start: 65, end: 90, sunete: [{ id: 'brown_noise', file: require('../../assets/audio/library/noise/brown_noise.ogg'), volum: 0.5 }, { id: 'ploaie_fereastra', file: require('../../assets/audio/library/ploaie/ploaie_pe_fereastra.ogg'), volum: 0.4 }] },
    ],
  },
  {
    id: 'cabana_apuseni',
    titlu: 'Cabană în Apuseni',
    descriere: 'Furtună afară, căldură înăuntru',
    durata: 60,
    icon: '🏔',
    stare: 'Somn · Calm',
    culoare: COLORS.calm,
    suprafata: COLORS.calmSurface,
    border: COLORS.calmBorder,
    textColor: '#c8e8d4',
    segmente: [
      { start: 0, end: 15, sunete: [{ id: 'cabana_furtuna', file: require('../../assets/audio/library/adapost/cabana_in_furtuna.ogg'), volum: 0.7 }, { id: 'semineu', file: require('../../assets/audio/library/adapost/semineu.ogg'), volum: 0.5 }] },
      { start: 15, end: 35, sunete: [{ id: 'ploaie_acoperis', file: require('../../assets/audio/library/ploaie/ploaie_acoperis_lemn.ogg'), volum: 0.6 }, { id: 'semineu', file: require('../../assets/audio/library/adapost/semineu.ogg'), volum: 0.5 }] },
      { start: 35, end: 50, sunete: [{ id: 'semineu', file: require('../../assets/audio/library/adapost/semineu.ogg'), volum: 0.7 }, { id: 'soba_lemne', file: require('../../assets/audio/library/adapost/soba_cu_lemne.ogg'), volum: 0.2 }, { id: 'ploaie_acoperis', file: require('../../assets/audio/library/ploaie/ploaie_acoperis_lemn.ogg'), volum: 0.3 }] },
      { start: 50, end: 60, sunete: [{ id: 'semineu', file: require('../../assets/audio/library/adapost/semineu.ogg'), volum: 0.8 }, { id: 'pink_noise', file: require('../../assets/audio/library/noise/pink_noise.ogg'), volum: 0.2 }] },
    ],
  },
  {
    id: 'dimineata_carpati',
    titlu: 'Dimineață în Carpați',
    descriere: 'Trezire graduală în natură',
    durata: 45,
    icon: '🌄',
    stare: 'Energie',
    culoare: COLORS.energie,
    suprafata: COLORS.energieSurface,
    border: COLORS.energieBorder,
    textColor: '#e8d8a0',
    segmente: [
      { start: 0, end: 10, sunete: [{ id: 'padure_nocturna', file: require('../../assets/audio/library/natura/padure_nocturna.ogg'), volum: 0.6 }, { id: 'greieri_seara', file: require('../../assets/audio/library/natura/greieri_de_seara.ogg'), volum: 0.4 }] },
      { start: 10, end: 25, sunete: [{ id: 'pasari_dimineata', file: require('../../assets/audio/library/natura/pasari_de_dimineata.ogg'), volum: 0.7 }, { id: 'padure_rasarit', file: require('../../assets/audio/library/natura/padure_la_rasarit.ogg'), volum: 0.5 }] },
      { start: 25, end: 35, sunete: [{ id: 'parau_montan', file: require('../../assets/audio/library/apa/parau_montan.ogg'), volum: 0.6 }, { id: 'pasari_dimineata', file: require('../../assets/audio/library/natura/pasari_de_dimineata.ogg'), volum: 0.5 }, { id: 'poiana_montana', file: require('../../assets/audio/library/natura/poiana_montana.ogg'), volum: 0.3 }] },
      { start: 35, end: 45, sunete: [{ id: 'parau_montan', file: require('../../assets/audio/library/apa/parau_montan.ogg'), volum: 0.7 }, { id: 'vant_frunze', file: require('../../assets/audio/library/natura/vant_prin_frunze.ogg'), volum: 0.4 }, { id: 'pasari_dimineata', file: require('../../assets/audio/library/natura/pasari_de_dimineata.ogg'), volum: 0.3 }] },
    ],
  },
  {
    id: 'seara_lectura',
    titlu: 'Seară de lectură',
    descriere: 'Concentrare și liniște serală',
    durata: 45,
    icon: '📚',
    stare: 'Focus · Calm',
    culoare: COLORS.focus,
    suprafata: COLORS.focusSurface,
    border: COLORS.focusBorder,
    textColor: '#a8c8e8',
    segmente: [
      { start: 0, end: 15, sunete: [{ id: 'biblioteca_veche', file: require('../../assets/audio/library/ambiante/biblioteca_veche.ogg'), volum: 0.7 }, { id: 'cafenea_linistita', file: require('../../assets/audio/library/ambiante/cafenea_linistita.ogg'), volum: 0.3 }] },
      { start: 15, end: 30, sunete: [{ id: 'ploaie_fereastra', file: require('../../assets/audio/library/ploaie/ploaie_pe_fereastra.ogg'), volum: 0.5 }, { id: 'biblioteca_veche', file: require('../../assets/audio/library/ambiante/biblioteca_veche.ogg'), volum: 0.4 }] },
      { start: 30, end: 38, sunete: [{ id: 'pian_ambiental', file: require('../../assets/audio/library/muzica/pian_ambiental.ogg'), volum: 0.4 }, { id: 'ploaie_fereastra', file: require('../../assets/audio/library/ploaie/ploaie_pe_fereastra.ogg'), volum: 0.4 }, { id: 'biblioteca_veche', file: require('../../assets/audio/library/ambiante/biblioteca_veche.ogg'), volum: 0.2 }] },
      { start: 38, end: 45, sunete: [{ id: 'pian_ambiental', file: require('../../assets/audio/library/muzica/pian_ambiental.ogg'), volum: 0.6 }, { id: 'ploaie_fereastra', file: require('../../assets/audio/library/ploaie/ploaie_pe_fereastra.ogg'), volum: 0.3 }, { id: 'brown_noise', file: require('../../assets/audio/library/noise/brown_noise.ogg'), volum: 0.2 }] },
    ],
  },
];

export default function StoriesScreen() {
  const [povestiActivaId, setPovestiActivaId] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [minutCurent, setMinutCurent] = useState(0);
  const [segmentCurent, setSegmentCurent] = useState(0);
  const soundsRef = useRef({});
  const intervalRef = useRef(null);
  const startTimeRef = useRef(null);
  const stoppedRef = useRef(false);

  useEffect(() => {
    return () => {
      clearAll();
    };
  }, []);

  const clearAll = useCallback(async () => {
    stoppedRef.current = true;
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    for (const sound of Object.values(soundsRef.current)) {
      try { await sound.stopAsync(); await sound.unloadAsync(); } catch (e) {}
    }
    soundsRef.current = {};
  }, []);

  const stopPoveste = useCallback(async () => {
    stoppedRef.current = true;
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    for (const sound of Object.values(soundsRef.current)) {
      try { await sound.stopAsync(); await sound.unloadAsync(); } catch (e) {}
    }
    soundsRef.current = {};
    setIsPlaying(false);
    setMinutCurent(0);
    setSegmentCurent(0);
    setPovestiActivaId(null);
    startTimeRef.current = null;
  }, []);

  const startPoveste = useCallback(async (poveste) => {
    await clearAll();
    stoppedRef.current = false;

    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      staysActiveInBackground: true,
      playsInSilentModeIOS: true,
    });

    setPovestiActivaId(poveste.id);
    setIsPlaying(true);
    setMinutCurent(0);
    setSegmentCurent(0);
    startTimeRef.current = Date.now();

    await incarcaSegment(poveste, 0);

    intervalRef.current = setInterval(async () => {
      if (stoppedRef.current) return;

      const elapsed = (Date.now() - startTimeRef.current) / 60000;
      const minuteScurse = Math.floor(elapsed);
      setMinutCurent(minuteScurse);

      if (minuteScurse >= poveste.durata) {
        await stopPoveste();
        return;
      }

      const segIdx = poveste.segmente.findIndex(
        s => minuteScurse >= s.start && minuteScurse < s.end
      );

      setSegmentCurent(prev => {
        if (segIdx !== prev && segIdx >= 0) {
          tranzitieSegment(poveste, segIdx);
          return segIdx;
        }
        return prev;
      });
    }, 15000);
  }, [clearAll, stopPoveste]);

  const incarcaSegment = async (poveste, segIdx) => {
    if (stoppedRef.current) return;
    const segment = poveste.segmente[segIdx];
    for (const s of segment.sunete) {
      if (stoppedRef.current) return;
      try {
        const { sound } = await Audio.Sound.createAsync(
          s.file,
          { isLooping: true, volume: s.volum, shouldPlay: true }
        );
        soundsRef.current[s.id] = sound;
      } catch (e) {}
    }
  };

  const tranzitieSegment = async (poveste, segIdx) => {
    if (stoppedRef.current) return;
    const segmentNou = poveste.segmente[segIdx];
    const idNoi = segmentNou.sunete.map(s => s.id);
    const idVechi = Object.keys(soundsRef.current);

    const steps = 20;
    const interval = (120 * 1000) / steps;
    let step = 0;

    const crossfadeInterval = setInterval(async () => {
      if (stoppedRef.current) { clearInterval(crossfadeInterval); return; }
      step++;
      const factor = step / steps;

      for (const id of idVechi) {
        if (!idNoi.includes(id) && soundsRef.current[id]) {
          try { await soundsRef.current[id].setVolumeAsync(Math.max(0, 1 - factor)); } catch (e) {}
        }
      }

      for (const s of segmentNou.sunete) {
        if (!soundsRef.current[s.id]) {
          try {
            const { sound } = await Audio.Sound.createAsync(
              s.file, { isLooping: true, volume: s.volum * factor, shouldPlay: true }
            );
            soundsRef.current[s.id] = sound;
          } catch (e) {}
        } else {
          try { await soundsRef.current[s.id].setVolumeAsync(s.volum * factor); } catch (e) {}
        }
      }

      if (step >= steps) {
        clearInterval(crossfadeInterval);
        for (const id of idVechi) {
          if (!idNoi.includes(id) && soundsRef.current[id]) {
            try { await soundsRef.current[id].unloadAsync(); delete soundsRef.current[id]; } catch (e) {}
          }
        }
      }
    }, interval);
  };

  const togglePlay = useCallback(async () => {
    if (isPlaying) {
      for (const sound of Object.values(soundsRef.current)) {
        try { await sound.pauseAsync(); } catch (e) {}
      }
      setIsPlaying(false);
    } else {
      for (const sound of Object.values(soundsRef.current)) {
        try { await sound.playAsync(); } catch (e) {}
      }
      setIsPlaying(true);
    }
  }, [isPlaying]);

  const povestiActiva = POVESTI.find(p => p.id === povestiActivaId);
  const progres = povestiActiva ? minutCurent / povestiActiva.durata : 0;

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.titlu}>Povești sonore</Text>
          <Text style={styles.subtitlu}>Experiențe audio care evoluează în timp</Text>
        </View>

        {POVESTI.map(poveste => (
          <TouchableOpacity
            key={poveste.id}
            style={[styles.povestCard, { backgroundColor: poveste.suprafata, borderColor: povestiActivaId === poveste.id ? poveste.culoare : poveste.border }]}
            onPress={() => {
              if (povestiActivaId === poveste.id) return;
              startPoveste(poveste);
            }}
            activeOpacity={0.8}
          >
            <View style={styles.povestHeader}>
              <Text style={styles.povestIcon}>{poveste.icon}</Text>
              <View style={styles.povestInfo}>
                <Text style={[styles.povestTitlu, { color: poveste.textColor }]}>{poveste.titlu}</Text>
                <Text style={styles.povestDescriere}>{poveste.descriere}</Text>
              </View>
              <View style={styles.povestMeta}>
                <Text style={styles.povestDurata}>{poveste.durata} min</Text>
                <Text style={[styles.povestStare, { color: poveste.culoare }]}>{poveste.stare}</Text>
              </View>
            </View>

            {povestiActivaId === poveste.id && (
              <View style={styles.playerActiv}>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: `${progres * 100}%`, backgroundColor: poveste.culoare }]} />
                </View>
                <View style={styles.playerControls}>
                  <Text style={styles.minutCurent}>{minutCurent} / {poveste.durata} min</Text>
                  <View style={styles.playerBtns}>
                    <TouchableOpacity onPress={togglePlay} style={styles.playBtn}>
                      <Text style={styles.playBtnText}>{isPlaying ? '⏸' : '▶'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={stopPoveste} style={styles.stopBtn}>
                      <Text style={styles.stopBtnText}>■</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.segmenteRow}>
                  {poveste.segmente.map((seg, i) => (
                    <View key={i} style={[styles.segmentDot, i === segmentCurent && { backgroundColor: poveste.culoare }]} />
                  ))}
                </View>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background },
  container: { paddingBottom: 40 },
  header: { paddingHorizontal: 24, paddingTop: 48, paddingBottom: 24 },
  titlu: { fontSize: 28, fontWeight: '500', color: COLORS.textPrimary },
  subtitlu: { fontSize: 14, color: COLORS.textMuted, marginTop: 4 },
  povestCard: { marginHorizontal: 16, borderWidth: 1, borderRadius: 20, padding: 20, marginBottom: 12 },
  povestHeader: { flexDirection: 'row', alignItems: 'flex-start', gap: 14 },
  povestIcon: { fontSize: 32 },
  povestInfo: { flex: 1 },
  povestTitlu: { fontSize: 16, fontWeight: '500', marginBottom: 4 },
  povestDescriere: { fontSize: 13, color: COLORS.textMuted, lineHeight: 18 },
  povestMeta: { alignItems: 'flex-end', gap: 4 },
  povestDurata: { fontSize: 13, color: COLORS.textMuted },
  povestStare: { fontSize: 11, fontWeight: '500' },
  playerActiv: { marginTop: 16 },
  progressBar: { height: 3, backgroundColor: COLORS.border, borderRadius: 2, marginBottom: 12, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 2 },
  playerControls: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  minutCurent: { fontSize: 13, color: COLORS.textMuted },
  playerBtns: { flexDirection: 'row', gap: 12 },
  playBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: COLORS.border, alignItems: 'center', justifyContent: 'center' },
  playBtnText: { fontSize: 14 },
  stopBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: COLORS.border, alignItems: 'center', justifyContent: 'center' },
  stopBtnText: { fontSize: 14, color: COLORS.textMuted },
  segmenteRow: { flexDirection: 'row', gap: 6, marginTop: 12 },
  segmentDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.border },
});
