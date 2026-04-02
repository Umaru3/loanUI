import React, { useState, useContext } from 'react';
import { View, Text, Alert } from 'react-native';
import Input from '../../components/Inputs';
import Button from '../../components/Buttons';
import styles from './styles';
import { login } from '../../services/api';
import { AuthContext } from '../../context/AuthContext';

export default function LoginScreen({ navigation }) {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState(null);
  const { setAuthData } = useContext(AuthContext);
  const handleLogin = async () => {
    try{
      console.log('Logging in with:', identifier, password);
      const userData = await login(identifier, password);

      setToken(userData.token);
      setAuthData({
        token: userData.token,
        username: userData.username,
        userId: userData.id
      });
      console.log('Login successful:', userData);
      Alert.alert('Login successful!');
      
      navigation.navigate('Home');
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
