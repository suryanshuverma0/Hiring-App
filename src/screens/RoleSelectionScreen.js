import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Button,
  Alert,
} from "react-native";
import { useRole } from "../context/RoleContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { saveRoleToFirebase } from "../utils/firebaseUtils";

export default function RoleSelectionScreen({ navigation }) {
  const { setUserRole } = useRole();
  const [selectedRole, setSelectedRole] = useState(null);

  const handleContinue = async () => {
    if (!selectedRole) {
      Alert.alert("Please select a role");
      return;
    }

    try {
      // Save to context
      setUserRole(selectedRole);

      // Save locally for persistence
      await AsyncStorage.setItem("userRole", selectedRole);

      // Try saving to Firebase (if logged in)
      await saveRoleToFirebase(selectedRole);

      // Navigate to Login Screen
      navigation.replace("Login");
    } catch (error) {
      console.error("Error saving role:", error);
      Alert.alert("Error", "Something went wrong. Try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Who Are You?</Text>

      <View style={styles.roleContainer}>
        {/* Service Provider */}
        <TouchableOpacity
          style={[
            styles.roleCard,
            selectedRole === "provider" && styles.selectedCard,
          ]}
          onPress={() => setSelectedRole("provider")}
        >
          <Text style={styles.roleTitle}>🛠 Service Provider</Text>
          <Text style={styles.roleDesc}>Offer services to customers.</Text>
        </TouchableOpacity>

        {/* Consumer */}
        <TouchableOpacity
          style={[
            styles.roleCard,
            selectedRole === "consumer" && styles.selectedCard,
          ]}
          onPress={() => setSelectedRole("consumer")}
        >
          <Text style={styles.roleTitle}>🙋‍♂️ Consumer</Text>
          <Text style={styles.roleDesc}>Hire service providers.</Text>
        </TouchableOpacity>
      </View>

      <Button
        title="Continue"
        onPress={handleContinue}
        disabled={!selectedRole}
        color={selectedRole ? "#2563EB" : "#9CA3AF"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#1E3A8A",
  },
  roleContainer: { marginBottom: 30 },
  roleCard: {
    backgroundColor: "#F3F4F6",
    padding: 20,
    borderRadius: 10,
    marginVertical: 10,
    borderWidth: 2,
    borderColor: "#E5E7EB",
  },
  selectedCard: {
    borderColor: "#2563EB",
    backgroundColor: "#DBEAFE",
  },
  roleTitle: { fontSize: 20, fontWeight: "600" },
  roleDesc: { fontSize: 14, color: "#6B7280" },
});
