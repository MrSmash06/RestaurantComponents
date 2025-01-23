import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import React from "react";

const { height: screenHeight, width: screenWidth } = Dimensions.get("window");

const FooterButton = ({ title }: { title: string }) => (
  <TouchableOpacity style={styles.footerButton}>
    <Text style={styles.footerButtonText}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  footerButton: {
    borderWidth: 0.3,
    width: "48%",
    height: screenHeight * 0.05,
    borderRadius: 4,
    backgroundColor: "rgb(248, 68, 100)",
    alignItems: "center",
    justifyContent: "center",
  },
  footerButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default FooterButton;
