import { View, Text } from "react-native";
import React from "react";
import HomeTopBar from "./components/Tests/HomeTopBar";
import Profile from "./components/Profile/Profile";
import Test from "./components/Tests/Test";
import ProfileButtonBar from "./components/Profile/ProfileButtonBar";
import Home from "./components/Home/Home";

const index = () => {
  return (
    <View>
      <Home />
      {/* <Profile /> */}
      {/* <ProfileButtonBar /> */}
      {/* <Test /> */}
    </View>
  );
};

export default index;
