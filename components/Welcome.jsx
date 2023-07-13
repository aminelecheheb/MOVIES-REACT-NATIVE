import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS, SIZES, FONT, icons } from "../constants";

const Welcome = () => {
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.helloText}>Hello there</Text>
        <Text style={styles.welcomeMessage}>Welcome to AMDb</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: SIZES.large,
    padding: SIZES.medium,
  },
  helloText: {
    fontFamily: FONT.regular,
    fontSize: SIZES.large,
    color: COLORS.secondary,
  },
  welcomeMessage: {
    fontFamily: FONT.bold,
    fontSize: SIZES.xLarge,
    color: COLORS.primary,
    marginTop: 2,
  },
});

export default Welcome;
