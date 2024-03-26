import 'react-native-get-random-values';
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./src/screens/LoginScreen";
import OrganizationScreen from "./src/screens/OrganizationScreen";
import VotingDetailScreen from './src/screens/VotingDetailScreen';

// const Stack = createNativeStackNavigator();

const Stack = createNativeStackNavigator<RootStackParamList>();

type RootStackParamList = {
  LoginScreen: undefined; // This screen doesn't expect any props
  OrganizationScreen: { userPublicKey: Uint8Array }; // Example prop expected by OrganizationScreen
  // Define other screens and their expected props here
  VotingDetailScreen: undefined; // If this screen expects props, define them accordingly
};


const App: React.FC = () => {

  

  return (
    <NavigationContainer>
      <Stack.Navigator>
         <Stack.Screen name="LoginScreen" component={LoginScreen}/>
        <Stack.Screen name="OrganizationScreen" component={OrganizationScreen}/>
        {/* <Stack.Screen name="ConnectPhantomScreen" component={ConnectPhantomScreen} /> */}
        <Stack.Screen name='VotingDetailScreen' component={VotingDetailScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
