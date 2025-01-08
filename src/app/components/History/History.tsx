import { View, Text, StyleSheet, Dimensions } from "react-native";
import React from "react";
import BackButton from "../Universal/BackButton";
import HistoryCard from "./HistoryCard";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const History = () => {
  return (
    <View>
      <View style={styles.historyTopBar}>
        <BackButton url={"components/Profile/Profile"} />
        <Text style={styles.historyHeading}>History</Text>
      </View>
      <View>
        <HistoryCard />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  historyTopBar: {
    alignContent: "center",
    flexDirection: "row",
    // justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#F2F2F2",
    height: screenHeight * 0.06,
  },
  historyHeading: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#000",
    marginLeft: 10,
  },
});

export default History;
