import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";

const screenWidth = Dimensions.get("window").width;

const data = [
  {
    id: "1",
    title: "Electronics Sale",
    description: "Up to 70% off on top brands!",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    action: "Shop Now",
  },
  {
    id: "2",
    title: "Fashion Fiesta",
    description: "Get 50% off on new arrivals.",
    image:
      "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    action: "Explore",
  },
  {
    id: "3",
    title: "Home Essentials",
    description: "Top picks for your home.",
    image:
      "https://images.unsplash.com/photo-1493666438817-866a91353ca9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    action: "Discover",
  },
  {
    id: "4",
    title: "Grocery Deals",
    description: "Everyday savings on groceries.",
    image:
      "https://images.unsplash.com/photo-1586822168907-4769efef3f23?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    action: "Buy Now",
  },
];

const FlipkartCards = () => {
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    startAutoScroll();
    return () => clearInterval(intervalRef.current);
  }, []);

  const startAutoScroll = () => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === data.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
  };

  const handleScrollEnd = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(offsetX / screenWidth);
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({
        index: currentIndex,
        animated: true,
      });
    }
  }, [currentIndex]);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionText}>{item.action}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToAlignment="center"
        snapToInterval={screenWidth}
        decelerationRate="fast"
        onMomentumScrollEnd={handleScrollEnd}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 250,
    backgroundColor: "#f5f5f5",
  },
  card: {
    width: screenWidth - 40,
    marginHorizontal: 20,
    borderRadius: 10,
    backgroundColor: "#fff",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 140,
  },
  content: {
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginVertical: 5,
  },
  actionButton: {
    marginTop: 10,
    backgroundColor: "#2874F0",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
    alignSelf: "flex-start",
  },
  actionText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default FlipkartCards;
