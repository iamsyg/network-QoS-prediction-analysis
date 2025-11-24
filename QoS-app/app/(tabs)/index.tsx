// // App.tsx
// import React, { useState } from 'react';
// import {
//   StyleSheet,
//   View,
//   ScrollView,
//   StatusBar,
//   SafeAreaView,
// } from 'react-native';
// import { ThemeProvider, useTheme } from '../../context/ThemeContext';
// import Header from '../../components/Header';
// import NetworkStatusCard from '../../components/NetworkStatusCard';
// import QoSMetrics from '../../components/QoSMetrics';
// import PredictionChart from '../../components/PredictionChart';
// import ServiceLevels from '../../components/ServiceLevels';
// import QuickActions from '../../components/QuickActions';

// const MainApp = () => {
//   const { colors, isDark } = useTheme();
//   const [selectedTab, setSelectedTab] = useState<'overview' | 'prediction' | 'settings'>('overview');

//   const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       backgroundColor: colors.background,
//     },
//     content: {
//       flex: 1,
//       padding: 16,
//     },
//   });

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
//       <Header 
//         selectedTab={selectedTab}
//         onTabChange={setSelectedTab}
//       />
//       <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
//         <NetworkStatusCard />
//         <QoSMetrics />
//         <PredictionChart />
//         <ServiceLevels />
//         <QuickActions />
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default function App() {
//   return (
//     <ThemeProvider>
//       <MainApp />
//     </ThemeProvider>
//   );
// }




// import React from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   StatusBar,
// } from 'react-native';
// import { useNavigation } from '@react-navigation/native';

// // Mock data for network providers
// const networkProviders = [
//   {
//     id: '1',
//     name: 'Jio',
//     technology: '5G',
//     signalQuality: 'Excellent',
//     strength: 95,
//     color: '#FF6B35',
//   },
//   {
//     id: '2',
//     name: 'Airtel',
//     technology: '5G',
//     signalQuality: 'Good',
//     strength: 85,
//     color: '#00A8E8',
//   },
//   {
//     id: '3',
//     name: 'Vi',
//     technology: '4G',
//     signalQuality: 'Fair',
//     strength: 65,
//     color: '#8A2BE2',
//   },
//   {
//     id: '4',
//     name: 'WiFi',
//     technology: 'WiFi 6',
//     signalQuality: 'Excellent',
//     strength: 90,
//     color: '#FFD166',
//   },
// ];

// const HomeDashboard = () => {
//   const navigation = useNavigation();

//   const getSignalColor = (quality: string) => {
//     switch (quality) {
//       case 'Excellent':
//         return '#4CAF50';
//       case 'Good':
//         return '#8BC34A';
//       case 'Fair':
//         return '#FFC107';
//       case 'Poor':
//         return '#F44336';
//       default:
//         return '#9E9E9E';
//     }
//   };

//   const NetworkCard = ({ provider }: { provider: typeof networkProviders[0] }) => (
//     <View style={styles.networkCard}>
//       <View style={styles.cardHeader}>
//         <Text style={styles.providerName}>{provider.name}</Text>
//         <View style={[styles.signalIndicator, { backgroundColor: getSignalColor(provider.signalQuality) }]} />
//       </View>
//       <Text style={styles.technology}>{provider.technology}</Text>
//       <View style={styles.signalContainer}>
//         <Text style={styles.signalQuality}>{provider.signalQuality}</Text>
//         <View style={styles.strengthBar}>
//           <View 
//             style={[
//               styles.strengthFill, 
//               { 
//                 width: `${provider.strength}%`,
//                 backgroundColor: getSignalColor(provider.signalQuality)
//               }
//             ]} 
//           />
//         </View>
//       </View>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <StatusBar barStyle="light-content" backgroundColor="#1a1a2e" />
      
//       {/* Header */}
//       <View style={styles.header}>
//         <Text style={styles.title}>Network QoS Monitor</Text>
//         <Text style={styles.subtitle}>Real-time Network Performance</Text>
//       </View>

//       <ScrollView style={styles.content}>
//         {/* Network Provider Cards */}
//         <Text style={styles.sectionTitle}>Current Networks</Text>
//         {networkProviders.map((provider) => (
//           <NetworkCard key={provider.id} provider={provider} />
//         ))}

//         {/* Action Buttons */}
//         <View style={styles.actionsContainer}>
//           <TouchableOpacity 
//             style={styles.actionButton}
//             onPress={() => navigation.navigate('QoSMetrics' as never)}
//           >
//             <Text style={styles.actionButtonText}>View Detailed QoS Metrics</Text>
//           </TouchableOpacity>
          
//           <TouchableOpacity 
//             style={[styles.actionButton, styles.mapButton]}
//             onPress={() => navigation.navigate('NetworkMap' as never)}
//           >
//             <Text style={styles.actionButtonText}>Open Map & Predictions</Text>
//           </TouchableOpacity>
//         </View>

//         {/* Quick Stats */}
//         <View style={styles.quickStats}>
//           <Text style={styles.sectionTitle}>Quick Stats</Text>
//           <View style={styles.statsGrid}>
//             <View style={styles.statItem}>
//               <Text style={styles.statValue}>42 ms</Text>
//               <Text style={styles.statLabel}>Avg Latency</Text>
//             </View>
//             <View style={styles.statItem}>
//               <Text style={styles.statValue}>85 Mbps</Text>
//               <Text style={styles.statLabel}>Download</Text>
//             </View>
//             <View style={styles.statItem}>
//               <Text style={styles.statValue}>92%</Text>
//               <Text style={styles.statLabel}>Stability</Text>
//             </View>
//           </View>
//         </View>
//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#1a1a2e',
//   },
//   header: {
//     paddingTop: 60,
//     paddingHorizontal: 20,
//     paddingBottom: 20,
//     backgroundColor: '#16213e',
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: '#ffffff',
//     marginBottom: 5,
//   },
//   subtitle: {
//     fontSize: 16,
//     color: '#8f9bb3',
//   },
//   content: {
//     flex: 1,
//     padding: 20,
//   },
//   sectionTitle: {
//     fontSize: 20,
//     fontWeight: '600',
//     color: '#ffffff',
//     marginBottom: 15,
//     marginTop: 10,
//   },
//   networkCard: {
//     backgroundColor: '#16213e',
//     borderRadius: 12,
//     padding: 16,
//     marginBottom: 12,
//     borderLeftWidth: 4,
//     borderLeftColor: '#00A8E8',
//   },
//   cardHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 8,
//   },
//   providerName: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#ffffff',
//   },
//   signalIndicator: {
//     width: 12,
//     height: 12,
//     borderRadius: 6,
//   },
//   technology: {
//     fontSize: 14,
//     color: '#8f9bb3',
//     marginBottom: 8,
//   },
//   signalContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   signalQuality: {
//     fontSize: 14,
//     color: '#8f9bb3',
//     fontWeight: '500',
//   },
//   strengthBar: {
//     flex: 1,
//     height: 6,
//     backgroundColor: '#2d3748',
//     borderRadius: 3,
//     marginLeft: 10,
//     overflow: 'hidden',
//   },
//   strengthFill: {
//     height: '100%',
//     borderRadius: 3,
//   },
//   actionsContainer: {
//     marginTop: 20,
//     marginBottom: 10,
//   },
//   actionButton: {
//     backgroundColor: '#00A8E8',
//     padding: 16,
//     borderRadius: 12,
//     alignItems: 'center',
//     marginBottom: 12,
//   },
//   mapButton: {
//     backgroundColor: '#8A2BE2',
//   },
//   actionButtonText: {
//     color: '#ffffff',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   quickStats: {
//     marginTop: 10,
//   },
//   statsGrid: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   statItem: {
//     backgroundColor: '#16213e',
//     padding: 16,
//     borderRadius: 12,
//     alignItems: 'center',
//     flex: 1,
//     marginHorizontal: 5,
//   },
//   statValue: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#ffffff',
//     marginBottom: 4,
//   },
//   statLabel: {
//     fontSize: 12,
//     color: '#8f9bb3',
//   },
// });

// export default HomeDashboard;



// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createStackNavigator } from '@react-navigation/stack';
// import { Ionicons } from '@expo/vector-icons';

// // Import all screens
// // import HomeDashboard from './screens/HomeDashboard';
// import HomeDashboard from '@/screens/HomeDashboard';
// // import QoSMetricsScreen from './screens/QoSMetricsScreen';
// import QoSMetricsScreen from '@/screens/QoSMetricsScreen';
// // import PredictionScreen from './screens/PredictionScreen';
// import PredictionScreen from '@/screens/PredictionScreen';
// // import NetworkMapScreen from './screens/NetworkMapScreen';
// import NetworkMapScreen from '@/screens/NetworkMapScreen';
// // import SpeedTestScreen from './screens/SpeedTestScreen';
// import SpeedTestScreen from '@/screens/SpeedTestScreen';
// // import ProviderComparisonScreen from './screens/ProviderComparisonScreen';
// import ProviderComparisonScreen from '@/screens/ProviderComparisonScreen';
// // import SettingsScreen from './screens/SettingsScreen';
// import SettingsScreen from '@/screens/SettingsScreen';

// const Tab = createBottomTabNavigator();
// const Stack = createStackNavigator();

// // Home Stack Navigator
// const HomeStack = () => (
//   <Stack.Navigator screenOptions={{ headerShown: false }}>
//     <Stack.Screen name="HomeDashboard" component={HomeDashboard} />
//     <Stack.Screen name="QoSMetrics" component={QoSMetricsScreen} />
//     <Stack.Screen name="NetworkMap" component={NetworkMapScreen} />
//   </Stack.Navigator>
// );

// // Main Tab Navigator
// const AppTabs = () => (
//   <Tab.Navigator
//     screenOptions={({ route }) => ({
//       tabBarIcon: ({ focused, color, size }) => {
//         let iconName: keyof typeof Ionicons.glyphMap;

//         if (route.name === 'Home') {
//           iconName = focused ? 'home' : 'home-outline';
//         } else if (route.name === 'Map') {
//           iconName = focused ? 'map' : 'map-outline';
//         } else if (route.name === 'Speed Test') {
//           iconName = focused ? 'speedometer' : 'speedometer-outline';
//         } else if (route.name === 'Compare') {
//           iconName = focused ? 'stats-chart' : 'stats-chart-outline';
//         } else if (route.name === 'Settings') {
//           iconName = focused ? 'settings' : 'settings-outline';
//         } else {
//           iconName = 'help-outline';
//         }

//         return <Ionicons name={iconName} size={size} color={color} />;
//       },
//       tabBarActiveTintColor: '#00A8E8',
//       tabBarInactiveTintColor: '#8f9bb3',
//       tabBarStyle: {
//         backgroundColor: '#16213e',
//         borderTopColor: '#2d3748',
//       },
//       headerStyle: {
//         backgroundColor: '#16213e',
//       },
//       headerTintColor: '#ffffff',
//       headerTitleStyle: {
//         fontWeight: 'bold',
//       },
//     })}
//   >
//     <Tab.Screen 
//       name="Home" 
//       component={HomeStack}
//       options={{ headerShown: false }}
//     />
//     <Tab.Screen 
//       name="Map" 
//       component={NetworkMapScreen}
//       options={{ title: 'Network Map' }}
//     />
//     <Tab.Screen 
//       name="Speed Test" 
//       component={SpeedTestScreen}
//     />
//     <Tab.Screen 
//       name="Compare" 
//       component={ProviderComparisonScreen}
//       options={{ title: 'Provider Compare' }}
//     />
//     <Tab.Screen 
//       name="Settings" 
//       component={SettingsScreen}
//     />
//   </Tab.Navigator>
// );

// const App = () => {
//   return (
//     <NavigationContainer>
//       <AppTabs />
//     </NavigationContainer>
//   );
// };

// export default App;





import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';

// Mock data for network providers
const networkProviders = [
  {
    id: '1',
    name: 'Jio',
    technology: '5G',
    signalQuality: 'Excellent',
    strength: 95,
    color: '#FF6B35',
  },
  {
    id: '2',
    name: 'Airtel',
    technology: '5G',
    signalQuality: 'Good',
    strength: 85,
    color: '#00A8E8',
  },
  {
    id: '3',
    name: 'Vi',
    technology: '4G',
    signalQuality: 'Fair',
    strength: 65,
    color: '#8A2BE2',
  },
  {
    id: '4',
    name: 'WiFi',
    technology: 'WiFi 6',
    signalQuality: 'Excellent',
    strength: 90,
    color: '#FFD166',
  },
];

export default function HomeDashboard() {
  const router = useRouter();

  const getSignalColor = (quality: string) => {
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

  const NetworkCard = ({ provider }: { provider: typeof networkProviders[0] }) => (
    <View style={styles.networkCard}>
      <View style={styles.cardHeader}>
        <Text style={styles.providerName}>{provider.name}</Text>
        <View style={[styles.signalIndicator, { backgroundColor: getSignalColor(provider.signalQuality) }]} />
      </View>
      <Text style={styles.technology}>{provider.technology}</Text>
      <View style={styles.signalContainer}>
        <Text style={styles.signalQuality}>{provider.signalQuality}</Text>
        <View style={styles.strengthBar}>
          <View 
            style={[
              styles.strengthFill, 
              { 
                width: `${provider.strength}%`,
                backgroundColor: getSignalColor(provider.signalQuality)
              }
            ]} 
          />
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Network QoS Monitor</Text>
        <Text style={styles.subtitle}>Real-time Network Performance</Text>
      </View>

      <ScrollView style={styles.content}>
        {/* Network Provider Cards */}
        <Text style={styles.sectionTitle}>Current Networks</Text>
        {networkProviders.map((provider) => (
          <NetworkCard key={provider.id} provider={provider} />
        ))}

        {/* Action Buttons */}
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => router.push('/qos-metrics')}
        >
          <Text style={styles.actionButtonText}>View Detailed QoS Metrics</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.actionButton, styles.mapButton]}
          onPress={() => router.push('/predictions')}
        >
          <Text style={styles.actionButtonText}>View Predictions</Text>
        </TouchableOpacity>

        {/* Quick Stats */}
        <View style={styles.quickStats}>
          <Text style={styles.sectionTitle}>Quick Stats</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>42 ms</Text>
              <Text style={styles.statLabel}>Avg Latency</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>85 Mbps</Text>
              <Text style={styles.statLabel}>Download</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>92%</Text>
              <Text style={styles.statLabel}>Stability</Text>
            </View>
          </View>
        </View>
      </ScrollView>
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
  content: {
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 15,
    marginTop: 10,
  },
  networkCard: {
    backgroundColor: '#16213e',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#00A8E8',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  providerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  signalIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  technology: {
    fontSize: 14,
    color: '#8f9bb3',
    marginBottom: 8,
  },
  signalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  signalQuality: {
    fontSize: 14,
    color: '#8f9bb3',
    fontWeight: '500',
  },
  strengthBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#2d3748',
    borderRadius: 3,
    marginLeft: 10,
    overflow: 'hidden',
  },
  strengthFill: {
    height: '100%',
    borderRadius: 3,
  },
  actionsContainer: {
    marginTop: 20,
    marginBottom: 10,
  },
  actionButton: {
    backgroundColor: '#00A8E8',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  mapButton: {
    backgroundColor: '#8A2BE2',
  },
  actionButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  quickStats: {
    marginTop: 10,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    backgroundColor: '#16213e',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#8f9bb3',
  },
});