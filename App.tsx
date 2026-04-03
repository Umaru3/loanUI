import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/screens/Login/LoginScreen';
import RegisterScreen from './src/screens/Register/RegisterScreen';
import HomeScreen from './src/screens/Home/HomeScreen';
import LoanDetailsScreen from './src/screens/LoanDetails/LoanDetailsScreen';
import { AuthProvider } from './src/context/AuthContext';

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
  LoanDetails: { loanId: string };
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen 
            name="Login" 
            component={LoginScreen}
            options={{ headerShown: false }} />
          <Stack.Screen 
            name="Register" 
            component={RegisterScreen}
            options={{ headerShown: false }} />  
          <Stack.Screen 
            name="Home" 
            component={HomeScreen}
            options={{ headerShown: false }} />  
          <Stack.Screen 
            name="LoanDetails" 
            component={LoanDetailsScreen}
            options={{ headerShown: false }} />  
      </Stack.Navigator>
    </NavigationContainer>
  </AuthProvider>
  );
}
