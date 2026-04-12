import React, { useState, useContext } from 'react';
import { View, Text, Alert } from 'react-native';
import Input from '../../components/Inputs';
import Button from '../../components/Buttons';
import styles from './styles';
import { login } from '../../services/api';
import { AuthContext } from '../../context/AuthContext';
import * as Keychain from 'react-native-keychain';
import { jwtDecode } from 'jwt-decode';

export default function LoginScreen({ navigation }) {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const { setAuthData } = useContext(AuthContext);

  const handleLogin = async () => {
    try {
      const userData = await login(identifier, password);

      await Keychain.setGenericPassword(
        JSON.stringify({
          username: userData.username,
          userId: userData.id,
        }),
        userData.token,
        {
          accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_ANY,
        }
      );

      setAuthData({
        token: userData.token,
        username: userData.username,
        userId: userData.id,
      });

      Alert.alert('Login successful!');
      navigation.navigate('Home');
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Login failed', error.message);
    }
  };

  const tryBiometricLogin = async () => {
    try {
      const credentials = await Keychain.getGenericPassword({
        authenticationPrompt: {
          title: 'Login with Face ID / Fingerprint',
        },
      });

      if (credentials) {
        const storedUser = JSON.parse(credentials.username);
        const token = credentials.password;

      if (!isTokenValid(token)) {
        Alert.alert("Session expired, please log in again");
        await Keychain.resetGenericPassword();
        return;
      }

        setAuthData({
          token,
          username: storedUser.username,
          userId: storedUser.userId,
        });

        Alert.alert('Biometric login successful!');
        navigation.navigate('Home');
      } else {
        Alert.alert('No biometric credentials stored yet');
      }
    } catch (err) {
      console.error('Biometric login failed:', err);
      Alert.alert('Biometric login failed');
    }
  };

  const isTokenValid = (token) => {
    try {
      const decoded = jwtDecode(token);
      if (!decoded.exp) return false;
      const now = Date.now/1000;
      return decoded.exp > now;
    } catch (e) {
      return false;
    }
  } 

  const isDisabled = !identifier || !password;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Input
        placeholder="Email or Username"
        value={identifier}
        onChangeText={setIdentifier}
      />
      <Input
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} disabled={isDisabled} />
      <Button
        title="Go to Register"
        onPress={() => navigation.navigate('Register')}
      />
      <Button
        title="Login with Face ID / Fingerprint"
        onPress={tryBiometricLogin}
      />
    </View>
  );
}
