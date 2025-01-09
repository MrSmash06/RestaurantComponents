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
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const SearchRestro = () => {
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

  // Whenever 'searchText' changes, we fetch from the server
  useEffect(() => {
    if (searchText.trim().length === 0) {
      // If empty, clear suggestions
      setSuggestions([]);
      return;
    }
    // Otherwise, fetch the filtered restaurants
    fetch(`http://192.168.1.3:3000/api/search?term=${searchText}`)
      .then((response) => response.json())
      .then((data) => {
        // data = { results: ["Applebee's", "Apex BBQ", ...] }
        setSuggestions(data.results);
      })
      .catch((error) => {
        console.error("Error fetching search results:", error);
      });
  }, [searchText]);

  // Render each suggestion
  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        alert(`You pressed ${item}`);
      }}
      style={styles.suggestionItem}>
      <Text style={styles.suggestionText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.barContainer}>
        {/* =============== SEARCH INPUT =============== */}
        <View style={styles.searchBorder}>
          <TextInput
            style={styles.input}
            placeholder="Lakh Ahiya ..."
            value={searchText}
            onChangeText={setSearchText} // Update state on typing
          />
          <MaterialIcons name="search" size={27} style={styles.searchicon} />
        </View>

        {/* =============== FILTER BUTTON =============== */}
        <View style={styles.filterBorder}>
          <Text style={styles.filtter}>Filtter</Text>
          <MaterialIcons name="camera" size={27} style={styles.filttericon} />
        </View>
      </View>

      {/**
       * =============== SUGGESTIONS LIST ===============
       * Show if:
       *   1) Keyboard is visible
       *   2) Some text is entered (non-empty)
       * We do NOT require suggestions.length > 0, so that "No records found" can show.
       */}
      {isKeyboardVisible && searchText.trim().length > 0 && (
        <View style={styles.suggestions}>
          <FlatList
            data={suggestions}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={
              <Text style={styles.noResults}>No records found</Text>
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
    backgroundColor: "#fff",
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
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    justifyContent: "center",
    alignContent: "center",
  },
  input: {
    left: "4%",
    width: "85%",
    height: "100%",
    position: "absolute",
    fontSize: 16,
    color: "black",
  },
  searchicon: {
    position: "absolute",
    left: "86%",
    color: "red",
  },
  filterBorder: {
    height: screenHeight * 0.05,
    width: screenWidth * 0.3,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    justifyContent: "center",
    alignContent: "center",
  },
  filttericon: {
    position: "absolute",
    left: "70%",
    color: "red",
  },
  filtter: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    position: "absolute",
    left: "10%",
  },

  /**
   * Suggestions box:
   * Use maxHeight to limit it to 40% of screen if lots of items,
   * but shrink if fewer items (FlatList won't fill empty space).
   */
  suggestions: {
    backgroundColor: "red",
    // Up to 40% of the screen, but can shrink if fewer items
    maxHeight: screenHeight * 0.4,
    width: screenWidth,
    borderRadius: 5,
    marginTop: 10,
    padding: 10,
  },
  suggestionItem: {
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 10,
    marginBottom: 5,
  },
  suggestionText: {
    fontSize: 16,
  },
  noResults: {
    textAlign: "center",
    marginTop: 5,
    color: "#666",
  },
});
