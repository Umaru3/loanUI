import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  validationText: {
    fontSize: 12,
    marginBottom: 8,
  },
  invalid: {
    color: 'red',
  },
  valid: {
    color: 'green',
  },
});
