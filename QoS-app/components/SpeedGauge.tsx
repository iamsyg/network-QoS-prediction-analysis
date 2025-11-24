import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle, G, Text as SvgText } from 'react-native-svg';

interface SpeedGaugeProps {
  downloadSpeed: number;
  uploadSpeed: number;
  ping: number;
  maxSpeed?: number;
  size?: number;
  strokeWidth?: number;
}

const SpeedGauge: React.FC<SpeedGaugeProps> = ({
  downloadSpeed,
  uploadSpeed,
  ping,
  maxSpeed = 100,
  size = 200,
  strokeWidth = 20,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const getSpeedPercentage = (speed: number) => (speed / maxSpeed) * 100;
  const getStrokeDashoffset = (percentage: number) => circumference - (percentage / 100) * circumference;

  const downloadPercentage = getSpeedPercentage(downloadSpeed);
  const uploadPercentage = getSpeedPercentage(uploadSpeed);

  const getSpeedColor = (speed: number) => {
    const percentage = getSpeedPercentage(speed);
    if (percentage >= 80) return '#4CAF50';
    if (percentage >= 60) return '#8BC34A';
    if (percentage >= 40) return '#FFC107';
    if (percentage >= 20) return '#FF9800';
    return '#F44336';
  };

  const getPingColor = (pingValue: number) => {
    if (pingValue < 30) return '#4CAF50';
    if (pingValue < 60) return '#8BC34A';
    if (pingValue < 100) return '#FFC107';
    if (pingValue < 200) return '#FF9800';
    return '#F44336';
  };

  return (
    <View style={styles.container}>
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Background Circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#2d3748"
          strokeWidth={strokeWidth}
          fill="none"
        />
        
        {/* Download Speed Arc */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={getSpeedColor(downloadSpeed)}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={getStrokeDashoffset(downloadPercentage)}
          strokeLinecap="round"
          rotation={-90}
          origin={`${size / 2}, ${size / 2}`}
        />
        
        {/* Upload Speed Arc (inner) */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius - strokeWidth}
          stroke={getSpeedColor(uploadSpeed)}
          strokeWidth={strokeWidth - 8}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={getStrokeDashoffset(uploadPercentage)}
          strokeLinecap="round"
          rotation={-90}
          origin={`${size / 2}, ${size / 2}`}
        />

        {/* Center Text */}
        <G>
          <SvgText
            x={size / 2}
            y={size / 2 - 15}
            textAnchor="middle"
            fill="#ffffff"
            fontSize="20"
            fontWeight="bold"
          >
            {downloadSpeed} Mbps
          </SvgText>
          <SvgText
            x={size / 2}
            y={size / 2 + 10}
            textAnchor="middle"
            fill="#8f9bb3"
            fontSize="14"
          >
            Download
          </SvgText>
          <SvgText
            x={size / 2}
            y={size / 2 + 30}
            textAnchor="middle"
            fill="#8f9bb3"
            fontSize="12"
          >
            {uploadSpeed} Mbps Upload
          </SvgText>
        </G>
      </Svg>

      {/* Ping Indicator */}
      <View style={[styles.pingIndicator, { backgroundColor: getPingColor(ping) }]}>
        <Text style={styles.pingText}>Ping: {ping} ms</Text>
      </View>

      {/* Speed Labels */}
      <View style={styles.speedLabels}>
        <View style={styles.speedLabel}>
          <View style={[styles.speedDot, { backgroundColor: getSpeedColor(downloadSpeed) }]} />
          <Text style={styles.speedLabelText}>Download: {downloadSpeed} Mbps</Text>
        </View>
        <View style={styles.speedLabel}>
          <View style={[styles.speedDot, { backgroundColor: getSpeedColor(uploadSpeed) }]} />
          <Text style={styles.speedLabelText}>Upload: {uploadSpeed} Mbps</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  pingIndicator: {
    position: 'absolute',
    top: 10,
    right: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  pingText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  speedLabels: {
    marginTop: 20,
    width: '100%',
  },
  speedLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    justifyContent: 'center',
  },
  speedDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  speedLabelText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default SpeedGauge;