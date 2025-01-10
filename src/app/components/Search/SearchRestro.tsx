import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Keyboard,
  useColorScheme,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

// Themes for light and dark mode
const themes = {
  light: {
    backgroundColor: "#fff",
    textColor: "#000",
    borderColor: "#ccc",
    placeholderTextColor: "#888",
    iconColor: "red",
  },
  dark: {
    backgroundColor: "#000",
    textColor: "#fff",
    borderColor: "#555",
    placeholderTextColor: "#aaa",
    iconColor: "white",
  },
};

const SearchRestro = () => {
  const colorScheme = useColorScheme(); // Detects 'light' or 'dark'
  const currentTheme = themes[colorScheme === "dark" ? "dark" : "light"];

  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  // Listen for keyboard show/hide events
  useEffect(() => {
    const showSub = Keyboard.addListener("keyboardDidShow", () =>
      setIsKeyboardVisible(true)
    );
    const hideSub = Keyboard.addListener("keyboardDidHide", () =>
      setIsKeyboardVisible(false)
    );

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  // Whenever 'searchText' changes, fetch data
  useEffect(() => {
    if (searchText.trim().length === 0) {
      setSuggestions([]);
      return;
    }
    fetch(`http://192.168.1.3:3000/api/search?term=${searchText}`)
      .then((response) => response.json())
      .then((data) => {
        setSuggestions(data.results);
      })
      .catch((error) => {
        console.error("Error fetching search results:", error);
      });
  }, [searchText]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        alert(`You pressed ${item}`);
      }}
      style={[
        styles.suggestionItem,
        {
          backgroundColor: currentTheme.backgroundColor,
          shadowColor: colorScheme === "dark" ? "#fff" : "#000",
          borderBottomColor: currentTheme.borderColor,
        },
      ]}>
      <Text style={[styles.suggestionText, { color: currentTheme.textColor }]}>
        {item}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: currentTheme.backgroundColor },
      ]}>
      <View style={styles.barContainer}>
        <View
          style={[
            styles.searchBorder,
            { borderColor: currentTheme.borderColor },
          ]}>
          <TextInput
            style={[styles.input, { color: currentTheme.textColor }]}
            placeholder="Lakh Ahiya ..."
            placeholderTextColor={currentTheme.placeholderTextColor}
            value={searchText}
            onChangeText={setSearchText}
          />
          <MaterialIcons
            name="search"
            size={27}
            style={[styles.searchicon, { color: currentTheme.iconColor }]}
          />
        </View>

        <View
          style={[
            styles.filterBorder,
            { borderColor: currentTheme.borderColor },
          ]}>
          <Text style={[styles.filtter, { color: currentTheme.textColor }]}>
            Filtter
          </Text>
          <MaterialIcons
            name="camera"
            size={27}
            style={[styles.filttericon, { color: currentTheme.iconColor }]}
          />
        </View>
      </View>

      {isKeyboardVisible && searchText.trim().length > 0 && (
        <View
          style={[
            styles.suggestions,
            { backgroundColor: currentTheme.backgroundColor },
          ]}>
          <FlatList
            data={suggestions}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={
              <Text
                style={[
                  styles.noResults,
                  { color: currentTheme.placeholderTextColor },
                ]}>
                No records found
              </Text>
            }
          />
        </View>
      )}
    </View>
  );
};

export default SearchRestro;

/* ----------------- STYLES ----------------- */
const styles = StyleSheet.create({
  container: {
    height: screenHeight * 0.93,
    width: screenWidth,
    position: "absolute",
    gap: 8,
  },
  barContainer: {
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 14,
    justifyContent: "space-between",
    marginTop: 20,
  },
  searchBorder: {
    height: screenHeight * 0.05,
    width: screenWidth * 0.6,
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: "center",
    alignContent: "center",
  },
  input: {
    left: "4%",
    width: "85%",
    height: "100%",
    position: "absolute",
    fontSize: 16,
  },
  searchicon: {
    position: "absolute",
    left: "86%",
  },
  filterBorder: {
    height: screenHeight * 0.05,
    width: screenWidth * 0.3,
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: "center",
    alignContent: "center",
  },
  filttericon: {
    position: "absolute",
    left: "70%",
  },
  filtter: {
    fontSize: 18,
    fontWeight: "bold",
    position: "absolute",
    left: "10%",
  },
  suggestions: {
    maxHeight: screenHeight * 0.4,
    width: screenWidth,
    borderRadius: 5,
    marginTop: 10,
    padding: 10,
  },
  suggestionItem: {
    padding: 10,
    marginBottom: 5,
    borderBottomWidth: 1,
    borderRadius: 5,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  suggestionText: {
    fontSize: 16,
  },
  noResults: {
    textAlign: "center",
    marginTop: 5,
  },
});
