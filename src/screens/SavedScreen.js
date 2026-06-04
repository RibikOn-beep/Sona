import { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, SafeAreaView, Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../utils/colors';
import { useSona } from '../context/SonaContext';

export default function SavedScreen() {
  const navigation = useNavigation();
  const { savedAtmospheres, setSavedAtmospheres, loadAtmosphere } = useSona();

  const handleLoad = (atmosphere) => {
    loadAtmosphere(atmosphere);
    navigation.navigate('Player');
  };

  const handleDelete = (id) => {
    Alert.alert(
      'Șterge atmosfera',
      'Ești sigur că vrei să ștergi această atmosferă?',
      [
        { text: 'Anulează', style: 'cancel' },
        {
          text: 'Șterge',
          style: 'destructive',
          onPress: () => setSavedAtmospheres(prev => prev.filter(a => a.id !== id)),
        },
      ]
    );
  };

  const formatData = (iso) => {
    const d = new Date(iso);
    return `${d.getDate().toString().padStart(2, '0')}.${(d.getMonth() + 1).toString().padStart(2, '0')}.${d.getFullYear()}`;
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>

        <View style={styles.header}>
          <Text style={styles.titlu}>Atmosferele mele</Text>
          <Text style={styles.subtitlu}>{savedAtmospheres.length} / 10 salvate</Text>
        </View>

        {savedAtmospheres.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.emptyIcon}>♡</Text>
            <Text style={styles.emptyTitlu}>Nicio atmosferă salvată</Text>
            <Text style={styles.emptySubtitlu}>
              Creează un mix în Player și apasă Salvează pentru a-l păstra aici
            </Text>
            <TouchableOpacity
              style={styles.goPlayerBtn}
              onPress={() => navigation.navigate('Player')}
            >
              <Text style={styles.goPlayerBtnText}>Mergi la Player</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.lista}>
            {savedAtmospheres.map(atm => (
              <View key={atm.id} style={styles.atmCard}>
                <TouchableOpacity
                  style={styles.atmMain}
                  onPress={() => handleLoad(atm)}
                  activeOpacity={0.75}
                >
                  <View>
                    <Text style={styles.atmNume}>{atm.name}</Text>
                    <Text style={styles.atmData}>{formatData(atm.createdAt)}</Text>
                  </View>
                  <View style={styles.atmSunete}>
                    {atm.sounds.map((s, i) => (
                      <View key={i} style={styles.sunetPill}>
                        <Text style={styles.sunetPillText} numberOfLines={1}>{s.name}</Text>
                      </View>
                    ))}
                  </View>
                </TouchableOpacity>

                <View style={styles.atmActions}>
                  <TouchableOpacity
                    style={styles.loadBtn}
                    onPress={() => handleLoad(atm)}
                  >
                    <Text style={styles.loadBtnText}>▶ Redă</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.deleteBtn}
                    onPress={() => handleDelete(atm.id)}
                  >
                    <Text style={styles.deleteBtnText}>✕</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background },
  container: { paddingBottom: 40 },
  header: { paddingHorizontal: 24, paddingTop: 48, paddingBottom: 24, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  titlu: { fontSize: 28, fontWeight: '500', color: COLORS.textPrimary },
  subtitlu: { fontSize: 13, color: COLORS.textMuted },
  empty: { alignItems: 'center', paddingHorizontal: 40, paddingTop: 60 },
  emptyIcon: { fontSize: 48, marginBottom: 16 },
  emptyTitlu: { fontSize: 18, fontWeight: '500', color: COLORS.textPrimary, marginBottom: 8 },
  emptySubtitlu: { fontSize: 14, color: COLORS.textMuted, textAlign: 'center', lineHeight: 22, marginBottom: 32 },
  goPlayerBtn: { backgroundColor: COLORS.surface, borderWidth: 1, borderColor: COLORS.border, borderRadius: 12, paddingHorizontal: 24, paddingVertical: 14 },
  goPlayerBtnText: { color: COLORS.accent, fontSize: 15, fontWeight: '500' },
  lista: { paddingHorizontal: 16, gap: 10 },
  atmCard: { backgroundColor: COLORS.surface, borderWidth: 1, borderColor: COLORS.border, borderRadius: 16, overflow: 'hidden' },
  atmMain: { padding: 16 },
  atmNume: { fontSize: 16, fontWeight: '500', color: COLORS.textPrimary, marginBottom: 4 },
  atmData: { fontSize: 12, color: COLORS.textMuted, marginBottom: 12 },
  atmSunete: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  sunetPill: { backgroundColor: COLORS.background, borderWidth: 1, borderColor: COLORS.border, borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4 },
  sunetPillText: { fontSize: 11, color: COLORS.textSecondary, maxWidth: 120 },
  atmActions: { flexDirection: 'row', borderTopWidth: 0.5, borderTopColor: COLORS.border },
  loadBtn: { flex: 1, paddingVertical: 12, alignItems: 'center', borderRightWidth: 0.5, borderRightColor: COLORS.border },
  loadBtnText: { fontSize: 14, color: COLORS.accent, fontWeight: '500' },
  deleteBtn: { paddingVertical: 12, paddingHorizontal: 20, alignItems: 'center' },
  deleteBtnText: { fontSize: 16, color: COLORS.textMuted },
});
