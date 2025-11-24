import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

const { width, height } = Dimensions.get('window');

// Mock network quality data for different locations
const networkLocations = [
  {
    id: '1',
    latitude: 19.0760,
    longitude: 72.8777,
    quality: 'Excellent',
    provider: 'Jio',
    technology: '5G',
    signalStrength: -65,
    speed: 85,
    color: '#4CAF50',
  },
  {
    id: '2',
    latitude: 19.0750,
    longitude: 72.8770,
    quality: 'Good',
    provider: 'Airtel',
    technology: '5G',
    signalStrength: -75,
    speed: 65,
    color: '#8BC34A',
  },
  {
    id: '3',
    latitude: 19.0770,
    longitude: 72.8780,
    quality: 'Fair',
    provider: 'Vi',
    technology: '4G',
    signalStrength: -85,
    speed: 25,
    color: '#FFC107',
  },
  {
    id: '4',
    latitude: 19.0765,
    longitude: 72.8765,
    quality: 'Poor',
    provider: 'Jio',
    technology: '4G',
    signalStrength: -95,
    speed: 8,
    color: '#F44336',
  },
];

export default function NetworkMapScreen() {
  const [selectedLocation, setSelectedLocation] = useState(networkLocations[0]);

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

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Network Quality Map</Text>
        <Text style={styles.subtitle}>Real-time QoS heatmap</Text>
      </View>

      {/* Map */}
      <View style={styles.mapContainer}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude: 19.0760,
            longitude: 72.8777,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          }}
        >
          {networkLocations.map((location) => (
            <Marker
              key={location.id}
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              onPress={() => setSelectedLocation(location)}
            >
              <View style={[styles.marker, { backgroundColor: location.color }]} />
            </Marker>
          ))}
        </MapView>
      </View>

      {/* Selected Location Info */}
      <View style={styles.infoPanel}>
        <Text style={styles.infoTitle}>Selected Location</Text>
        <View style={styles.infoGrid}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Provider</Text>
            <Text style={styles.infoValue}>{selectedLocation.provider}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Technology</Text>
            <Text style={styles.infoValue}>{selectedLocation.technology}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Quality</Text>
            <View style={styles.qualityContainer}>
              <View 
                style={[
                  styles.qualityDot, 
                  { backgroundColor: getQualityColor(selectedLocation.quality) }
                ]} 
              />
              <Text style={styles.infoValue}>{selectedLocation.quality}</Text>
            </View>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Signal</Text>
            <Text style={styles.infoValue}>{selectedLocation.signalStrength} dBm</Text>
          </View>
        </View>
      </View>

      {/* Legend */}
      <View style={styles.legend}>
        <Text style={styles.legendTitle}>Quality Legend</Text>
        <View style={styles.legendItems}>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: '#4CAF50' }]} />
            <Text style={styles.legendText}>Excellent</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: '#8BC34A' }]} />
            <Text style={styles.legendText}>Good</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: '#FFC107' }]} />
            <Text style={styles.legendText}>Fair</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: '#F44336' }]} />
            <Text style={styles.legendText}>Poor</Text>
          </View>
        </View>
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
    paddingBottom: 10,
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
  mapContainer: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  marker: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  infoPanel: {
    backgroundColor: '#16213e',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 15,
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  infoItem: {
    width: '48%',
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 14,
    color: '#8f9bb3',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '500',
  },
  qualityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  qualityDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  legend: {
    backgroundColor: '#16213e',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#2d3748',
  },
  legendTitle: {
    fontSize: 14,
    color: '#8f9bb3',
    marginBottom: 10,
  },
  legendItems: {
    flexDirection: 'row',
    justifyContent: 'space-around',
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
    fontSize: 12,
    color: '#ffffff',
  },
});