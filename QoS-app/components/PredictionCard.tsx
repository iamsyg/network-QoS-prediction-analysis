import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface PredictionCardProps {
  prediction: {
    quality: string;
    confidence: number;
    recommendation: string;
    timeframe: string;
    riskFactors: string[];
  };
}

const PredictionCard: React.FC<PredictionCardProps> = ({ prediction }) => {
  const getQualityColor = (quality: string) => {
    switch (quality) {
      case 'Excellent':
        return '#4CAF50';
      case 'Good':
        return '#8BC34A';
      case 'Fair':
        return '#FFC107';
      case 'Poor':
        return '#F44336';
      default:
        return '#9E9E9E';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return '#4CAF50';
    if (confidence >= 60) return '#8BC34A';
    if (confidence >= 40) return '#FFC107';
    return '#F44336';
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>QoS Prediction</Text>
        <Text style={styles.timeframe}>{prediction.timeframe}</Text>
      </View>

      {/* Quality and Confidence */}
      <View style={styles.qualityContainer}>
        <View style={styles.qualityItem}>
          <Text style={styles.label}>Predicted Quality</Text>
          <View style={styles.qualityValueContainer}>
            <View 
              style={[
                styles.qualityDot, 
                { backgroundColor: getQualityColor(prediction.quality) }
              ]} 
            />
            <Text style={styles.qualityValue}>{prediction.quality}</Text>
          </View>
        </View>
        
        <View style={styles.qualityItem}>
          <Text style={styles.label}>Confidence</Text>
          <View style={styles.confidenceContainer}>
            <View style={styles.confidenceBar}>
              <View 
                style={[
                  styles.confidenceFill,
                  { 
                    width: `${prediction.confidence}%`,
                    backgroundColor: getConfidenceColor(prediction.confidence)
                  }
                ]} 
              />
            </View>
            <Text style={styles.confidenceValue}>{prediction.confidence}%</Text>
          </View>
        </View>
      </View>

      {/* Recommendation */}
      <View style={styles.recommendationContainer}>
        <Text style={styles.recommendationLabel}>Recommendation</Text>
        <Text style={styles.recommendationText}>{prediction.recommendation}</Text>
      </View>

      {/* Risk Factors */}
      {prediction.riskFactors.length > 0 && (
        <View style={styles.riskContainer}>
          <Text style={styles.riskLabel}>Potential Issues</Text>
          {prediction.riskFactors.map((factor, index) => (
            <View key={index} style={styles.riskItem}>
              <View style={styles.riskDot} />
              <Text style={styles.riskText}>{factor}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#16213e',
    borderRadius: 12,
    padding: 20,
    marginVertical: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  timeframe: {
    fontSize: 14,
    color: '#8f9bb3',
  },
  qualityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  qualityItem: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    color: '#8f9bb3',
    marginBottom: 8,
  },
  qualityValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  qualityDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  qualityValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  confidenceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  confidenceBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#2d3748',
    borderRadius: 3,
    marginRight: 8,
    overflow: 'hidden',
  },
  confidenceFill: {
    height: '100%',
    borderRadius: 3,
  },
  confidenceValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
    minWidth: 40,
  },
  recommendationContainer: {
    backgroundColor: '#1e3a5f',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  recommendationLabel: {
    fontSize: 14,
    color: '#8f9bb3',
    marginBottom: 4,
  },
  recommendationText: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: '500',
  },
  riskContainer: {
    borderTopWidth: 1,
    borderTopColor: '#2d3748',
    paddingTop: 16,
  },
  riskLabel: {
    fontSize: 14,
    color: '#8f9bb3',
    marginBottom: 8,
  },
  riskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  riskDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FF6B6B',
    marginRight: 8,
  },
  riskText: {
    fontSize: 14,
    color: '#ffffff',
    flex: 1,
  },
});

export default PredictionCard;