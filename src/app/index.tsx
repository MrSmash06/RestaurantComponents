import { View, Text, StyleSheet } from "react-native";
import React from "react";
import HomeTopBar from "./components/Tests/HomeTopBar";
import Profile from "./components/Profile/Profile";
import Test from "./components/Tests/Test";
import ProfileButtonBar from "./components/Profile/ProfileButtonBar";
import Home from "./components/Home/Home";
import ServerImage from "./components/Tests/ServerImage";
import ScrollImage from "./components/Universal/ScrollImage";
import HomeScreen from "./components/Tests/HomeScreen";
import { DataProvider } from "./components/Tests/DataContext";
import ScrollContainerHorizontal from "./components/Tests/ScrollContainerHorizontal";

const index = () => {
  return (
    <View style={styles.scroll}>
      {/* <Home /> */}
      {/* <Profile /> */}
      {/* <ProfileButtonBar /> */}
      {/* <Test /> */}
      {/* <ServerImage /> */}
      {/* <ScrollImage /> */}
      {/* <HomeScreen /> */}
      <ScrollContainerHorizontal />
    </View>
    // <DataProvider>
    //   <HomeScreen />
    // </DataProvider>
  );
};

const styles = StyleSheet.create({
  scroll: {
    backgroundColor: "red",
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default index;
