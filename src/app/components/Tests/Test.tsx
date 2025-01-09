import { View, Text, StyleSheet, Dimensions, TextInput } from "react-native";
import React from "react";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const Test = () => {
  return (
    <View>
      <View style={styles.container1}>
        <Text style={{ color: "red" }}>Hi</Text>
      </View>
      <View style={styles.container2}>
        <TextInput
          style={styles.input}
          placeholder="Lakh Ahiya ..."></TextInput>
      </View>
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
  input: {
    backgroundColor: "#fff",
    padding: 10,
    width: screenWidth * 0.7,
    marginLeft: screenWidth * 0.05,
    marginRight: screenWidth * 0.1,
    marginBottom: 10,
    borderRadius: 5,
    borderColor: "#ccc",
    borderWidth: 1,
    fontSize: 16,
    color: "#000",
    textAlign: "center",
    // alignContent: "center",
  },
});

export default Test;
