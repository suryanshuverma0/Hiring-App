import React, { useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import * as SplashScreen from "expo-splash-screen";

// Keep splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function AppSplash({ onFinish }) {
  useEffect(() => {
    const prepare = async () => {
      // Simulate loading or fetching
      await new Promise(resolve => setTimeout(resolve, 10000)); // 2 seconds delay
      await SplashScreen.hideAsync();
      onFinish(); // Notify parent that loading is done
    };
    prepare();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.logoText}>कामपर्यो</Text>
      <ActivityIndicator size="large" color="#ffffff" style={{ marginTop: 20 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E3A8A", // Deep blue background
    justifyContent: "center",
    alignItems: "center",
  },
  logoText: {
    fontSize: 48,
    color: "#FFFFFF", // White text
    fontWeight: "bold",
    letterSpacing: 2,
  },
});
