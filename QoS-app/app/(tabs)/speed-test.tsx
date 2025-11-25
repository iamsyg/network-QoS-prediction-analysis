import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Animated,
  Alert,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import SpeedGauge from '@/components/SpeedGauge';

// Update this with your backend URL
const API_BASE_URL = 'http://192.168.0.104:8000/api/v1';

const SpeedTestScreen = () => {
  const [isTesting, setIsTesting] = useState(false);
  const [downloadSpeed, setDownloadSpeed] = useState(0);
  const [uploadSpeed, setUploadSpeed] = useState(0);
  const [ping, setPing] = useState(0);
  const [jitter, setJitter] = useState(0);
  const [progress] = useState(new Animated.Value(0));
  const [currentTest, setCurrentTest] = useState('');

  const startTest = async () => {
    setIsTesting(true);
    setDownloadSpeed(0);
    setUploadSpeed(0);
    setPing(0);
    setJitter(0);
    setCurrentTest('Initializing...');

    // Start progress animation
    progress.setValue(0);
    Animated.timing(progress, {
      toValue: 1,
      duration: 25000, // Total test duration
      useNativeDriver: false,
    }).start();

    try {
      // Step 1: Test Latency
      setCurrentTest('Testing Latency...');
      const latencyResponse = await fetch(`${API_BASE_URL}/speed-test/latency`);
      const latencyData = await latencyResponse.json();
      
      if (latencyData.latency) {
        setPing(latencyData.latency);
        setJitter(latencyData.jitter);
      }

      // Step 2: Test Download Speed
      setCurrentTest('Testing Download Speed...');
      const downloadResponse = await fetch(`${API_BASE_URL}/speed-test/download`);
      const downloadData = await downloadResponse.json();
      
      if (downloadData.download_speed) {
        // Animate the download speed increase
        animateSpeed(downloadData.download_speed, setDownloadSpeed);
      }

      // Step 3: Test Upload Speed
      setCurrentTest('Testing Upload Speed...');
      const uploadResponse = await fetch(`${API_BASE_URL}/speed-test/upload`);
      const uploadData = await uploadResponse.json();
      
      if (uploadData.upload_speed) {
        // Animate the upload speed increase
        animateSpeed(uploadData.upload_speed, setUploadSpeed);
      }

      setCurrentTest('Test Complete!');
      setIsTesting(false);
      progress.setValue(1);

    } catch (error) {
      console.error('Speed test error:', error);
      Alert.alert(
        'Test Failed',
        'Unable to complete speed test. Please check your internet connection and backend server.',
        [{ text: 'OK' }]
      );
      setIsTesting(false);
      setCurrentTest('Test Failed');
      progress.stopAnimation();
    }
  };

  // Animate speed value gradually
  const animateSpeed = (targetSpeed: any, setter: any) => {
    let currentSpeed = 0;
    const increment = targetSpeed / 20; // 20 steps
    const interval = setInterval(() => {
      currentSpeed += increment;
      if (currentSpeed >= targetSpeed) {
        currentSpeed = targetSpeed;
        clearInterval(interval);
      }
      setter(Number(currentSpeed.toFixed(1)));
    }, 100);
  };

  const stopTest = () => {
    setIsTesting(false);
    setCurrentTest('Test Stopped');
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
    return currentTest || 'Testing...';
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a2e" />
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
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
            disabled={isTesting}
          >
            <Text style={styles.controlButtonText}>
              {isTesting ? currentTest : 'Start Speed Test'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Additional Info */}
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>Latest Test Results</Text>
          <View style={styles.networkInfo}>
            <View style={styles.networkItem}>
              <Text style={styles.networkLabel}>Latency</Text>
              <Text style={styles.networkValue}>{ping} ms</Text>
            </View>
            <View style={styles.networkItem}>
              <Text style={styles.networkLabel}>Jitter</Text>
              <Text style={styles.networkValue}>{jitter.toFixed(1)} ms</Text>
            </View>
            <View style={styles.networkItem}>
              <Text style={styles.networkLabel}>Status</Text>
              <Text style={styles.networkValue}>
                {downloadSpeed > 50 ? 'Excellent' : downloadSpeed > 20 ? 'Good' : downloadSpeed > 0 ? 'Fair' : 'N/A'}
              </Text>
            </View>
          </View>
        </View>

        {/* Add some bottom padding to ensure content is not hidden behind tab bar */}
        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 100, // Extra padding to ensure content is scrollable above tab bar
  },
  header: {
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#a0a0a0',
    marginTop: 5,
    textAlign: 'center',
  },
  gaugeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  statusText: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '500',
  },
  progressContainer: {
    paddingHorizontal: 20,
    marginVertical: 15,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#2d2d44',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FF6B35',
    borderRadius: 3,
  },
  resultsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  resultItem: {
    alignItems: 'center',
    flex: 1,
  },
  resultLabel: {
    fontSize: 12,
    color: '#a0a0a0',
    marginBottom: 5,
  },
  resultValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00A8E8',
  },
  controlContainer: {
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  controlButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  infoContainer: {
    marginHorizontal: 20,
    marginTop: 10,
    padding: 15,
    backgroundColor: '#2d2d44',
    borderRadius: 12,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
  },
  networkInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  networkItem: {
    flex: 1,
    alignItems: 'center',
  },
  networkLabel: {
    fontSize: 12,
    color: '#a0a0a0',
    marginBottom: 5,
  },
  networkValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
  },
  bottomPadding: {
    height: 80, // Additional padding to ensure content is visible above tab bar
  },
});

export default SpeedTestScreen;