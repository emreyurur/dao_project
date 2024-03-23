import React from "react";
import { View,Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack=createNativeStackNavigator();

import LoginScreen from "./src/screens/LoginScreen";
import ConnectPhantomScreen from "./src/screens/ConnectPhantomScreen";

const App=()=>{
  return(
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="LoginScreen" component={LoginScreen}/>
      <Stack.Screen name="ConnectPhantomScreen" component={ConnectPhantomScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;