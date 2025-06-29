import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GetStartedScreen from "./src/screens/GetStartedScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (

          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="GetStarted"
              screenOptions={{ headerShown: false }}
            >
              <Stack.Screen name="GetStarted" component={GetStartedScreen} />
            </Stack.Navigator>
          </NavigationContainer>
  );
}
