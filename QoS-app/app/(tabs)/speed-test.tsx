import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import SpeedGauge from '../../components/SpeedGauge';

export default function SpeedTestScreen() {
  const [isTesting, setIsTesting] = useState(false);
  const [downloadSpeed, setDownloadSpeed] = useState(0);
  const [uploadSpeed, setUploadSpeed] = useState(0);
  const [ping, setPing] = useState(0);
  const [progress] = useState(new Animated.Value(0));

  const startTest = () => {
    setIsTesting(true);
    setDownloadSpeed(0);
    setUploadSpeed(0);
    setPing(0);

    // Mock speed test simulation
    progress.setValue(0);
    Animated.timing(progress, {
      toValue: 1,
      duration: 8000,
      useNativeDriver: false,
    }).start();

    // Simulate ping test
    setTimeout(() => setPing(28), 1000);

    // Simulate download test
    let download = 0;
    const downloadInterval = setInterval(() => {
      download += Math.random() * 15;
      if (download >= 85) {
        download = 85;
        clearInterval(downloadInterval);
        
        // Simulate upload test
        let upload = 0;
        const uploadInterval = setInterval(() => {
          upload += Math.random() * 8;
          if (upload >= 42) {
            upload = 42;
            clearInterval(uploadInterval);
            setIsTesting(false);
          }
          setUploadSpeed(Number(upload.toFixed(1)));
        }, 200);
      }
      setDownloadSpeed(Number(download.toFixed(1)));
    }, 200);
  };

  const stopTest = () => {
    setIsTesting(false);
    progress.stopAnimation();
  };

  const getStatusColor = () => {
    if (!isTesting) return '#00A8E8';
    return '#FF6B35';
  };

  const getStatusText = () => {
    if (!isTesting) {
      return downloadSpeed === 0 ? 'Ready to Test' : 'Test Complete';
    }
    return 'Testing...';
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Speed Test</Text>
        <Text style={styles.subtitle}>Measure your network performance</Text>
      </View>

      {/* Speed Gauge */}
      <View style={styles.gaugeContainer}>
        <SpeedGauge
          downloadSpeed={downloadSpeed}
          uploadSpeed={uploadSpeed}
          ping={ping}
          maxSpeed={100}
          size={280}
          strokeWidth={25}
        />
      </View>

      {/* Status Indicator */}
      <View style={styles.statusContainer}>
        <View style={[styles.statusIndicator, { backgroundColor: getStatusColor() }]} />
        <Text style={styles.statusText}>{getStatusText()}</Text>
      </View>

      {/* Progress Bar */}
      {isTesting && (
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <Animated.View
              style={[
                styles.progressFill,
                {
                  width: progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0%', '100%'],
                  }),
                },
              ]}
            />
          </View>
        </View>
      )}

      {/* Test Results */}
      <View style={styles.resultsContainer}>
        <View style={styles.resultItem}>
          <Text style={styles.resultLabel}>Download</Text>
          <Text style={styles.resultValue}>{downloadSpeed} Mbps</Text>
        </View>
        <View style={styles.resultItem}>
          <Text style={styles.resultLabel}>Upload</Text>
          <Text style={styles.resultValue}>{uploadSpeed} Mbps</Text>
        </View>
        <View style={styles.resultItem}>
          <Text style={styles.resultLabel}>Ping</Text>
          <Text style={styles.resultValue}>{ping} ms</Text>
        </View>
      </View>

      {/* Control Button */}
      <View style={styles.controlContainer}>
        <TouchableOpacity
          style={[
            styles.controlButton,
            { backgroundColor: isTesting ? '#FF6B35' : '#00A8E8' },
          ]}
          onPress={isTesting ? stopTest : startTest}
        >
          <Text style={styles.controlButtonText}>
            {isTesting ? 'Stop Test' : 'Start Speed Test'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#16213e',
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
  gaugeContainer: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  statusIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  statusText: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '500',
  },
  progressContainer: {
    paddingHorizontal: 40,
    marginBottom: 30,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#2d3748',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#00A8E8',
    borderRadius: 3,
  },
  resultsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  resultItem: {
    alignItems: 'center',
  },
  resultLabel: {
    fontSize: 14,
    color: '#8f9bb3',
    marginBottom: 5,
  },
  resultValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  controlContainer: {
    paddingHorizontal: 40,
    marginBottom: 30,
  },
  controlButton: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  controlButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
});