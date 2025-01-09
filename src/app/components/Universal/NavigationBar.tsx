import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  useColorScheme,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons
import { useRouter } from "expo-router";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const NavigationBar = () => {
  const systemTheme = useColorScheme();
  const [selectedTab, setSelectedTab] = useState("Home");

  // Determine if dark mode is active
  const isDarkMode = systemTheme === "dark";

  const router = useRouter(); // Initialize useRouter
  const handleItemPress = (path: string) => {
    router.push(path); // Navigates to the given path
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? "transparent" : "transparent" },
      ]}>
      {/* Bottom Navigation Bar */}
      <View
        style={[
          styles.tabBar,
          { backgroundColor: isDarkMode ? "#121212" : "#FFF" },
        ]}>
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => {
            setSelectedTab("Home");
            handleItemPress("/components/Home/Home");
          }}>
          <Ionicons
            name="home"
            size={24}
            color={
              selectedTab === "Home"
                ? isDarkMode
                  ? "#FFF"
                  : "#000"
                : isDarkMode
                ? "gray"
                : "#aaa"
            }
          />
          <Text
            style={[
              styles.tabText,
              {
                color:
                  selectedTab === "Home"
                    ? isDarkMode
                      ? "#FFF"
                      : "#000"
                    : isDarkMode
                    ? "gray"
                    : "#aaa",
              },
            ]}>
            Home
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => setSelectedTab("Restaurant")}>
          <Ionicons
            name="restaurant"
            size={24}
            color={
              selectedTab === "Restaurant"
                ? isDarkMode
                  ? "#FFF"
                  : "#000"
                : isDarkMode
                ? "gray"
                : "#aaa"
            }
          />
          <Text
            style={[
              styles.tabText,
              {
                color:
                  selectedTab === "Restaurant"
                    ? isDarkMode
                      ? "#FFF"
                      : "#000"
                    : isDarkMode
                    ? "gray"
                    : "#aaa",
              },
            ]}>
            Restaurant
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => {
            setSelectedTab("Search");
            handleItemPress("/components/Search/Search");
          }}>
          <Ionicons
            name="search"
            size={24}
            color={
              selectedTab === "Search"
                ? isDarkMode
                  ? "#FFF"
                  : "#000"
                : isDarkMode
                ? "gray"
                : "#aaa"
            }
          />
          <Text
            style={[
              styles.tabText,
              {
                color:
                  selectedTab === "Search"
                    ? isDarkMode
                      ? "#FFF"
                      : "#000"
                    : isDarkMode
                    ? "gray"
                    : "#aaa",
              },
            ]}>
            Search
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => {
            setSelectedTab("Profile");
            handleItemPress("/components/Profile/Profile");
          }}>
          <Ionicons
            name="person"
            size={24}
            color={
              selectedTab === "Profile"
                ? isDarkMode
                  ? "#FFF"
                  : "#000"
                : isDarkMode
                ? "gray"
                : "#aaa"
            }
          />
          <Text
            style={[
              styles.tabText,
              {
                color:
                  selectedTab === "Profile"
                    ? isDarkMode
                      ? "#FFF"
                      : "#000"
                    : isDarkMode
                    ? "gray"
                    : "#aaa",
              },
            ]}>
            Profile
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => setSelectedTab("Product")}>
          <Ionicons
            name="pricetag"
            size={24}
            color={
              selectedTab === "Product"
                ? isDarkMode
                  ? "#FFF"
                  : "#000"
                : isDarkMode
                ? "gray"
                : "#aaa"
            }
          />
          <Text
            style={[
              styles.tabText,
              {
                color:
                  selectedTab === "Product"
                    ? isDarkMode
                      ? "#FFF"
                      : "#000"
                    : isDarkMode
                    ? "gray"
                    : "#aaa",
              },
            ]}>
            Product
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // container: {
  //   zIndex: -1,
  //   height: screenHeight * 0.12,
  //   // backgroundColor: "#FFF",
  //   // position: "absolute", // Positions the navigation bar at the top of the screen
  // },
  tabBar: {
    height: screenHeight * 0.07,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 10,
    // paddingBottom: 10,
    borderTopWidth: 0.5,
    borderTopColor: "#ddd",
    // position: "absolute", // Positions the tab bar at the bottom of the screen
    bottom: 0,
    left: 0,
    right: 0, // Ensures the tab bar stretches across the whole width
    zIndex: 10, // Makes sure the tab bar stays on top of content
  },
  tabButton: {
    alignItems: "center",
  },
  tabText: {
    fontSize: 12,
    marginTop: 5,
  },
});

export default NavigationBar;
