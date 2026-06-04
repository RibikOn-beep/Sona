import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../utils/colors';

export default function PlayerScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>PlayerScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: COLORS.textPrimary,
    fontSize: 18,
  },
});
