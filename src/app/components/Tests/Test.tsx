import { View, Text, StyleSheet, Dimensions } from "react-native";
import React from "react";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const Test = () => {
  return (
    <View>
      <View style={styles.container1}>
        <Text>Hi</Text>
      </View>
      <View style={styles.container2}></View>
      <View style={styles.container3}></View>
      <View></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container1: {
    //   flex: 1,
    backgroundColor: "#111",
    alignItems: "center",
    justifyContent: "center",
    width: screenWidth,
    height: screenHeight * 0.25,
  },
  container2: {
    backgroundColor: "#f0f0f0",
    // width: "100%",
    // height: "100%",
    // marginHorizontal: "25%",
    // marginBottom: 20,
    width: screenWidth,
    height: screenHeight * 0.25,
  },
  container3: {
    //   flex: 1,
    backgroundColor: "#111",
    alignItems: "center",
    justifyContent: "center",
    width: screenWidth,
    height: screenHeight * 0.25,
  },
});

export default Test;
