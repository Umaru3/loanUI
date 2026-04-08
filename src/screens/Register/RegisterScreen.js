import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import Input from '../../components/Inputs';
import Button from '../../components/Buttons';
import styles from './styles';
import { register } from '../../services/api';

export default function RegisterScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try{
      await register(username, email, password);
      Alert.alert('Registration successful! Please log in.');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Registration error:', error);
      Alert.alert('Registration failed', error.message);
      return;
    }
  };

  const usernameValid = username.length > 0;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const emailValid = emailRegex.test(email);
  const passwordValid = password.length >= 4;

  const isDisabled = !usernameValid || !emailValid || !passwordValid;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <Input placeholder="Username" value={username} onChangeText={setUsername} />
      <Input placeholder="Email" value={email} onChangeText={setEmail} />
      <Input placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <Text style={[styles.validationText, usernameValid ? styles.valid : styles.invalid]}>
        {usernameValid ? '✓ Username looks good' : '*Username is required'}
      </Text>
      <Text style={[styles.validationText, emailValid ? styles.valid : styles.invalid]}>
        {emailValid ? '✓ Email is valid' : '*Email must be in a valid format'}
      </Text>
      <Text style={[styles.validationText, passwordValid ? styles.valid : styles.invalid]}>
        {passwordValid ? '✓ Password is strong enough' : '*Password must be at least 4 characters'}
      </Text>

      <Button title="Register" onPress={handleRegister} disabled={isDisabled} />
      <Button title="Back to Login" onPress={() => navigation.navigate('Login')} />
    </View>
  );
}
