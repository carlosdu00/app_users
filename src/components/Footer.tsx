import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Footer = () => {
  return (
    <View style={styles.footer}>
      <Text style={styles.text}>09/2024</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    backgroundColor: "#8b0000",
    padding: 10,
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    color: "white",
  },
});

export default Footer;
