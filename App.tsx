import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/screens/Login/LoginScreen';
import RegisterScreen from './src/screens/Register/RegisterScreen';
import HomeScreen from './src/screens/Home/HomeScreen';
import LoanDetailsScreen from './src/screens/LoanDetails/LoanDetailsScreen';
import PaymentHistoryScreen from './src/screens/PaymentHistory/PaymentHistoryScreen';
import { AuthProvider } from './src/context/AuthContext';
import SafeAreaWrapper from './src/components/SafeAreaWrapper';

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
  LoanDetails: { loanId: string };
  PaymentHistory: { loanId: string };
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
  <AuthProvider>
      <SafeAreaWrapper>
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
            <Stack.Screen 
              name="PaymentHistory" 
              component={PaymentHistoryScreen}
              options={{ headerShown: false }} />  
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaWrapper>
  </AuthProvider>
  );
}
