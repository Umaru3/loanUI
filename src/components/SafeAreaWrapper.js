import React from "react";
import { SafeAreaView, StatusBar, StyleSheet } from "react-native";

export default function SafeAreaWrapper({ children }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#f2f2f2" />
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f2f2f2", // your global background color
  },
});
