import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { useLocalSearchParams } from "expo-router";

const { width: screenWidth } = Dimensions.get("window");

const Menu = () => {
  const { id } = useLocalSearchParams(); // Get restaurant ID
  const [menu, setMenu] = useState(null); // State to store menu data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const response = await fetch(`http://192.168.1.4:3000/api/menu/${id}`);
        const data = await response.json();
        if (response.ok) {
          setMenu(data.menu);
        } else {
          setError(data.error || "Error fetching menu");
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError("An error occurred while fetching the menu.");
      } finally {
        setLoading(false);
      }
    };

    fetchMenuData();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text style={styles.loadingText}>Loading menu...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!menu || Object.keys(menu).length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No menu available!</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Menu</Text>
      {Object.entries(menu).map(([itemName, itemDetails]: [string, any]) => (
        <View key={itemName} style={styles.menuItem}>
          <Image source={{ uri: itemDetails.url }} style={styles.itemImage} />
          <View style={styles.itemDetails}>
            <Text style={styles.itemName}>{itemName}</Text>
            <Text style={styles.itemInfo}>Price: ₹{itemDetails.price}</Text>
            <Text style={styles.itemInfo}>
              Quantity: {itemDetails.quantity}
            </Text>
            <Text style={styles.itemType}>
              Type: {itemDetails.type === "veg" ? "🌱 Veg" : "🍗 Non-Veg"}
            </Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#4CAF50",
    fontWeight: "bold",
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
    textAlign: "center",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    marginVertical: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  itemImage: {
    width: screenWidth * 0.3,
    height: screenWidth * 0.3,
    borderRadius: 8,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  itemInfo: {
    fontSize: 14,
    marginBottom: 3,
    color: "#555",
  },
  itemType: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
});

export default Menu;
