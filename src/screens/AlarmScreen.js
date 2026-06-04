import { useState, useEffect, useRef } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, SafeAreaView, Platform
} from 'react-native';
import { COLORS } from '../utils/colors';
import { useSona } from '../context/SonaContext';
import { Audio } from 'expo-av';

const SECVENTA_TREZIRE = [
  { sunet: 'greieri_seara', volum_start: 0.0, volum_final: 0.15, minut_start: 0, minut_final: 10, nume: 'Greieri discret' },
  { sunet: 'pasari_dimineata', volum_start: 0.0, volum_final: 0.45, minut_start: 10, minut_final: 20, nume: 'Păsări de dimineață' },
  { sunet: 'parau_montan', volum_start: 0.0, volum_final: 0.65, minut_start: 18, minut_final: 25, nume: 'Pârâu montan' },
];

const MINUTE_INAINTE = 25;

export default function AlarmScreen() {
  const { alarmTime, setAlarmTime } = useSona();
  const [oraSelectata, setOraSelectata] = useState(7);
  const [minutSelectat, setMinutSelectat] = useState(0);
  const [alarmActiva, setAlarmActiva] = useState(false);
  const [faza, setFaza] = useState(null);
  const [sounds, setSounds] = useState({});
  const intervalRef = useRef(null);
  const soundsRef = useRef({});

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      stopAllSounds();
    };
  }, []);

  const stopAllSounds = async () => {
    for (const sound of Object.values(soundsRef.current)) {
      try { await sound.unloadAsync(); } catch (e) {}
    }
    soundsRef.current = {};
    setSounds({});
  };

  const activareAlarma = async () => {
    if (alarmActiva) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      await stopAllSounds();
      setAlarmActiva(false);
      setFaza(null);
      return;
    }

    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      staysActiveInBackground: true,
      playsInSilentModeIOS: true,
    });

    setAlarmActiva(true);
    startMonitor();
  };

  const startMonitor = () => {
    intervalRef.current = setInterval(() => {
      const acum = new Date();
    const tintaOra = new Date();
      tintaOra.setHours(oraSelectata, minutSelectat, 0, 0);

      if (tintaOra < acum) {
        tintaOra.setDate(tintaOra.getDate() + 1);
      }

      const diffMs = tintaOra - acum;
      const diffMin = diffMs / 60000;

      if (diffMin <= MINUTE_INAINTE && diffMin > 0) {
        const minuteScurse = MINUTE_INAINTE - diffMin;
        updateSecventa(minuteScurse);
      }

      if (diffMin <= 0 && diffMin > -1) {
        setFaza('treaz');
        clearInterval(intervalRef.current);
      }
    }, 10000);
  };

  const updateSecventa = async (minuteScurse) => {
    setFaza('activa');

    for (const etapa of SECVENTA_TREZIRE) {
      if (minuteScurse >= etapa.minut_start && minuteScurse <= etapa.minut_final) {
        const progres = (minuteScurse - etapa.minut_start) / (etapa.minut_final - etapa.minut_start);
        const volum = etapa.volum_start + (etapa.volum_final - etapa.volum_start) * progres;

        if (!soundsRef.current[etapa.sunet]) {
          try {
            const { sound } = await Audio.Sound.createAsync(
              getSoundFile(etapa.sunet),
              { isLooping: true, volume: volum, shouldPlay: true }
            );
            soundsRef.current[etapa.sunet] = sound;
            setSounds({ ...soundsRef.current });
          } catch (e) {}
        } else {
          try {
            await soundsRef.current[etapa.sunet].setVolumeAsync(volum);
          } catch (e) {}
        }
      }
    }
  };

  const getSoundFile = (id) => {
    const files = {
      greieri_seara: require('../../assets/audio/library/natura/greieri_de_seara.ogg'),
      pasari_dimineata: require('../../assets/audio/library/natura/pasari_de_dimineata.ogg'),
      parau_montan: require('../../assets/audio/library/apa/parau_montan.ogg'),
    };
    return files[id];
  };

  const oraLimita = `${oraSelectata.toString().padStart(2, '0')}:${minutSelectat.toString().padStart(2, '0')}`;
  const oraStart = () => {
    const total = oraSelectata * 60 + minutSelectat - MINUTE_INAINTE;
    const h = Math.floor(((total % 1440) + 1440) % 1440 / 60);
    const m = ((total % 60) + 60) % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>

        <View style={styles.header}>
          <Text style={styles.titlu}>Trezire Sona</Text>
          <Text style={styles.subtitlu}>Trezire graduală și naturală</Text>
        </View>

        <View style={styles.ceasCard}>
          <Text style={styles.ceasLabel}>Ora limită de trezire</Text>
          <Text style={styles.ceasDisplay}>{oraLimita}</Text>

          <View style={styles.selectoreRow}>
            <View style={styles.selector}>
              <Text style={styles.selectorLabel}>Ore</Text>
              <ScrollView style={styles.selectorScroll} showsVerticalScrollIndicator={false}>
                {Array.from({ length: 24 }, (_, i) => (
                  <TouchableOpacity
                    key={i}
                    style={[styles.selectorItem, oraSelectata === i && styles.selectorItemActiv]}
                    onPress={() => !alarmActiva && setOraSelectata(i)}
                  >
                    <Text style={[styles.selectorItemText, oraSelectata === i && styles.selectorItemTextActiv]}>
                      {i.toString().padStart(2, '0')}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            <Text style={styles.selectorSeparator}>:</Text>

            <View style={styles.selector}>
              <Text style={styles.selectorLabel}>Minute</Text>
              <ScrollView style={styles.selectorScroll} showsVerticalScrollIndicator={false}>
                {[0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55].map(m => (
                  <TouchableOpacity
                    key={m}
                    style={[styles.selectorItem, minutSelectat === m && styles.selectorItemActiv]}
                    onPress={() => !alarmActiva && setMinutSelectat(m)}
                  >
                    <Text style={[styles.selectorItemText, minutSelectat === m && styles.selectorItemTextActiv]}>
                      {m.toString().padStart(2, '0')}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        </View>

        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Text style={styles.infoIcon}>🌙</Text>
            <View>
              <Text style={styles.infoLabel}>Secvența sonoră pornește la</Text>
              <Text style={styles.infoValoare}>{oraStart()}</Text>
            </View>
          </View>
          <View style={styles.infoSeparator} />
          <View style={styles.infoRow}>
            <Text style={styles.infoIcon}>🌅</Text>
            <View>
              <Text style={styles.infoLabel}>Trezire completă la</Text>
              <Text style={styles.infoValoare}>{oraLimita}</Text>
            </View>
          </View>
        </View>

        <View style={styles.secventaCard}>
          <Text style={styles.secventaTitlu}>Secvența sonoră</Text>
          {SECVENTA_TREZIRE.map((etapa, i) => (
            <View key={i} style={styles.etapaRow}>
              <View style={[styles.etapaDot, faza === 'activa' && styles.etapaDotActiv]} />
              <View style={styles.etapaInfo}>
                <Text style={styles.etapaNume}>{etapa.nume}</Text>
                <Text style={styles.etapaTimp}>min {etapa.minut_start} → {etapa.minut_final}</Text>
              </View>
              <Text style={styles.etapaVolum}>{Math.round(etapa.volum_final * 100)}%</Text>
            </View>
          ))}
        </View>

        {faza === 'activa' && (
          <View style={styles.statusCard}>
            <Text style={styles.statusIcon}>🌿</Text>
            <Text style={styles.statusText}>Secvența de trezire este activă</Text>
          </View>
        )}

        {faza === 'treaz' && (
          <View style={[styles.statusCard, styles.statusCardTreaz]}>
            <Text style={styles.statusIcon}>☀️</Text>
            <Text style={styles.statusText}>Bună dimineața!</Text>
          </View>
        )}

        <TouchableOpacity
          style={[styles.activareBtn, alarmActiva && styles.activareBtnActiv]}
          onPress={activareAlarma}
          activeOpacity={0.8}
        >
          <Text style={styles.activareBtnText}>
            {alarmActiva ? 'Dezactivează trezirea' : 'Activează trezirea Sona'}
          </Text>
        </TouchableOpacity>

        <Text style={styles.nota}>
          Secvența sonoră pornește cu {MINUTE_INAINTE} de minute înainte de ora setată și crește gradual volumul pentru o trezire naturală.
        </Text>

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
  ceasCard: { marginHorizontal: 16, backgroundColor: COLORS.surface, borderWidth: 1, borderColor: COLORS.border, borderRadius: 20, padding: 24, marginBottom: 12 },
  ceasLabel: { fontSize: 12, color: COLORS.textMuted, letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 8 },
  ceasDisplay: { fontSize: 56, fontWeight: '300', color: COLORS.textPrimary, letterSpacing: 4, marginBottom: 24, textAlign: 'center' },
  selectoreRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 16 },
  selector: { flex: 1 },
  selectorLabel: { fontSize: 12, color: COLORS.textMuted, textAlign: 'center', marginBottom: 8 },
  selectorScroll: { maxHeight: 160 },
  selectorItem: { paddingVertical: 10, alignItems: 'center', borderRadius: 8 },
  selectorItemActiv: { backgroundColor: COLORS.somnSurface, borderWidth: 1, borderColor: COLORS.somnBorder },
  selectorItemText: { fontSize: 18, color: COLORS.textMuted },
  selectorItemTextActiv: { color: COLORS.accent, fontWeight: '500' },
  selectorSeparator: { fontSize: 32, color: COLORS.textMuted, marginTop: 20 },
  infoCard: { marginHorizontal: 16, backgroundColor: COLORS.surface, borderWidth: 1, borderColor: COLORS.border, borderRadius: 16, padding: 20, marginBottom: 12 },
  infoRow: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  infoIcon: { fontSize: 24 },
  infoLabel: { fontSize: 12, color: COLORS.textMuted, marginBottom: 2 },
  infoValoare: { fontSize: 18, fontWeight: '500', color: COLORS.textPrimary },
  infoSeparator: { height: 0.5, backgroundColor: COLORS.border, marginVertical: 16 },
  secventaCard: { marginHorizontal: 16, backgroundColor: COLORS.surface, borderWidth: 1, borderColor: COLORS.border, borderRadius: 16, padding: 20, marginBottom: 12 },
  secventaTitlu: { fontSize: 14, fontWeight: '500', color: COLORS.textSecondary, marginBottom: 16 },
  etapaRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 14 },
  etapaDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.border },
  etapaDotActiv: { backgroundColor: COLORS.accentAmber },
  etapaInfo: { flex: 1 },
  etapaNume: { fontSize: 14, color: COLORS.textPrimary },
  etapaTimp: { fontSize: 12, color: COLORS.textMuted, marginTop: 2 },
  etapaVolum: { fontSize: 13, color: COLORS.textMuted },
  statusCard: { marginHorizontal: 16, backgroundColor: COLORS.calmSurface, borderWidth: 1, borderColor: COLORS.calmBorder, borderRadius: 16, padding: 16, flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 },
  statusCardTreaz: { backgroundColor: COLORS.energieSurface, borderColor: COLORS.energieBorder },
  statusIcon: { fontSize: 24 },
  statusText: { fontSize: 15, color: COLORS.textPrimary, fontWeight: '500' },
  activareBtn: { marginHorizontal: 16, backgroundColor: COLORS.surface, borderWidth: 1, borderColor: COLORS.border, borderRadius: 16, paddingVertical: 18, alignItems: 'center', marginBottom: 16 },
  activareBtnActiv: { borderColor: COLORS.accentAmber },
  activareBtnText: { fontSize: 16, fontWeight: '500', color: COLORS.textPrimary },
  nota: { paddingHorizontal: 24, fontSize: 12, color: COLORS.textMuted, textAlign: 'center', lineHeight: 18 },
});
