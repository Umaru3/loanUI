import React, { useState } from 'react';
import { View, Text, ALert, Alert } from 'react-native';
import Input from '../../components/Inputs';
import Button from '../../components/Buttons';
import styles from './styles';
import { login } from '../../services/api';

export default function LoginScreen({ navigation }) {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState(null);

  const handleLogin = async () => {
    try{
      console.log('Logging in with:', identifier, password);
      const userData = await login(identifier, password);
      setToken(userData.token);
      console.log('Login successful:', userData);
      Alert.alert('Login successful!');
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Login failed', error.message);
      return;
    }
  };

  const isDisabled = !identifier || !password;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Input placeholder="Email or Username" value={identifier} onChangeText={setIdentifier} />
      <Input placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <Button title="Login" onPress={handleLogin} disabled={isDisabled} />
      <Button title="Go to Register" onPress={() => navigation.navigate('Register')} />
    </View>
  );
}
