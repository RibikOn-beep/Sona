import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../utils/colors';
import { useSona } from '../context/SonaContext';
import { getRecommendedSounds } from '../data/library';

const STARI = [
  {
    id: 'somn',
    titlu: 'Am nevoie să adorm',
    subtitlu: 'Inducere somn · liniște',
    icon: '🌙',
    culoare: COLORS.somn,
    suprafata: COLORS.somnSurface,
    border: COLORS.somnBorder,
  },
  {
    id: 'calm',
    titlu: 'Am nevoie să mă liniștesc',
    subtitlu: 'Reducere stres · restaurare',
    icon: '🌿',
    culoare: COLORS.calm,
    suprafata: COLORS.calmSurface,
    border: COLORS.calmBorder,
  },
  {
    id: 'energie',
    titlu: 'Am nevoie să mă trezesc',
    subtitlu: 'Activare graduală · energie',
    icon: '🌅',
    culoare: COLORS.energie,
    suprafata: COLORS.energieSurface,
    border: COLORS.energieBorder,
  },
  {
    id: 'focus',
    titlu: 'Am nevoie să mă concentrez',
    subtitlu: 'Mascare zgomot · focus',
    icon: '🎯',
    culoare: COLORS.focus,
    suprafata: COLORS.focusSurface,
    border: COLORS.focusBorder,
  },
];

const POVESTI = [
  {
    id: 'tren_noapte',
    titlu: 'Trenul de noapte',
    durata: '90 min',
    icon: '🚂',
    culoare: COLORS.somn,
    suprafata: COLORS.somnSurface,
    border: COLORS.somnBorder,
  },
  {
    id: 'cabana_apuseni',
    titlu: 'Cabană în Apuseni',
    durata: '60 min',
    icon: '🏔',
    culoare: COLORS.calm,
    suprafata: COLORS.calmSurface,
    border: COLORS.calmBorder,
  },
  {
    id: 'dimineata_carpati',
    titlu: 'Dimineață în Carpați',
    durata: '45 min',
    icon: '🌄',
    culoare: COLORS.energie,
    suprafata: COLORS.energieSurface,
    border: COLORS.energieBorder,
  },
  {
    id: 'seara_lectura',
    titlu: 'Seară de lectură',
    durata: '45 min',
    icon: '📚',
    culoare: COLORS.focus,
    suprafata: COLORS.focusSurface,
    border: COLORS.focusBorder,
  },
];

export default function HomeScreen() {
  const navigation = useNavigation();
  const { addSound } = useSona();

  const handleStare = (stare) => {
    const suneteRecomandate = getRecommendedSounds(stare.id, 3);
    suneteRecomandate.forEach(s => addSound(s));
    navigation.navigate('Player');
  };

  const handlePoveste = (poveste) => {
    navigation.navigate('Povești');
  };

  const ora = new Date().getHours();
  const salut = ora < 12 ? 'Bună dimineața' : ora < 18 ? 'Bună ziua' : 'Bună seara';

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.salut}>{salut}</Text>
          <Text style={styles.intrebare}>Cum te simți acum?</Text>
        </View>

        <View style={styles.stariContainer}>
          {STARI.map(stare => (
            <TouchableOpacity
              key={stare.id}
              style={[styles.stareCard, { backgroundColor: stare.suprafata, borderColor: stare.border }]}
              onPress={() => handleStare(stare)}
              activeOpacity={0.75}
            >
              <View style={[styles.stareIconWrap, { borderColor: stare.border }]}>
                <Text style={styles.stareIcon}>{stare.icon}</Text>
              </View>
              <View style={styles.stareTitluWrap}>
                <Text style={[styles.stareTitlu, { color: stare.culoare === COLORS.somn ? '#c8c8e8' : stare.culoare === COLORS.calm ? '#c8e8d4' : stare.culoare === COLORS.energie ? '#e8d8a0' : '#a8c8e8' }]}>
                  {stare.titlu}
                </Text>
                <Text style={styles.stareSubtitlu}>{stare.subtitlu}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.sectiune}>
          <Text style={styles.sectiuneLabel}>Povești sonore</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.povestiScroll}
          >
            {POVESTI.map(poveste => (
              <TouchableOpacity
                key={poveste.id}
                style={[styles.povestCard, { backgroundColor: poveste.suprafata, borderColor: poveste.border }]}
                onPress={() => handlePoveste(poveste)}
                activeOpacity={0.75}
              >
                <Text style={styles.povestIcon}>{poveste.icon}</Text>
                <Text style={[styles.povestTitlu, { color: poveste.culoare === COLORS.somn ? '#c8c8e8' : poveste.culoare === COLORS.calm ? '#c8e8d4' : poveste.culoare === COLORS.energie ? '#e8d8a0' : '#a8c8e8' }]}>
                  {poveste.titlu}
                </Text>
                <Text style={styles.povestDurata}>{poveste.durata}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scroll: {
    flex: 1,
  },
  container: {
    paddingBottom: 24,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 28,
  },
  salut: {
    fontSize: 13,
    color: COLORS.textMuted,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  intrebare: {
    fontSize: 28,
    fontWeight: '500',
    color: COLORS.textPrimary,
    lineHeight: 36,
  },
  stariContainer: {
    paddingHorizontal: 16,
    gap: 10,
  },
  stareCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    gap: 16,
  },
  stareIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.04)',
  },
  stareIcon: {
    fontSize: 24,
  },
  stareTitluWrap: {
    flex: 1,
  },
  stareTitlu: {
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 3,
  },
  stareSubtitlu: {
    fontSize: 12,
    color: COLORS.textMuted,
  },
  sectiune: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectiuneLabel: {
    fontSize: 12,
    color: COLORS.textMuted,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    marginBottom: 14,
  },
  povestiScroll: {
    gap: 10,
    paddingRight: 24,
  },
  povestCard: {
    width: 130,
    borderWidth: 1,
    borderRadius: 14,
    padding: 14,
  },
  povestIcon: {
    fontSize: 22,
    marginBottom: 10,
  },
  povestTitlu: {
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 18,
    marginBottom: 6,
  },
  povestDurata: {
    fontSize: 11,
    color: COLORS.textMuted,
  },
});
