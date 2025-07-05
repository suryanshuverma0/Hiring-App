import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator, View } from "react-native";

import { LanguageProvider } from "./src/context/LanguageContext";
import LanguageScreen from "./src/screens/LanguageScreen";
import GetStartedScreen from "./src/screens/GetStartedScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  // const [isLoading, setIsLoading] = useState(true); // To handle loading state
  // const [initialRoute, setInitialRoute] = useState("Language"); // Default to Language

  // useEffect(() => {
  //   const checkLanguage = async () => {
  //     try {
  //       const savedLang = await AsyncStorage.getItem("userLanguage");
  //       if (savedLang) {
  //         setInitialRoute("GetStarted"); // If language is already selected
  //       } else {
  //         setInitialRoute("Language"); // Ask user to select language first
  //       }
  //     } catch (error) {
  //       console.error("Error reading userLanguage:", error);
  //       setInitialRoute("Language"); // Default to Language on error
  //     } finally {
  //       setIsLoading(false); // Stop loading
  //     }
  //   };

  //   checkLanguage();
  // }, []);

  // if (isLoading) {
  //   // While checking AsyncStorage, show a loading spinner
  //   return (
  //     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
  //       <ActivityIndicator size="large" color="#2563EB" />
  //     </View>
  //   );
  // }

  return (
    <LanguageProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={"Language"} // initialRouteName={initialRoute}
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Language" component={LanguageScreen} />
          <Stack.Screen name="GetStarted" component={GetStartedScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </LanguageProvider>
  );
}
