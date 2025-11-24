import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import ProviderComparisonCard from '../../components/ProviderComparisonCard';

export default function ProviderComparisonScreen() {
  // Mock provider comparison data
  const providers = [
    {
      name: 'Jio',
      scores: {
        streaming: 95,
        gaming: 88,
        browsing: 92,
        voip: 90,
      },
      color: '#FF6B35',
      isBest: true,
    },
    {
      name: 'Airtel',
      scores: {
        streaming: 90,
        gaming: 92,
        browsing: 88,
        voip: 85,
      },
      color: '#00A8E8',
      isBest: false,
    },
    {
      name: 'Vi',
      scores: {
        streaming: 75,
        gaming: 70,
        browsing: 78,
        voip: 72,
      },
      color: '#8A2BE2',
      isBest: false,
    },
    {
      name: 'WiFi',
      scores: {
        streaming: 98,
        gaming: 85,
        browsing: 96,
        voip: 95,
      },
      color: '#FFD166',
      isBest: false,
    },
  ];

  const getBestOverallProvider = () => {
    return providers.reduce((best, current) => {
      const currentScore = Object.values(current.scores).reduce((a, b) => a + b) / 4;
      const bestScore = Object.values(best.scores).reduce((a, b) => a + b) / 4;
      return currentScore > bestScore ? current : best;
    });
  };

  const bestProvider = getBestOverallProvider();

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Provider Comparison</Text>
          <Text style={styles.subtitle}>Performance across different use cases</Text>
        </View>

        {/* Best Provider Highlight */}
        <View style={styles.bestProviderCard}>
          <View style={styles.bestProviderHeader}>
            <Text style={styles.bestProviderTitle}>🏆 Best Overall</Text>
            <View style={[styles.providerTag, { backgroundColor: bestProvider.color }]}>
              <Text style={styles.providerTagText}>{bestProvider.name}</Text>
            </View>
          </View>
          <Text style={styles.bestProviderDescription}>
            {bestProvider.name} provides the most consistent performance across all categories, 
            making it the recommended choice for general use.
          </Text>
        </View>

        {/* Comparison Cards */}
        <Text style={styles.sectionTitle}>Detailed Comparison</Text>
        {providers.map((provider, index) => (
          <ProviderComparisonCard
            key={index}
            provider={provider.name}
            scores={provider.scores}
            isBest={provider.isBest}
            color={provider.color}
          />
        ))}
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
  bestProviderCard: {
    backgroundColor: '#16213e',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  bestProviderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  bestProviderTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  providerTag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  providerTagText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  bestProviderDescription: {
    fontSize: 14,
    color: '#8f9bb3',
    lineHeight: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 15,
    marginTop: 10,
  },
});