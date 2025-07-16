import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import i18n from "../localization/i18n";
import { useUser } from "../context/UserContext";

export default function NamePhoneScreen({ navigation }) {
  const { saveUser } = useUser();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  // const handleContinue = async () => {
  //   if (!name || !phone) {
  //     Alert.alert(i18n.t("validation"), i18n.t("enter_name_phone"));
  //     return;
  //   }
  //   if (!/^\+?[0-9]{10,15}$/.test(phone)) {
  //     Alert.alert(i18n.t("validation"), i18n.t("invalid_phone"));
  //     return;
  //   }

  //   try {
  //     // Save user info
  //     await saveUser(name, phone);

  //     // Navigate to OTP screen
  //     navigation.reset({
  //       index: 0,
  //       routes: [{ name: "OTP" }], // Replace with OTP screen later
  //       params: { phone } // Pass phone number to OTP screen
  //     });
  //   } catch (error) {
  //     console.error("Error saving user info:", error);
  //     Alert.alert(i18n.t("error"), i18n.t("something_went_wrong"));
  //   }
  // };


  const handleContinue = async () => {
  if (!name || !phone) {
    Alert.alert(i18n.t("validation"), i18n.t("enter_name_phone"));
    return;
  }
  if (!/^\+?[0-9]{10,15}$/.test(phone)) {
    Alert.alert(i18n.t("validation"), i18n.t("invalid_phone"));
    return;
  }

  try {
    // Save user info
    await saveUser(name, phone);

    // Navigate to OTP screen WITH phone param
    navigation.reset({
      index: 0,
      routes: [{
        name: "OTP", // ✅ Match the name in App.js stack
        params: { phone } // ✅ Pass phone here
      }],
    });
  } catch (error) {
    console.error("Error saving user info:", error);
    Alert.alert(i18n.t("error"), i18n.t("something_went_wrong"));
  }
};

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >
      <Text style={styles.title}>{i18n.t("lets_get_started")}</Text>
      <Text style={styles.subtitle}>{i18n.t("enter_name_phone_subtitle")}</Text>

      <TextInput
        style={styles.input}
        placeholder={i18n.t("name_placeholder")}
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder={i18n.t("phone_placeholder")}
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />

      <TouchableOpacity
        style={[
          styles.continueButton,
          (!name || !phone) && styles.disabledButton,
        ]}
        onPress={handleContinue}
        disabled={!name || !phone}
      >
        <Text style={styles.buttonText}>{i18n.t("continue")}</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
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
  input: {
    backgroundColor: "#FFFFFF",
    borderColor: "#E5E7EB",
    borderWidth: 1,
    borderRadius: 8,
    padding: 14,
    marginVertical: 10,
    fontSize: 16,
    color: "#111827",
  },
  continueButton: {
    backgroundColor: "#2563EB",
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 20,
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
