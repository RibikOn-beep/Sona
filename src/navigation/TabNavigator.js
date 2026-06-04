import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import StoriesScreen from '../screens/StoriesScreen';
import PlayerScreen from '../screens/PlayerScreen';
import AlarmScreen from '../screens/AlarmScreen';
import SavedScreen from '../screens/SavedScreen';
import { COLORS } from '../utils/colors';

const Tab = createBottomTabNavigator();

const TabIcon = ({ name, focused }) => (
  <View style={styles.iconWrap}>
    <Text style={[styles.icon, focused && styles.iconActive]}>{name}</Text>
  </View>
);

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: true,
        tabBarLabelStyle: styles.label,
        tabBarActiveTintColor: COLORS.accent,
        tabBarInactiveTintColor: COLORS.textMuted,
      }}
    >
      <Tab.Screen
        name="Acasă"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon name="🌙" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Povești"
        component={StoriesScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon name="✨" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Player"
        component={PlayerScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon name="▶" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Trezire"
        component={AlarmScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon name="🌅" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Salvate"
        component={SavedScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon name="♡" focused={focused} />,
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: COLORS.surface,
    borderTopColor: COLORS.border,
    borderTopWidth: 0.5,
    height: 64,
    paddingBottom: 8,
    paddingTop: 8,
  },
  label: {
    fontSize: 11,
    fontWeight: '500',
  },
  iconWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 20,
    opacity: 0.4,
  },
  iconActive: {
    opacity: 1,
  },
});
