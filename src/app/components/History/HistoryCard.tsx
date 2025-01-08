import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  FlatList,
  useColorScheme,
} from "react-native";
import React, { useState } from "react";

const Screenwidth = Dimensions.get("window").width;

// History data interface
interface HistoryItem {
  id: string;
  imagePath: any;
  title: string;
  description: string;
  time: string;
}

// Sample history data
const historyData: { [key: string]: HistoryItem } = {
  "1": {
    id: "1",
    imagePath: require("../assets/profilePic.jpg"),
    title: "History Event One",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum quos, possimus, animi sapiente harum ullam ut veniam expedita corporis iusto est libero distinctio amet! Quia, tenetur alias?",
    time: "10:00 AM",
  },
  "2": {
    id: "2",
    imagePath: require("../assets/profilePic.jpg"),
    title: "History Event Two",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum quos, possimus, animi sapiente harum ullam ut veniam expedita corporis iusto est libero distinctio amet! Quia, tenetur alias?",
    time: "10:30 AM",
  },
  // Add more history events as needed
};

const HistoryCard = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const theme = useColorScheme(); // Detect the theme
  const isDarkMode = theme === "dark";

  const renderHistoryItem = ({ item }: { item: HistoryItem }) => {
    const isExpanded = expandedId === item.id;

    return (
      <View
        style={[
          styles.container,
          isDarkMode ? styles.containerDark : styles.containerLight,
          isExpanded && styles.expandedContainer,
        ]}>
        <View style={styles.contentWrapper}>
          <View style={styles.imageWrapper}>
            <Image source={item.imagePath} style={styles.image} />
          </View>
          <View style={styles.textContainer}>
            <View style={styles.nameTime}>
              <Text
                style={[
                  styles.name,
                  { color: isDarkMode ? "white" : "black" },
                ]}>
                {item.title}
              </Text>
              <Text
                style={[
                  styles.time,
                  { color: isDarkMode ? "lightgray" : "gray" },
                ]}>
                {item.time}
              </Text>
            </View>
            <View style={styles.messageContainer}>
              <Text
                style={[
                  styles.message,
                  { color: isDarkMode ? "lightgray" : "gray" },
                  isExpanded && styles.expandedMessage,
                ]}
                numberOfLines={isExpanded ? undefined : 3}>
                {item.description}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.icon}
            onPress={() => setExpandedId(isExpanded ? null : item.id)}>
            <Text
              style={[{ color: isDarkMode ? "white" : "black" }, styles.arrow]}>
              {isExpanded ? "▲" : "▼"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <FlatList
      data={Object.values(historyData)} // Convert the data dictionary to an array
      renderItem={renderHistoryItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    margin: 10,
    marginLeft: Screenwidth * 0.05,
    marginRight: Screenwidth * 0.05,
    width: Screenwidth * 0.9,
    padding: 15,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  containerLight: {
    backgroundColor: "white",
  },
  containerDark: {
    backgroundColor: "#1e1e1e",
  },
  contentWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 15,
  },
  expandedContainer: {
    height: "auto",
  },
  imageWrapper: {
    paddingTop: 5,
  },
  image: {
    marginTop: 2.5,
    marginLeft: 5,
    marginBottom: 2.5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    height: 80,
    width: 80,
  },
  icon: {
    position: "absolute",
    right: 15,
    top: 15,
  },
  arrow: {
    fontSize: 18,
    fontWeight: "bold",
  },
  nameTime: {
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  time: {
    fontSize: 12,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    paddingRight: 35,
  },
  messageContainer: {
    marginTop: 5,
  },
  message: {
    fontSize: 14,
  },
  expandedMessage: {
    lineHeight: 18,
  },
  listContainer: {
    paddingBottom: 20,
  },
});

export default HistoryCard;
