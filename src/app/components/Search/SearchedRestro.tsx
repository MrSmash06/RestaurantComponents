import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";

const SearchedRestro = () => {
  const { id } = useLocalSearchParams(); // Get restaurant ID from search params
  const [restro, setRestro] = useState(null); // State to store restaurant details
  const [loading, setLoading] = useState(true); // Loading state for fetching data
  const [error, setError] = useState<string | null>(null); // Explicitly declare error type as string or null

  useEffect(() => {
    // Fetch restaurant details by ID
    const fetchRestroData = async () => {
      try {
        const response = await fetch(
          `http://192.168.1.4:3000/api/restro/${id}`
        );
        console.log(id);
        const data = await response.json();
        console.log(data);
        if (response.ok) {
          // Extract the restaurant data from the API response
          setRestro(data.restaurant); // Access the restaurant property
        } else {
          setError(data.error || "Error fetching data");
        }
      } catch (err) {
        setError("An error occurred while fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchRestroData();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  if (!restro) {
    return (
      <View style={styles.container}>
        <Text>No restaurant data found!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{restro.name}</Text>
      <Text style={styles.description}>Description: {restro.Description}</Text>
      <Text style={styles.offers}>Offers: {restro.offer.join(", ")}</Text>
      <Text style={styles.time}>Time: {restro.time}</Text>
      <Text style={styles.distance}>Distance: {restro.far}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  description: {
    fontSize: 16,
    marginTop: 10,
  },
  offers: {
    fontSize: 16,
    marginTop: 5,
  },
  time: {
    fontSize: 16,
    marginTop: 5,
  },
  distance: {
    fontSize: 16,
    marginTop: 5,
  },
});

export default SearchedRestro;
