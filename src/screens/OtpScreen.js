import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { auth } from "../config/firebase";
import {
  PhoneAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { useRole } from "../context/RoleContext";
import { useLanguage } from "../context/LanguageContext";

export default function OtpScreen({ route, navigation }) {
  const { phone } = route.params; // phone number passed from previous screen
  const { language } = useLanguage();
  const { userRole } = useRole();

  const recaptchaVerifier = useRef(null);
  const [verificationId, setVerificationId] = useState(null);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const sendVerificationCode = async () => {
    setLoading(true);
    try {
      const provider = new PhoneAuthProvider(auth);
      const id = await provider.verifyPhoneNumber(
        phone,
        recaptchaVerifier.current
      );
      setVerificationId(id);
      Alert.alert("OTP Sent", "Please check your SMS for the code.");
    } catch (err) {
      console.error("Error sending verification code:", err);
      Alert.alert("Error", err.message);
    }
    setLoading(false);
  };

  const confirmCode = async () => {
    if (!code || code.length < 6) {
      Alert.alert("Invalid OTP", "Please enter a valid 6-digit code.");
      return;
    }

    setLoading(true);
    try {
      const credential = PhoneAuthProvider.credential(
        verificationId,
        code
      );
      await signInWithCredential(auth, credential);
      console.log("✅ OTP Verified!");

      // Navigate to respective dashboard
      if (userRole === "consumer") {
        navigation.reset({
          index: 0,
          routes: [{ name: "ConsumerDashboard" }],
        });
      } else {
        navigation.reset({
          index: 0,
          routes: [{ name: "ProviderDashboard" }],
        });
      }
    } catch (err) {
      console.error("Error verifying code:", err);
      Alert.alert("Error", err.message);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      {/* Firebase Recaptcha */}
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={auth.app.options}
      />

      <Text style={styles.title}>OTP Verification</Text>
      <Text style={styles.subtitle}>Enter the code sent to {phone}</Text>

      <TextInput
        style={styles.input}
        value={code}
        onChangeText={setCode}
        placeholder="Enter OTP"
        keyboardType="number-pad"
        maxLength={6}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#2563EB" />
      ) : (
        <>
          <TouchableOpacity
            style={styles.button}
            onPress={sendVerificationCode}
          >
            <Text style={styles.buttonText}>Send OTP</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: code.length === 6 ? "#2563EB" : "#9CA3AF" },
            ]}
            onPress={confirmCode}
            disabled={code.length < 6}
          >
            <Text style={styles.buttonText}>Verify OTP</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#F9FAFB",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: "#6B7280",
  },
  input: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    padding: 12,
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#2563EB",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 5,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
