import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
} from 'react-native';
import PredictionCard from '../components/PredictionCard';

const PredictionScreen = () => {
  // Mock prediction data
  const predictions = [
    {
      quality: 'Good',
      confidence: 78,
      recommendation: 'Network stable for next 2 hours. Ideal for video streaming.',
      timeframe: 'Next 2 hours',
      riskFactors: ['Slight latency increase expected during peak hours'],
    },
    {
      quality: 'Fair',
      confidence: 65,
      recommendation: 'Consider switching to Airtel 5G for better gaming performance.',
      timeframe: 'Next 6 hours',
      riskFactors: ['Potential packet loss during evening', 'Higher latency in crowded areas'],
    },
    {
      quality: 'Excellent',
      confidence: 92,
      recommendation: 'Perfect conditions for VoIP calls and online meetings.',
      timeframe: 'Next 30 minutes',
      riskFactors: [],
    },
  ];

  const upcomingSpikes = [
    { time: '14:30', severity: 'Low', latency: 45 },
    { time: '16:45', severity: 'Medium', latency: 68 },
    { time: '19:15', severity: 'High', latency: 120 },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Low':
        return '#4CAF50';
      case 'Medium':
        return '#FFC107';
      case 'High':
        return '#F44336';
      default:
        return '#9E9E9E';
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a2e" />
      
      <ScrollView style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Network Predictions</Text>
          <Text style={styles.subtitle}>AI-powered QoS forecasting</Text>
        </View>

        {/* Current Prediction */}
        <Text style={styles.sectionTitle}>Current Predictions</Text>
        {predictions.map((prediction, index) => (
          <PredictionCard key={index} prediction={prediction} />
        ))}

        {/* Latency Spikes */}
        <View style={styles.spikesContainer}>
          <Text style={styles.sectionTitle}>Upcoming Latency Spikes</Text>
          <View style={styles.spikesList}>
            {upcomingSpikes.map((spike, index) => (
              <View key={index} style={styles.spikeItem}>
                <View style={styles.spikeTimeContainer}>
                  <Text style={styles.spikeTime}>{spike.time}</Text>
                  <View 
                    style={[
                      styles.severityIndicator,
                      { backgroundColor: getSeverityColor(spike.severity) }
                    ]} 
                  />
                </View>
                <View style={styles.spikeDetails}>
                  <Text style={styles.spikeSeverity}>{spike.severity} Severity</Text>
                  <Text style={styles.spikeLatency}>{spike.latency} ms</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Provider Recommendations */}
        <View style={styles.recommendationsContainer}>
          <Text style={styles.sectionTitle}>Provider Recommendations</Text>
          <View style={styles.recommendationCard}>
            <Text style={styles.recommendationTitle}>Best for Streaming</Text>
            <Text style={styles.recommendationProvider}>Jio 5G → 95% Stability</Text>
          </View>
          <View style={styles.recommendationCard}>
            <Text style={styles.recommendationTitle}>Best for Gaming</Text>
            <Text style={styles.recommendationProvider}>Airtel 5G → 28ms Latency</Text>
          </View>
          <View style={styles.recommendationCard}>
            <Text style={styles.recommendationTitle}>Best for VoIP</Text>
            <Text style={styles.recommendationProvider}>WiFi 6 → 0% Packet Loss</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  content: {
    flex: 1,
    padding: 20,
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
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 15,
    marginTop: 10,
  },
  spikesContainer: {
    backgroundColor: '#16213e',
    borderRadius: 12,
    padding: 20,
    marginVertical: 10,
  },
  spikesList: {
    marginTop: 10,
  },
  spikeItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#2d3748',
  },
  spikeTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spikeTime: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '500',
    marginRight: 8,
  },
  severityIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  spikeDetails: {
    alignItems: 'flex-end',
  },
  spikeSeverity: {
    fontSize: 14,
    color: '#8f9bb3',
    marginBottom: 2,
  },
  spikeLatency: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: '500',
  },
  recommendationsContainer: {
    marginVertical: 10,
  },
  recommendationCard: {
    backgroundColor: '#16213e',
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#00A8E8',
  },
  recommendationTitle: {
    fontSize: 16,
    color: '#8f9bb3',
    marginBottom: 4,
  },
  recommendationProvider: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '600',
  },
});

export default PredictionScreen;