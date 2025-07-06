import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
  Platform,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { useLanguage } from "../context/LanguageContext";
import i18n from '../localization/i18n';


export default function LanguageScreen({ navigation }) {
  const { language, changeLanguage } = useLanguage();
  const [selectedLanguage, setSelectedLanguage] = useState(language || "");

  useEffect(() => {
    setSelectedLanguage(language || "");
  }, [language]);

  const handleContinue = async () => {
    if (selectedLanguage) {
      await changeLanguage(selectedLanguage);
      navigation.navigate("GetStarted");
    } else {
      Alert.alert("Validation", "Please select a language");
    }
  };
  

//   const handleContinue = async () => {
//   if (selectedLanguage) {
//     await changeLanguage(selectedLanguage);
//     // Navigate to GetStartedScreen and replace current stack
//     navigation.reset({
//       index: 0,
//       routes: [{ name: "GetStarted" }],
//     });
//   } else {
//     Alert.alert("Validation", "Please select a language");
//   }
// };


  return (
    <View style={styles.container}>
      {/* Top: Image */}
      <View style={styles.top}>
        <Image
          source={require("../../assets/Language.png")}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      {/* Middle: Title + Picker */}
      <View style={styles.middle}>
        <Text style={styles.title}>{i18n.t('select_language')}</Text>
        {/* <Text style={styles.title}>Select Language</Text> */}

        <View style={styles.dropdownWrapper}>
          <RNPickerSelect
            onValueChange={setSelectedLanguage}
            placeholder={{ label: i18n.t('choose_language'), value: null }}
              // placeholder={{ label: 'Choose Language', value: null }}
            items={[
              { label: "अंग्रेजी", value: "en" },
              { label: "नेपाली", value: "np" },
            ]}
            value={selectedLanguage}
            style={pickerSelectStyles}
            useNativeAndroidPickerStyle={false}
          />
        </View>
      </View>

      {/* Bottom: Continue button */}
      <View style={styles.bottom}>
        <TouchableOpacity style={styles.button} onPress={handleContinue}>
          <Text style={styles.buttonText}>{i18n.t('get_started')}</Text>
          {/* <Text style={styles.buttonText}>Continue</Text> */}

        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    paddingHorizontal: 24,
  },
  top: {
    flex: 2,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  middle: {
    flex:2 ,
    justifyContent: "center",
    alignItems: "center",

  },
  bottom: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 40,
  },
  image: {
    width: "100%",
    height: 220,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 20,
    textAlign: "center",
  },
  dropdownWrapper: {
    width: "100%",
    backgroundColor: "#E5E7EB",
    borderRadius: 10,
    padding: Platform.OS === "ios" ? 16 : 12,
  },
  button: {
    backgroundColor: "#2563EB",
    paddingVertical: 14,
    borderRadius: 30,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    color: "#111827",
  },
  inputAndroid: {
    fontSize: 16,
    color: "#111827",
  },
});
