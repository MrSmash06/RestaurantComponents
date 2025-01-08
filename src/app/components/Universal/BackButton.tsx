import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { useRouter } from "expo-router"; // Or use `next/router` if you're using Next.js
import { Ionicons } from "@expo/vector-icons";

const BackButton = ({ url }) => {
  const router = useRouter();

  const handlePress = () => {
    if (url) {
      router.push(url);
    }
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <Ionicons
        name="arrow-back"
        size={30}
        color="#000" // Icon color
        style={styles.rightIcon}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
  },
  text: {
    color: "#000",
    fontSize: 16,
  },
});

export default BackButton;
