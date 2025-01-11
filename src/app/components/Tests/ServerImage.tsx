import React, { useEffect, useState } from "react";
import { View, Image, StyleSheet, ActivityIndicator, Text } from "react-native";

const ServerImage = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching the image URL from a server
    const fetchImage = async () => {
      try {
        const response = await fetch("http://192.168.149.104:3000/api/data");
        const data = await response.json(); // Assuming the server returns { imageUrl: "..." }
        console.log(data);
        setImageUrl(data.imageUrl);
        console.log(data.imageUrl);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching the image:", error);
        setLoading(false);
      }
    };

    fetchImage();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : imageUrl ? (
        <Image source={{ uri: imageUrl }} style={styles.image} />
      ) : (
        <Text>Failed to load image.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: "contain", // Adjust as per your requirement
  },
});

export default ServerImage;
