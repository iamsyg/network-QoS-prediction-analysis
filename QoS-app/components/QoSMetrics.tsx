// components/QoSMetrics.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';


const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  metricItem: {
    marginBottom: 16,
  },
  metricHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  metricLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  metricValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
});


interface MetricBarProps {
  label: string;
  value: number;
  max: number;
  color: string;
  unit: string;
}

const MetricBar: React.FC<MetricBarProps> = ({ label, value, max, color, unit }) => {
  const { colors } = useTheme();
  const percentage = (value / max) * 100;

  return (
    <View style={styles.metricItem}>
      <View style={styles.metricHeader}>
        <Text style={[styles.metricLabel, { color: colors.text }]}>{label}</Text>
        <Text style={[styles.metricValue, { color: colors.text }]}>
          {value} {unit}
        </Text>
      </View>
      <View style={[styles.progressBar, { backgroundColor: colors.border }]}>
        <View 
          style={[
            styles.progressFill, 
            { 
              width: `${percentage}%`,
              backgroundColor: color,
            }
          ]} 
        />
      </View>
    </View>
  );
};

const QoSMetrics: React.FC = () => {
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
    metricItem: {
      marginBottom: 16,
    },
    metricHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 8,
    },
    metricLabel: {
      fontSize: 14,
      fontWeight: '500',
    },
    metricValue: {
      fontSize: 14,
      fontWeight: '600',
    },
    progressBar: {
      height: 8,
      borderRadius: 4,
      overflow: 'hidden',
    },
    progressFill: {
      height: '100%',
      borderRadius: 4,
    },
  });

  const metrics = [
    { label: 'Bandwidth Usage', value: 65, max: 100, color: '#4CAF50', unit: 'Mbps' },
    { label: 'Packet Loss', value: 2, max: 10, color: '#FF9800', unit: '%' },
    { label: 'Jitter', value: 8, max: 20, color: '#2196F3', unit: 'ms' },
    { label: 'Latency', value: 32, max: 100, color: '#9C27B0', unit: 'ms' },
  ];

  return (
    <View style={styles.card}>
      <Text style={styles.title}>QoS Metrics</Text>
      {metrics.map((metric, index) => (
        <MetricBar key={index} {...metric} />
      ))}
    </View>
  );
};

export default QoSMetrics;