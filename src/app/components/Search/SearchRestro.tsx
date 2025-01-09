import { View, Text, StyleSheet, TextInput, Dimensions } from "react-native";
import React from "react";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
import { MaterialIcons } from "@expo/vector-icons";
const SearchRestro = () => {
  return (
    <View style={styles.container}>
      <View style={styles.barContainer}>
        <View style={styles.searchBorder}>
          <TextInput
            style={styles.input}
            placeholder="Lakh Ahiya ..."></TextInput>
          <MaterialIcons name="search" size={27} style={styles.searchicon} />
        </View>
        <View style={styles.filterBorder}>
          <Text style={styles.filtter}>Filtter</Text>
          <MaterialIcons name="camera" size={27} style={styles.filttericon} />
        </View>
      </View>
      <View style={styles.suggestions}>
        <Text>Hi</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    // flexDirection: "row",
    height: screenHeight * 93,
    width: screenWidth,
    // paddingHorizontal: 15,
    // paddingVertical: 10,
    borderRadius: 5,
    top: 0,
    position: "absolute",
    gap: 8,
  },
  input: {
    // backgroundColor: "#111",
    left: "4%",
    width: "85%",
    height: "100%",
    // marginLeft: screenWidth * 0.05,
    // marginRight: screenWidth * 0.1,
    // marginBottom: 10,
    borderRadius: 5,
    // borderColor: "#ccc",
    // borderWidth: 1,
    fontSize: 16,
    color: "black",
    // textAlign: "center",
    // top: 10,
    position: "absolute",
  },
  searchBorder: {
    height: screenHeight * 0.05,
    width: screenWidth * 0.6,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    // marginBottom: 10,
    // padding: 10,
    // paddingHorizontal: 20,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    justifyContent: "center",
    // alignItems: "center",
    alignContent: "center",
  },
  searchicon: {
    position: "absolute",
    // right: 5,
    // top: 5,
    // alignContent: "center",
    // justifyContent: "center",
    left: "86%",
    color: "red",
  },
  filterBorder: {
    height: screenHeight * 0.05,
    width: screenWidth * 0.3,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    // marginBottom: 10,
    // padding: 10,
    // paddingHorizontal: 20,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    justifyContent: "center",
    // alignItems: "center",
    alignContent: "center",
  },
  filttericon: {
    position: "absolute",
    // right: 5,
    // top: 5,
    // alignContent: "center",
    // justifyContent: "center",
    left: "70%",
    color: "red",
  },
  filtter: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    position: "absolute",
    left: "10%",
    alignContent: "center",
    justifyContent: "center",
  },
  barContainer: {
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 14,
    justifyContent: "space-between",
  },
  suggestions: {
    backgroundColor: "red",
    height: "83%",
    width: screenWidth,
    // paddingHorizontal: 15,
    // paddingVertical: 10,
    borderRadius: 5,
  },
});

export default SearchRestro;
