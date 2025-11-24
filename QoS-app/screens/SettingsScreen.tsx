import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  Switch,
  TouchableOpacity,
  Alert,
} from 'react-native';

const SettingsScreen = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [locationEnabled, setLocationEnabled] = useState(true);
  const [offlineCaching, setOfflineCaching] = useState(true);
  const [autoSpeedTest, setAutoSpeedTest] = useState(false);
  const [notifications, setNotifications] = useState(true);

  const handleClearCache = () => {
    Alert.alert(
      'Clear Cache',
      'Are you sure you want to clear all cached data?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Clear', 
          style: 'destructive',
          onPress: () => Alert.alert('Success', 'Cache cleared successfully')
        },
      ]
    );
  };

  const SettingItem = ({ 
    title, 
    description, 
    value, 
    onValueChange, 
    type = 'switch',
    onPress 
  }: {
    title: string;
    description: string;
    value?: boolean;
    onValueChange?: (value: boolean) => void;
    type?: 'switch' | 'button';
    onPress?: () => void;
  }) => (
    <View style={styles.settingItem}>
      <View style={styles.settingInfo}>
        <Text style={styles.settingTitle}>{title}</Text>
        <Text style={styles.settingDescription}>{description}</Text>
      </View>
      {type === 'switch' ? (
        <Switch
          value={value}
          onValueChange={onValueChange}
          trackColor={{ false: '#2d3748', true: '#00A8E8' }}
          thumbColor={value ? '#ffffff' : '#f4f3f4'}
        />
      ) : (
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text style={styles.buttonText}>Clear</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a2e" />
      
      <ScrollView style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Settings</Text>
          <Text style={styles.subtitle}>Customize your app experience</Text>
        </View>

        {/* Appearance Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Appearance</Text>
          <SettingItem
            title="Dark Mode"
            description="Enable dark theme for better battery life"
            value={isDarkMode}
            onValueChange={setIsDarkMode}
          />
        </View>

        {/* Permissions Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Permissions</Text>
          <SettingItem
            title="Location Access"
            description="Required for network mapping and location-based predictions"
            value={locationEnabled}
            onValueChange={setLocationEnabled}
          />
          <SettingItem
            title="Notifications"
            description="Get alerts for network issues and predictions"
            value={notifications}
            onValueChange={setNotifications}
          />
        </View>

        {/* Data Management Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data Management</Text>
          <SettingItem
            title="Offline Caching"
            description="Store network data for offline access"
            value={offlineCaching}
            onValueChange={setOfflineCaching}
          />
          <SettingItem
            title="Auto Speed Test"
            description="Automatically run speed tests in background"
            value={autoSpeedTest}
            onValueChange={setAutoSpeedTest}
          />
          <SettingItem
            title="Clear Cache"
            description="Remove all stored network data"
            type="button"
            onPress={handleClearCache}
          />
        </View>

        {/* About Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <View style={styles.aboutCard}>
            <Text style={styles.appName}>Network QoS Monitor</Text>
            <Text style={styles.version}>Version 1.0.0</Text>
            <Text style={styles.aboutDescription}>
              Advanced network quality monitoring and prediction app for Indian telecom providers.
            </Text>
          </View>
        </View>

        {/* Support Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          <TouchableOpacity style={styles.supportItem}>
            <Text style={styles.supportText}>Help & Documentation</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.supportItem}>
            <Text style={styles.supportText}>Report an Issue</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.supportItem}>
            <Text style={styles.supportText}>Privacy Policy</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.supportItem}>
            <Text style={styles.supportText}>Terms of Service</Text>
          </TouchableOpacity>
        </View>

        {/* App Info */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            © 2024 Network QoS Monitor. All rights reserved.
          </Text>
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
    marginBottom: 30,
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
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 15,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#16213e',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  settingInfo: {
    flex: 1,
    marginRight: 16,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    color: '#8f9bb3',
    lineHeight: 18,
  },
  button: {
    backgroundColor: '#FF6B35',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  aboutCard: {
    backgroundColor: '#16213e',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  appName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  version: {
    fontSize: 14,
    color: '#8f9bb3',
    marginBottom: 12,
  },
  aboutDescription: {
    fontSize: 14,
    color: '#8f9bb3',
    textAlign: 'center',
    lineHeight: 20,
  },
  supportItem: {
    backgroundColor: '#16213e',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  supportText: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '500',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  footerText: {
    fontSize: 12,
    color: '#8f9bb3',
    textAlign: 'center',
  },
});

export default SettingsScreen;