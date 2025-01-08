import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const HomeTopBar = () => {
  return (
    <View>
      <View>
        <Ionicons name="location-sharp" size={30} color="black" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create;

export default HomeTopBar;
