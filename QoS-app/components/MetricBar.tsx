import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface MetricBarProps {
  label: string;
  value: number;
  maxValue: number;
  unit: string;
  color?: string;
}

const MetricBar: React.FC<MetricBarProps> = ({
  label,
  value,
  maxValue,
  unit,
  color = '#00A8E8',
}) => {
  const percentage = Math.min((value / maxValue) * 100, 100);

  const getBarColor = (val: number, max: number) => {
    const ratio = val / max;
    if (ratio >= 0.8) return '#4CAF50';
    if (ratio >= 0.6) return '#8BC34A';
    if (ratio >= 0.4) return '#FFC107';
    if (ratio >= 0.2) return '#FF9800';
    return '#F44336';
  };

  const barColor = color || getBarColor(value, maxValue);

  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>
          {value} {unit}
        </Text>
      </View>
      <View style={styles.barContainer}>
        <View style={styles.barBackground}>
          <View
            style={[
              styles.barFill,
              {
                width: `${percentage}%`,
                backgroundColor: barColor,
              },
            ]}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '500',
  },
  value: {
    fontSize: 14,
    color: '#8f9bb3',
    fontWeight: '500',
  },
  barContainer: {
    width: '100%',
  },
  barBackground: {
    height: 8,
    backgroundColor: '#2d3748',
    borderRadius: 4,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 4,
  },
});

export default MetricBar;