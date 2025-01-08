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
import { MaterialIcons } from "@expo/vector-icons";

const Screenwidth = Dimensions.get("window").width;

// Notification data interface
interface NotificationItem {
  id: string;
  imagePath: any;
  title: string;
  description: string;
  time: string;
}

// Sample notifications dictionary
const notificationsData: { [key: string]: NotificationItem } = {
  "1": {
    id: "1",
    imagePath: require("../assets/profilePic.jpg"),
    title: "First Notification",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum quos, possimus, animi sapiente harum ullam ut veniam expedita corporis iusto est libero distinctio amet! Quia, tenetur alias?",
    time: "10:00 AM",
  },
  "2": {
    id: "2",
    imagePath: require("../assets/profilePic.jpg"),
    title: "Second Notification",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum quos, possimus, animi sapiente harum ullam ut veniam expedita corporis iusto est libero distinctio amet! Quia, tenetur alias?",
    time: "10:00 AM",
  },
  // Add more notifications as needed
};

const NotificationBar = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const theme = useColorScheme(); // Detect the theme
  const isDarkMode = theme === "dark";

  const renderNotification = ({ item }: { item: NotificationItem }) => {
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
                numberOfLines={isExpanded ? undefined : 2}>
                {item.description}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.icon}
            onPress={() => setExpandedId(isExpanded ? null : item.id)}>
            <MaterialIcons
              name={isExpanded ? "keyboard-arrow-up" : "keyboard-arrow-down"}
              size={24}
              color={isDarkMode ? "white" : "black"}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <FlatList
      data={Object.values(notificationsData)}
      renderItem={renderNotification}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    margin: 5,
    marginLeft: Screenwidth * 0.05,
    marginRight: Screenwidth * 0.05,
    width: Screenwidth * 0.9,
  },
  containerLight: {
    backgroundColor: "white",
  },
  containerDark: {
    backgroundColor: "#1e1e1e",
  },
  contentWrapper: {
    flexDirection: "row",
    padding: 5,
    gap: 10,
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
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#fff",
    height: 40,
    width: 40,
  },
  icon: {
    right: 10,
    top: 10,
    position: "absolute",
    marginTop: 5,
    marginLeft: 15,
  },
  nameTime: {
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
  },
  name: {
    fontSize: 15,
    fontWeight: "bold",
  },
  time: {
    fontSize: 10,
  },
  textContainer: {
    flex: 1,
    paddingRight: 35,
  },
  messageContainer: {
    marginTop: 1,
  },
  message: {
    fontSize: 12,
  },
  expandedMessage: {
    lineHeight: 15.5,
  },
  listContainer: {},
});

export default NotificationBar;
