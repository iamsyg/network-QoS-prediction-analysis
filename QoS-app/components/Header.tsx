// components/Header.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';

interface HeaderProps {
  selectedTab: 'overview' | 'prediction' | 'settings';
  onTabChange: (tab: 'overview' | 'prediction' | 'settings') => void;
}

const Header: React.FC<HeaderProps> = ({ selectedTab, onTabChange }) => {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    header: {
      backgroundColor: colors.primary,
      paddingHorizontal: 16,
      paddingVertical: 12,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.textLight,
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 14,
      color: colors.textLight + '80',
      marginBottom: 16,
    },
    tabContainer: {
      flexDirection: 'row',
      backgroundColor: colors.primaryDark,
      borderRadius: 8,
      padding: 4,
    },
    tab: {
      flex: 1,
      paddingVertical: 8,
      alignItems: 'center',
      borderRadius: 6,
    },
    activeTab: {
      backgroundColor: colors.background,
    },
    tabText: {
      fontSize: 14,
      fontWeight: '500',
      color: colors.textLight,
    },
    activeTabText: {
      color: colors.primary,
    },
  });

  return (
    <View style={styles.header}>
      <Text style={styles.title}>QoS Manager</Text>
      <Text style={styles.subtitle}>Adaptive Network Quality of Service</Text>
      
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'overview' && styles.activeTab]}
          onPress={() => onTabChange('overview')}
        >
          <Text style={[styles.tabText, selectedTab === 'overview' && styles.activeTabText]}>
            Overview
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'prediction' && styles.activeTab]}
          onPress={() => onTabChange('prediction')}
        >
          <Text style={[styles.tabText, selectedTab === 'prediction' && styles.activeTabText]}>
            Prediction
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'settings' && styles.activeTab]}
          onPress={() => onTabChange('settings')}
        >
          <Text style={[styles.tabText, selectedTab === 'settings' && styles.activeTabText]}>
            Settings
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;