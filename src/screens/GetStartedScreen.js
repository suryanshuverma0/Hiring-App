import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import i18n from "../localization/i18n";

export default function GetStartedScreen({ navigation }) {
  const handleContinue = () => {
    navigation.navigate("UserType");
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/get-started-image.png")}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.title}>{i18n.t("tagline_title")}</Text>
      <Text style={styles.subtitle}>{i18n.t("tagline_subtitle")}</Text>

      <TouchableOpacity style={styles.button} onPress={handleContinue}>
        <Text style={styles.buttonText}>{i18n.t("continue")}</Text>
        {/* <Text style={styles.buttonText}>Get STarted</Text> */}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  image: {
    width: "100%", // Adjust to the width of the screen
    height: 250, // Set the height of the image
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1F2937",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 60,
  },
  button: {
    backgroundColor: "#2563EB",
    paddingVertical: 16,
    paddingHorizontal: 60,
    borderRadius: 30,
    width: "100%",
    alignItems: "center",
    position: "absolute",
    bottom: 40,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
  },
});
