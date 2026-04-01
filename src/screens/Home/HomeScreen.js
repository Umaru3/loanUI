import React from "react";
import { View, Text } from "react-native";
import styles from "./styles";
import Button from "../../components/Buttons";

export default function HomeScreen({ navigation }) {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Welcome to the Home Screen!
      </Text>
      <Button title="Logout" onPress={() => navigation.navigate("Login")} />
    </View>
  );
}
