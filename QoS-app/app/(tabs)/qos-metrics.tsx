import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import MetricBar from '@/components/MetricBar';

export default function QoSMetricsScreen() {
  const params = useLocalSearchParams();

  // Mock QoS metrics data
  const qosMetrics = [
    { label: 'Bandwidth', value: 85, maxValue: 100, unit: 'Mbps' },
    { label: 'Upload Speed', value: 42, maxValue: 50, unit: 'Mbps' },
    { label: 'Latency', value: 28, maxValue: 100, unit: 'ms', color: '#4CAF50' },
    { label: 'Jitter', value: 8, maxValue: 50, unit: 'ms', color: '#8BC34A' },
    { label: 'Packet Loss', value: 0.5, maxValue: 5, unit: '%', color: '#FFC107' },
    { label: 'Signal Strength', value: 92, maxValue: 100, unit: 'dBm', color: '#4CAF50' },
  ];

  const getOverallQuality = () => {
    const avgScore = qosMetrics.reduce((acc, metric) => {
      const score = (metric.value / metric.maxValue) * 100;
      return acc + score;
    }, 0) / qosMetrics.length;

    if (avgScore >= 80) return { quality: 'Excellent', color: '#4CAF50' };
    if (avgScore >= 60) return { quality: 'Good', color: '#8BC34A' };
    if (avgScore >= 40) return { quality: 'Fair', color: '#FFC107' };
    return { quality: 'Poor', color: '#F44336' };
  };

  const overall = getOverallQuality();

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>QoS Metrics</Text>
          <Text style={styles.subtitle}>Detailed Network Performance</Text>
        </View>

        {/* Overall Quality */}
        <View style={styles.overallCard}>
          <Text style={styles.overallLabel}>Overall Quality</Text>
          <View style={styles.overallValueContainer}>
            <View 
              style={[
                styles.qualityIndicator, 
                { backgroundColor: overall.color }
              ]} 
            />
            <Text style={styles.overallValue}>{overall.quality}</Text>
          </View>
        </View>

        {/* Metrics */}
        <View style={styles.metricsContainer}>
          <Text style={styles.sectionTitle}>Performance Metrics</Text>
          {qosMetrics.map((metric, index) => (
            <MetricBar
              key={index}
              label={metric.label}
              value={metric.value}
              maxValue={metric.maxValue}
              unit={metric.unit}
              color={metric.color}
            />
          ))}
        </View>

        {/* Additional Info */}
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Current Network</Text>
          <View style={styles.infoGrid}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Provider</Text>
              <Text style={styles.infoValue}>Jio</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Technology</Text>
              <Text style={styles.infoValue}>5G</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Location</Text>
              <Text style={styles.infoValue}>Mumbai</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Last Updated</Text>
              <Text style={styles.infoValue}>2 min ago</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  content: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#8f9bb3',
  },
  overallCard: {
    backgroundColor: '#16213e',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  overallLabel: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: '600',
  },
  overallValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  qualityIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  overallValue: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  metricsContainer: {
    backgroundColor: '#16213e',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 20,
  },
  infoCard: {
    backgroundColor: '#16213e',
    borderRadius: 12,
    padding: 20,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 15,
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  infoItem: {
    width: '48%',
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 14,
    color: '#8f9bb3',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '500',
  },
});