// components/PredictionChart.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';

interface PredictionData {
  hour: string;
  actual: number | null;
  predicted: number;
  color: string;
}

const PredictionChart: React.FC = () => {
  const { colors } = useTheme();
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  
  // Responsive calculations
  const isLandscape = screenWidth > screenHeight;
  const chartHeight = isLandscape ? 150 : 200;
  const barWidth = Math.max(30, (Math.min(screenWidth, 600) - 80) / 7); // Minimum 30px, max based on screen
  const containerPadding = 16;
  const availableWidth = screenWidth - (containerPadding * 2);

  const styles = StyleSheet.create({
    card: {
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: containerPadding,
      marginBottom: 16,
      marginHorizontal: 8,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 16,
      textAlign: 'center',
    },
    chartScrollContainer: {
      height: chartHeight + 40, // Extra space for labels
    },
    chartContainer: {
      height: chartHeight,
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: isLandscape ? 'space-around' : 'flex-start',
      paddingVertical: 16,
      minWidth: availableWidth - 32,
    },
    chartBarGroup: {
      alignItems: 'center',
      marginHorizontal: isLandscape ? 0 : 4,
      width: barWidth,
    },
    chartBar: {
      width: barWidth - 8,
      borderRadius: 4,
      minHeight: 2, // Ensure bars are visible even with very low values
    },
    actualBar: {
      marginBottom: 4,
    },
    barLabel: {
      textAlign: 'center',
      fontSize: screenWidth < 350 ? 8 : 10,
      color: colors.textSecondary,
      marginTop: 8,
      minHeight: 12,
    },
    valueLabel: {
      textAlign: 'center',
      fontSize: screenWidth < 350 ? 8 : 9,
      color: colors.textSecondary,
      marginTop: 2,
    },
    legend: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 16,
      flexWrap: 'wrap',
      gap: 12,
    },
    legendItem: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    legendColor: {
      width: 12,
      height: 12,
      borderRadius: 6,
      marginRight: 6,
    },
    legendText: {
      fontSize: screenWidth < 350 ? 10 : 12,
      color: colors.textSecondary,
    },
    predictionInfo: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 12,
      paddingHorizontal: 8,
    },
    predictionText: {
      fontSize: screenWidth < 350 ? 12 : 14,
      color: colors.text,
      fontWeight: '500',
    },
    accuracyBadge: {
      paddingHorizontal: 12,
      paddingVertical: 4,
      borderRadius: 12,
      backgroundColor: colors.success + '20',
    },
    accuracyText: {
      fontSize: screenWidth < 350 ? 10 : 12,
      color: colors.success,
      fontWeight: '600',
    },
    noDataText: {
      textAlign: 'center',
      color: colors.textSecondary,
      fontSize: 14,
      marginTop: chartHeight / 3,
    },
  });

  // Enhanced mock prediction data with quality scores
  const predictionData: PredictionData[] = [
    { hour: 'Now', actual: 180, predicted: 185, color: '#4CAF50' },
    { hour: '+1h', actual: 165, predicted: 170, color: '#2196F3' },
    { hour: '+2h', actual: 150, predicted: 155, color: '#FF9800' },
    { hour: '+3h', actual: null, predicted: 145, color: '#9C27B0' },
    { hour: '+4h', actual: null, predicted: 135, color: '#E91E63' },
    { hour: '+5h', actual: null, predicted: 125, color: '#607D8B' },
    { hour: '+6h', actual: null, predicted: 120, color: '#795548' },
  ];

  const maxValue = Math.max(
    ...predictionData.map(item => Math.max(item.actual || 0, item.predicted))
  ) * 1.1; // Add 10% padding

  const calculateAccuracy = () => {
    const actualData = predictionData.filter(item => item.actual !== null);
    if (actualData.length === 0) return 0;
    
    const totalError = actualData.reduce((sum, item) => {
      return sum + Math.abs((item.actual! - item.predicted) / item.actual!);
    }, 0);
    
    return Math.max(0, 100 - (totalError / actualData.length) * 100);
  };

  const accuracy = calculateAccuracy();

  const getQualityText = (value: number) => {
    if (value >= 160) return 'Excellent';
    if (value >= 120) return 'Good';
    if (value >= 80) return 'Fair';
    return 'Poor';
  };

  const renderBarGroup = (item: PredictionData, index: number) => {
    const actualHeight = item.actual ? (item.actual / maxValue) * (chartHeight - 40) : 0;
    const predictedHeight = (item.predicted / maxValue) * (chartHeight - 40);

    return (
      <View key={index} style={styles.chartBarGroup}>
        {/* Value Labels */}
        <Text style={styles.valueLabel}>
          {item.predicted}
        </Text>
        
        {/* Bars */}
        {item.actual && (
          <View
            style={[
              styles.chartBar,
              styles.actualBar,
              {
                height: Math.max(actualHeight, 2), // Minimum 2px height
                backgroundColor: colors.primary + '80',
              },
            ]}
          />
        )}
        <View
          style={[
            styles.chartBar,
            {
              height: Math.max(predictedHeight, 2), // Minimum 2px height
              backgroundColor: item.color,
              opacity: item.actual ? 1 : 0.7,
            },
          ]}
        />
        
        {/* Hour Label */}
        <Text style={styles.barLabel}>{item.hour}</Text>
        
        {/* Quality Indicator for future predictions */}
        {!item.actual && (
          <Text style={[styles.valueLabel, { color: item.color }]}>
            {getQualityText(item.predicted)}
          </Text>
        )}
      </View>
    );
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Quality Prediction</Text>
      
      {predictionData.length === 0 ? (
        <Text style={styles.noDataText}>No prediction data available</Text>
      ) : (
        <>
          <ScrollView 
            horizontal={!isLandscape}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={
              isLandscape 
                ? styles.chartContainer
                : { paddingHorizontal: 8 }
            }
            style={styles.chartScrollContainer}
          >
            {isLandscape ? (
              predictionData.map(renderBarGroup)
            ) : (
              <View style={styles.chartContainer}>
                {predictionData.map(renderBarGroup)}
              </View>
            )}
          </ScrollView>

          <View style={styles.predictionInfo}>
            <Text style={styles.predictionText}>
              Next 6h: {getQualityText(predictionData[6].predicted)}
            </Text>
            <View style={styles.accuracyBadge}>
              <Text style={styles.accuracyText}>
                {accuracy.toFixed(1)}% Accuracy
              </Text>
            </View>
          </View>

          <View style={styles.legend}>
            <View style={styles.legendItem}>
              <View style={[styles.legendColor, { backgroundColor: colors.primary + '80' }]} />
              <Text style={styles.legendText}>Actual</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendColor, { backgroundColor: '#9C27B0' }]} />
              <Text style={styles.legendText}>Predicted</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendColor, { backgroundColor: '#4CAF50' }]} />
              <Text style={styles.legendText}>Excellent</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendColor, { backgroundColor: '#FF9800' }]} />
              <Text style={styles.legendText}>Fair</Text>
            </View>
          </View>
        </>
      )}
    </View>
  );
};

export default PredictionChart;