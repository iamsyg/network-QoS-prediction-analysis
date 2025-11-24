// components/ServiceLevels.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';

interface ServiceItemProps {
  name: string;
  level: 'Premium' | 'Standard' | 'Basic';
  priority: number;
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
}

const ServiceItem: React.FC<ServiceItemProps> = ({
  name,
  level,
  priority,
  enabled,
  onToggle,
}) => {
  const { colors } = useTheme();

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Premium': return colors.success;
      case 'Standard': return colors.warning;
      case 'Basic': return colors.error;
      default: return colors.textSecondary;
    }
  };

  const styles = StyleSheet.create({
    serviceItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    serviceInfo: {
      flex: 1,
    },
    serviceName: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 4,
    },
    serviceMeta: {
      flexDirection: 'row',
    },
    levelBadge: {
      paddingHorizontal: 8,
      paddingVertical: 2,
      borderRadius: 12,
      marginRight: 8,
    },
    levelText: {
      fontSize: 12,
      fontWeight: '600',
      color: colors.textLight,
    },
    priorityText: {
      fontSize: 12,
      color: colors.textSecondary,
    },
  });

  return (
    <View style={styles.serviceItem}>
      <View style={styles.serviceInfo}>
        <Text style={styles.serviceName}>{name}</Text>
        <View style={styles.serviceMeta}>
          <View style={[styles.levelBadge, { backgroundColor: getLevelColor(level) }]}>
            <Text style={styles.levelText}>{level}</Text>
          </View>
          <Text style={styles.priorityText}>Priority: {priority}</Text>
        </View>
      </View>
      <Switch
        value={enabled}
        onValueChange={onToggle}
        trackColor={{ false: colors.border, true: colors.primary }}
        thumbColor={colors.background}
      />
    </View>
  );
};

const ServiceLevels: React.FC = () => {
  const { colors } = useTheme();
  const [services, setServices] = React.useState([
    { id: 1, name: 'Video Streaming', level: 'Premium' as const, priority: 1, enabled: true },
    { id: 2, name: 'Voice Calls', level: 'Premium' as const, priority: 2, enabled: true },
    { id: 3, name: 'Gaming', level: 'Standard' as const, priority: 3, enabled: true },
    { id: 4, name: 'File Downloads', level: 'Basic' as const, priority: 4, enabled: false },
    { id: 5, name: 'Background Sync', level: 'Basic' as const, priority: 5, enabled: true },
  ]);

  const handleToggle = (id: number, enabled: boolean) => {
    setServices(services.map(service =>
      service.id === id ? { ...service, enabled } : service
    ));
  };

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
  });

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Service Levels</Text>
      {services.map(service => (
        <ServiceItem
          key={service.id}
          name={service.name}
          level={service.level}
          priority={service.priority}
          enabled={service.enabled}
          onToggle={(enabled) => handleToggle(service.id, enabled)}
        />
      ))}
    </View>
  );
};

export default ServiceLevels;