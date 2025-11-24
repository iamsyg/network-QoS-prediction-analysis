import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ProviderScore {
  streaming: number;
  gaming: number;
  browsing: number;
  voip: number;
}

interface ProviderComparisonCardProps {
  provider: string;
  scores: ProviderScore;
  isBest?: boolean;
  color?: string;
}

const ProviderComparisonCard: React.FC<ProviderComparisonCardProps> = ({
  provider,
  scores,
  isBest = false,
  color = '#00A8E8',
}) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return '#4CAF50';
    if (score >= 60) return '#8BC34A';
    if (score >= 40) return '#FFC107';
    if (score >= 20) return '#FF9800';
    return '#F44336';
  };

  const ScoreBar = ({ label, score }: { label: string; score: number }) => (
    <View style={styles.scoreItem}>
      <Text style={styles.scoreLabel}>{label}</Text>
      <View style={styles.scoreContainer}>
        <View style={styles.scoreBar}>
          <View
            style={[
              styles.scoreFill,
              {
                width: `${score}%`,
                backgroundColor: getScoreColor(score),
              },
            ]}
          />
        </View>
        <Text style={styles.scoreValue}>{score}%</Text>
      </View>
    </View>
  );

  const getOverallScore = () => {
    const total = Object.values(scores).reduce((sum, score) => sum + score, 0);
    return Math.round(total / Object.values(scores).length);
  };

  return (
    <View style={[styles.container, isBest && styles.bestContainer]}>
      {isBest && (
        <View style={styles.bestBadge}>
          <Text style={styles.bestBadgeText}>BEST</Text>
        </View>
      )}
      
      {/* Header */}
      <View style={styles.header}>
        <View style={[styles.providerIcon, { backgroundColor: color }]} />
        <Text style={styles.providerName}>{provider}</Text>
        <View style={styles.overallScore}>
          <Text style={styles.overallScoreText}>{getOverallScore()}%</Text>
        </View>
      </View>

      {/* Scores */}
      <View style={styles.scoresContainer}>
        <ScoreBar label="Streaming" score={scores.streaming} />
        <ScoreBar label="Gaming" score={scores.gaming} />
        <ScoreBar label="Browsing" score={scores.browsing} />
        <ScoreBar label="VoIP Calls" score={scores.voip} />
      </View>

      {/* Recommendation */}
      <View style={styles.recommendation}>
        <Text style={styles.recommendationText}>
          Best for: {Object.entries(scores).reduce((a, b) => a[1] > b[1] ? a : b)[0]}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#16213e',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#00A8E8',
  },
  bestContainer: {
    borderLeftColor: '#4CAF50',
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  bestBadge: {
    position: 'absolute',
    top: -10,
    right: 20,
    backgroundColor: '#4CAF50',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  bestBadgeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  providerIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 12,
  },
  providerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    flex: 1,
  },
  overallScore: {
    backgroundColor: '#1a1a2e',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  overallScoreText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  scoresContainer: {
    marginBottom: 12,
  },
  scoreItem: {
    marginBottom: 12,
  },
  scoreLabel: {
    fontSize: 14,
    color: '#8f9bb3',
    marginBottom: 6,
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scoreBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#2d3748',
    borderRadius: 3,
    marginRight: 12,
    overflow: 'hidden',
  },
  scoreFill: {
    height: '100%',
    borderRadius: 3,
  },
  scoreValue: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: '500',
    minWidth: 35,
  },
  recommendation: {
    borderTopWidth: 1,
    borderTopColor: '#2d3748',
    paddingTop: 12,
  },
  recommendationText: {
    fontSize: 14,
    color: '#8f9bb3',
    fontStyle: 'italic',
  },
});

export default ProviderComparisonCard;