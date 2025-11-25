import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import Svg, { Circle, G, Text as SvgText } from 'react-native-svg';

interface SpeedGaugeProps {
  downloadSpeed: number;
  uploadSpeed: number;
  ping: number;
  maxSpeed?: number;
  size?: number;
  strokeWidth?: number;
  isTesting?: boolean;
}

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const SpeedGauge: React.FC<SpeedGaugeProps> = ({
  downloadSpeed,
  uploadSpeed,
  ping,
  maxSpeed = 100,
  size = 200,
  strokeWidth = 20,
  isTesting = false,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // Animated values for smooth transitions
  const downloadAnim = useRef(new Animated.Value(0)).current;
  const uploadAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  // Animate download speed changes
  useEffect(() => {
    Animated.spring(downloadAnim, {
      toValue: downloadSpeed,
      useNativeDriver: true,
      friction: 8,
      tension: 40,
    }).start();
  }, [downloadSpeed]);

  // Animate upload speed changes
  useEffect(() => {
    Animated.spring(uploadAnim, {
      toValue: uploadSpeed,
      useNativeDriver: true,
      friction: 8,
      tension: 40,
    }).start();
  }, [uploadSpeed]);

  // Pulse animation when testing
  useEffect(() => {
    if (isTesting) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.05,
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
    } else {
      pulseAnim.setValue(1);
    }
  }, [isTesting]);

  const getSpeedPercentage = (speed: number) => (speed / maxSpeed) * 100;
  const getStrokeDashoffset = (percentage: number) => 
    circumference - (percentage / 100) * circumference;

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
    if (pingValue === 0) return '#2d3748';
    if (pingValue < 30) return '#4CAF50';
    if (pingValue < 60) return '#8BC34A';
    if (pingValue < 100) return '#FFC107';
    if (pingValue < 200) return '#FF9800';
    return '#F44336';
  };

  const getSpeedQuality = (speed: number) => {
    const percentage = getSpeedPercentage(speed);
    if (percentage >= 80) return 'Excellent';
    if (percentage >= 60) return 'Good';
    if (percentage >= 40) return 'Fair';
    if (percentage >= 20) return 'Poor';
    if (speed > 0) return 'Slow';
    return 'N/A';
  };

  const getPingQuality = (pingValue: number) => {
    if (pingValue === 0) return 'N/A';
    if (pingValue < 30) return 'Excellent';
    if (pingValue < 60) return 'Good';
    if (pingValue < 100) return 'Fair';
    if (pingValue < 200) return 'Poor';
    return 'High';
  };

  return (
    <View style={styles.container}>
      <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
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
            opacity={0.8}
          />

          {/* Center Text */}
          <G>
            <SvgText
              x={size / 2}
              y={size / 2 - 20}
              textAnchor="middle"
              fill="#ffffff"
              fontSize="28"
              fontWeight="bold"
            >
              {downloadSpeed.toFixed(1)}
            </SvgText>
            <SvgText
              x={size / 2}
              y={size / 2 + 5}
              textAnchor="middle"
              fill="#8f9bb3"
              fontSize="16"
            >
              Mbps
            </SvgText>
            <SvgText
              x={size / 2}
              y={size / 2 + 25}
              textAnchor="middle"
              fill={getSpeedColor(downloadSpeed)}
              fontSize="14"
              fontWeight="600"
            >
              {getSpeedQuality(downloadSpeed)}
            </SvgText>
          </G>
        </Svg>
      </Animated.View>

      {/* Ping Indicator */}
      <View style={[styles.pingIndicator, { backgroundColor: getPingColor(ping) }]}>
        <Text style={styles.pingText}>
          {ping > 0 ? `${ping.toFixed(0)} ms` : 'Testing...'}
        </Text>
      </View>

      {/* Speed Cards */}
      <View style={styles.speedCards}>
        {/* Download Card */}
        <View style={[styles.speedCard, { borderLeftColor: getSpeedColor(downloadSpeed) }]}>
          <View style={styles.speedCardHeader}>
            <View style={[styles.speedDot, { backgroundColor: getSpeedColor(downloadSpeed) }]} />
            <Text style={styles.speedCardTitle}>Download</Text>
          </View>
          <Text style={styles.speedCardValue}>{downloadSpeed.toFixed(1)} Mbps</Text>
          <Text style={[styles.speedCardQuality, { color: getSpeedColor(downloadSpeed) }]}>
            {getSpeedQuality(downloadSpeed)}
          </Text>
        </View>

        {/* Upload Card */}
        <View style={[styles.speedCard, { borderLeftColor: getSpeedColor(uploadSpeed) }]}>
          <View style={styles.speedCardHeader}>
            <View style={[styles.speedDot, { backgroundColor: getSpeedColor(uploadSpeed) }]} />
            <Text style={styles.speedCardTitle}>Upload</Text>
          </View>
          <Text style={styles.speedCardValue}>{uploadSpeed.toFixed(1)} Mbps</Text>
          <Text style={[styles.speedCardQuality, { color: getSpeedColor(uploadSpeed) }]}>
            {getSpeedQuality(uploadSpeed)}
          </Text>
        </View>
      </View>

      {/* Latency Info */}
      <View style={styles.latencyContainer}>
        <View style={styles.latencyCard}>
          <Text style={styles.latencyLabel}>Latency</Text>
          <Text style={[styles.latencyValue, { color: getPingColor(ping) }]}>
            {ping > 0 ? `${ping.toFixed(1)} ms` : '-- ms'}
          </Text>
          <Text style={styles.latencyQuality}>{getPingQuality(ping)}</Text>
        </View>
      </View>

      {/* Testing Indicator */}
      {isTesting && (
        <View style={styles.testingIndicator}>
          <View style={styles.testingDot} />
          <Text style={styles.testingText}>Running Speed Test...</Text>
        </View>
      )}
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  pingText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  speedCards: {
    flexDirection: 'row',
    marginTop: 30,
    width: '100%',
    justifyContent: 'space-between',
    gap: 15,
  },
  speedCard: {
    flex: 1,
    backgroundColor: '#2d2d44',
    borderRadius: 12,
    padding: 15,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  speedCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  speedDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  speedCardTitle: {
    color: '#8f9bb3',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  speedCardValue: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  speedCardQuality: {
    fontSize: 12,
    fontWeight: '600',
  },
  latencyContainer: {
    marginTop: 15,
    width: '100%',
  },
  latencyCard: {
    backgroundColor: '#2d2d44',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  latencyLabel: {
    color: '#8f9bb3',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  latencyValue: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  latencyQuality: {
    color: '#8f9bb3',
    fontSize: 12,
    fontWeight: '600',
  },
  testingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: 'rgba(255, 107, 53, 0.2)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 107, 53, 0.5)',
  },
  testingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF6B35',
    marginRight: 8,
  },
  testingText: {
    color: '#FF6B35',
    fontSize: 12,
    fontWeight: '600',
  },
});

export default SpeedGauge;