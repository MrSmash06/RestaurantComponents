import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  useColorScheme,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, usePathname } from "expo-router";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const NavigationBar = () => {
  const systemTheme = useColorScheme();
  const router = useRouter();

  // 1. Grab the current path
  const pathname = usePathname();

  // 2. Determine if dark mode is active
  const isDarkMode = systemTheme === "dark";

  // 3. Function to navigate
  const handleItemPress = (path: string) => {
    router.push(path);
  };

  // 4. Helper: which tab is active?
  //    For simplicity, you can do an exact check or “startsWith” check
  const isActive = (path: string) => pathname === path;
  // or if you use nested routes or dynamic segments, you might do:
  //   const isActive = (path: string) => pathname.startsWith(path);

  return (
    <View style={styles.container}>
      {/* Bottom Navigation Bar */}
      <View
        style={[
          styles.tabBar,
          { backgroundColor: isDarkMode ? "#121212" : "#FFF" },
        ]}>
        {/* =============== Home Tab =============== */}
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => handleItemPress("/components/Home/Home")}>
          <Ionicons
            name="home"
            size={24}
            color={
              isActive("/components/Home/Home")
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
                color: isActive("/components/Home/Home")
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

        {/* =============== Restaurant Tab =============== */}
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => handleItemPress("/components/Restaurant/Restaurant")}>
          <Ionicons
            name="restaurant"
            size={24}
            color={
              isActive("/components/Restaurant/Restaurant")
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
                color: isActive("/components/Restaurant/Restaurant")
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

        {/* =============== Search Tab =============== */}
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => handleItemPress("/components/Search/Search")}>
          <Ionicons
            name="search"
            size={24}
            color={
              isActive("/components/Search/Search")
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
                color: isActive("/components/Search/Search")
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

        {/* =============== Profile Tab =============== */}
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => handleItemPress("/components/Profile/Profile")}>
          <Ionicons
            name="person"
            size={24}
            color={
              isActive("/components/Profile/Profile")
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
                color: isActive("/components/Profile/Profile")
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

        {/* =============== Product Tab =============== */}
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => handleItemPress("/components/Profile/Product")}>
          <Ionicons
            name="pricetag"
            size={24}
            color={
              isActive("/components/Product/Product")
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
                color: isActive("/components/Profile/Product")
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

export default NavigationBar;

const styles = StyleSheet.create({
  container: {
    // any container styling
  },
  tabBar: {
    height: screenHeight * 0.07,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 10,
    borderTopWidth: 0.5,
    borderTopColor: "#ddd",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  tabButton: {
    alignItems: "center",
  },
  tabText: {
    fontSize: 12,
    marginTop: 5,
  },
});
