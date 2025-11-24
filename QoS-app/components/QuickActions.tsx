// components/QuickActions.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';

interface ActionButtonProps {
  icon: string;
  label: string;
  onPress: () => void;
  color?: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({ icon, label, onPress, color }) => {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    actionButton: {
      alignItems: 'center',
      flex: 1,
      marginHorizontal: 8,
    },
    iconContainer: {
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: color || colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 8,
    },
    icon: {
      fontSize: 24,
      color: colors.textLight,
      fontWeight: 'bold',
    },
    label: {
      fontSize: 12,
      color: colors.text,
      textAlign: 'center',
      fontWeight: '500',
    },
  });

  return (
    <TouchableOpacity style={styles.actionButton} onPress={onPress}>
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>{icon}</Text>
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const QuickActions: React.FC = () => {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    card: {
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 16,
      marginBottom: 16,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 16,
    },
    actionsRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  });

  const actions = [
    { icon: '📊', label: 'Optimize', color: '#4CAF50' },
    { icon: '⚡', label: 'Boost', color: '#FF9800' },
    { icon: '📈', label: 'Analyze', color: '#2196F3' },
    { icon: '⚙️', label: 'Settings', color: '#607D8B' },
  ];

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Quick Actions</Text>
      <View style={styles.actionsRow}>
        {actions.map((action, index) => (
          <ActionButton
            key={index}
            icon={action.icon}
            label={action.label}
            color={action.color}
            onPress={() => console.log(`Pressed ${action.label}`)}
          />
        ))}
      </View>
    </View>
  );
};

export default QuickActions;