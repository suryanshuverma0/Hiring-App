import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { LanguageProvider } from "./src/context/LanguageContext";
import LanguageScreen from "./src/screens/LanguageScreen";
import GetStartedScreen from "./src/screens/GetStartedScreen";
import AppSplash from "./src/components/SplashScreen";
import { RoleProvider } from "./src/context/RoleContext";
import RoleSelectionScreen from "./src/screens/RoleSelectionScreen";
const Stack = createNativeStackNavigator();
import NamePhoneScreen from "./src/screens/NamePhoneScreen";
import { UserProvider } from "./src/context/UserContext";
import OtpScreen from "./src/screens/OtpScreen";
export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [initialRoute, setInitialRoute] = useState("Language");



  useEffect(() => {
    const checkLanguage = async () => {
      try {
        const savedLang = await AsyncStorage.getItem("userLanguage");
        if (savedLang) {
            setInitialRoute("GetStarted");
        } else {
          setInitialRoute("Language");
        }
      } catch (error) {
        console.error("Error reading userLanguage:", error);
        setInitialRoute("Language");
      } finally {
        setIsLoading(false);
      }
    };

    checkLanguage();
  }, []);

  if (isLoading) {
    return <AppSplash onFinish={() => {}} />; // Show splash while loading
  }

  return (
    <LanguageProvider>
      <UserProvider>
      <RoleProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={initialRoute}
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Language" component={LanguageScreen} />
          <Stack.Screen name="GetStarted" component={GetStartedScreen} />
          <Stack.Screen name="RoleSelection" component={RoleSelectionScreen} />
          <Stack.Screen name="NamePhone" component={NamePhoneScreen} />
          <Stack.Screen name="OTP" component={OtpScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      </RoleProvider>
      </UserProvider>
    </LanguageProvider>
  );
}
