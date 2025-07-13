import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useRole } from "../context/RoleContext";
import { useLanguage } from "../context/LanguageContext"; // import language context
import i18n from "../localization/i18n"; // import translations
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RoleSelectionScreen({ navigation }) {
  const { setUserRole } = useRole();
  const { language } = useLanguage(); // get current language
  const [selectedRole, setSelectedRole] = useState(null);

  const handleContinue = async () => {
    if (!selectedRole) {
      Alert.alert(i18n.t("please_select_role")); // localized alert
      return;
    }

    try {
      // Save role to context
      setUserRole(selectedRole);

      // Save locally for persistence
      await AsyncStorage.setItem("userRole", selectedRole);

      // Navigate to next screen (NamePhoneScreen)
      navigation.reset({
        index: 0,
        routes: [{ name: "NamePhone" }], // replace with your next screen
      });
    } catch (error) {
      console.error("Error saving role:", error);
      Alert.alert(i18n.t("error"), i18n.t("something_went_wrong"));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{i18n.t("who_are_you")}</Text>
      <Text style={styles.subtitle}>{i18n.t("choose_role")}</Text>

      <View style={styles.roleContainer}>
        {/* Service Provider */}
        <TouchableOpacity
          style={[
            styles.roleCard,
            selectedRole === "provider" && styles.selectedCard,
          ]}
          onPress={() => setSelectedRole("provider")}
        >
          <Text style={styles.roleIcon}>🛠</Text>
          <Text style={styles.roleTitle}>{i18n.t("service_provider")}</Text>
          <Text style={styles.roleDesc}>{i18n.t("service_provider_desc")}</Text>
        </TouchableOpacity>

        {/* Consumer */}
        <TouchableOpacity
          style={[
            styles.roleCard,
            selectedRole === "consumer" && styles.selectedCard,
          ]}
          onPress={() => setSelectedRole("consumer")}
        >
          <Text style={styles.roleIcon}>🙋‍♂️</Text>
          <Text style={styles.roleTitle}>{i18n.t("consumer")}</Text>
          <Text style={styles.roleDesc}>{i18n.t("consumer_desc")}</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[
          styles.continueButton,
          !selectedRole && styles.disabledButton,
        ]}
        onPress={handleContinue}
        disabled={!selectedRole}
      >
        <Text style={styles.buttonText}>{i18n.t("continue")}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    paddingHorizontal: 24,
    justifyContent: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#1F2937",
    textAlign: "center",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 30,
  },
  roleContainer: {
    marginBottom: 40,
  },
  roleCard: {
    backgroundColor: "#F3F4F6",
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderRadius: 12,
    marginVertical: 8,
    borderWidth: 2,
    borderColor: "#E5E7EB",
    alignItems: "center",
  },
  selectedCard: {
    borderColor: "#2563EB",
    backgroundColor: "#DBEAFE",
  },
  roleIcon: {
    fontSize: 40,
    marginBottom: 10,
  },
  roleTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1F2937",
  },
  roleDesc: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    marginTop: 4,
  },
  continueButton: {
    backgroundColor: "#2563EB",
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
    position: "absolute",
    bottom: 40,
    left: 24,
    right: 24,
  },
  disabledButton: {
    backgroundColor: "#9CA3AF",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
