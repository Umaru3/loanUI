import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function Button({ title, onPress, disabled, type = "primary" , size = "medium" }) {
  return (
    <TouchableOpacity
      style={[
        styles.button, 
        styles[type],
        styles[size],
        disabled && styles.buttonDisabled
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 12,
    borderRadius: 5,
    marginVertical: 8,
  },
  primary: {
    backgroundColor: '#007bff',
  },
  small: { 
    paddingVertical: 6, 
    paddingHorizontal: 12 
  },
  medium: { 
    paddingVertical: 10, 
    paddingHorizontal: 16 
  },
  logout: { 
    paddingVertical: 6, 
    paddingHorizontal: 12,
    width: "20%",
    alignSelf: "flex-end", 
    marginTop: 20,
  },
  buttonDisabled: {
    backgroundColor: '#aaa',
  },
  text: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
