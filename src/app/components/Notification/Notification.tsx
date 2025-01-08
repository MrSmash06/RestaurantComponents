import { View, Text, StyleSheet, Dimensions } from "react-native";
import React from "react";
import BackButton from "../Universal/BackButton";
import NotificationBar from "./NotificationBar";
import NavigationBar from "../Universal/NavigationBar";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const Notification = () => {
  return (
    <View style={{ height: "100%", width: "100%" }}>
      <View style={styles.notificationTopBar}>
        <BackButton url={"components/Profile/Profile"} />
        <Text style={styles.notificationHeading}>Notifications</Text>
      </View>
      <View style={styles.notificationList}>
        <NotificationBar />
      </View>
      <View>
        <NavigationBar style={styles.navigation} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  notificationTopBar: {
    alignContent: "center",
    flexDirection: "row",
    // justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#F2F2F2",
    height: screenHeight * 0.06,
  },
  notificationHeading: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#000",
    marginLeft: 10,
  },
  notificationList: {
    // padding: 10,
    backgroundColor: "#F8F8F8",
    height: screenHeight * 0.87,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    // marginBottom: 10,
  },
  navigation: {
    // zIndex: -1,
    bottom: 0,
    position: "absolute",
    height: screenHeight * 0.08,
  },
});

export default Notification;
