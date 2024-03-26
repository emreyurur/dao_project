import 'react-native-get-random-values';
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./src/screens/LoginScreen";
import ConnectPhantomScreen from "./src/screens/ConnectPhantomScreen";
import OrganizationScreen from "./src/screens/OrganizationScreen";

const Stack = createNativeStackNavigator();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="ConnectPhantomScreen" component={ConnectPhantomScreen} />
        <Stack.Screen name="OrganizationScreen" component={OrganizationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
