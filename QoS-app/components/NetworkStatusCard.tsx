// components/NetworkStatusCard.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';

const NetworkStatusCard: React.FC = () => {
  const { colors } = useTheme();
  const [pulseAnim] = React.useState(new Animated.Value(1));

  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const styles = StyleSheet.create({
    card: {
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 16,
      marginBottom: 16,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 3,
    },
    statusHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
    },
    statusTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.text,
    },
    statusBadge: {
      paddingHorizontal: 12,
      paddingVertical: 4,
      borderRadius: 16,
      backgroundColor: colors.success,
    },
    statusText: {
      color: colors.textLight,
      fontSize: 12,
      fontWeight: '600',
    },
    metricsRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 8,
    },
    metricItem: {
      alignItems: 'center',
    },
    metricValue: {
      fontSize: 16,
      fontWeight: 'bold',
      color: colors.text,
    },
    metricLabel: {
      fontSize: 12,
      color: colors.textSecondary,
      marginTop: 4,
    },
    pulseCircle: {
      width: 12,
      height: 12,
      borderRadius: 6,
      backgroundColor: colors.success,
      marginRight: 8,
    },
  });

  return (
    <View style={styles.card}>
      <View style={styles.statusHeader}>
        <Text style={styles.statusTitle}>Network Status</Text>
        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>OPTIMAL</Text>
        </View>
      </View>
      
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
        <Animated.View 
          style={[
            styles.pulseCircle,
            { transform: [{ scale: pulseAnim }] }
          ]} 
        />
        <Text style={{ color: colors.textSecondary }}>
          Real-time monitoring active
        </Text>
      </View>

      <View style={styles.metricsRow}>
        <View style={styles.metricItem}>
          <Text style={styles.metricValue}>5G</Text>
          <Text style={styles.metricLabel}>Connection</Text>
        </View>
        <View style={styles.metricItem}>
          <Text style={styles.metricValue}>78 Mbps</Text>
          <Text style={styles.metricLabel}>Download</Text>
        </View>
        <View style={styles.metricItem}>
          <Text style={styles.metricValue}>24 Mbps</Text>
          <Text style={styles.metricLabel}>Upload</Text>
        </View>
        <View style={styles.metricItem}>
          <Text style={styles.metricValue}>32ms</Text>
          <Text style={styles.metricLabel}>Latency</Text>
        </View>
      </View>
    </View>
  );
};

export default NetworkStatusCard;