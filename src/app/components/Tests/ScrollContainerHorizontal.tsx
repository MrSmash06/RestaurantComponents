import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
} from "react-native";
import React, { useRef, useEffect, useState } from "react";

const screenWidth = Dimensions.get("window").width;

const data = [
  {
    id: "1",
    name: "Restro A",
    image:
      "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg",
    description: "Great food and ambiance!",
  },
  {
    id: "2",
    name: "Restro B",
    image:
      "https://images.unsplash.com/photo-1560674457-12073ed6fae6?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwcm9maWxlLXBhZ2V8NHx8fGVufDB8fHx8fA%3D%3D",
    description: "Delicious meals at an affordable price.",
  },
  {
    id: "3",
    name: "Restro C",
    image:
      "https://gratisography.com/wp-content/uploads/2024/10/gratisography-cool-cat-800x525.jpg",
    description: "Perfect spot for a family dinner.",
  },
  {
    id: "4",
    name: "Restro D",
    image:
      "https://img.freepik.com/premium-photo/colorful-chameleon-with-colorful-pattern-its-face_925492-118.jpg?semt=ais_hybrid",
    description: "Indulge in a relaxing meal with your family.",
  },
  {
    id: "5",
    name: "Restro E",
    image:
      "https://cdn.pixabay.com/photo/2023/03/15/20/46/background-7855413_640.jpg",
    description: "Enjoy a cozy cafe experience.",
  },
];

// Add first and last items for the loop
const loopData = [
  { ...data[data.length - 1], id: "0" }, // Duplicate last item at the start
  ...data,
  { ...data[0], id: `${data.length + 1}` }, // Duplicate first item at the end
];

const ScrollContainerHorizontal = () => {
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(1); // Start at the first "real" item
  const intervalRef = useRef(null);
  const isInteracting = useRef(false);

  useEffect(() => {
    startAutoScroll();
    return () => clearAutoScroll(); // Cleanup interval on unmount
  }, []);

  const startAutoScroll = () => {
    intervalRef.current = setInterval(() => {
      if (!isInteracting.current) {
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }
    }, 5000);
  };

  const clearAutoScroll = () => {
    clearInterval(intervalRef.current);
  };

  const handleScrollBegin = () => {
    isInteracting.current = true;
    clearAutoScroll();
  };

  const handleScrollEnd = () => {
    isInteracting.current = false;
    startAutoScroll();
  };

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({
        index: currentIndex,
        animated: true,
      });
    }
  }, [currentIndex]);

  const onMomentumScrollEnd = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / (screenWidth * 0.8 + 20));

    if (index === 0) {
      // User scrolled to the duplicate of the last item, jump to the real last item
      setCurrentIndex(data.length);
      flatListRef.current.scrollToIndex({
        index: data.length,
        animated: false,
      });
    } else if (index === loopData.length - 1) {
      // User scrolled to the duplicate of the first item, jump to the real first item
      setCurrentIndex(1);
      flatListRef.current.scrollToIndex({ index: 1, animated: false });
    } else {
      setCurrentIndex(index);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );

  return (
    <View style={{ height: "100%", width: "100%" }}>
      <View style={styles.container}>
        <FlatList
          ref={flatListRef}
          data={loopData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToAlignment="start"
          snapToInterval={screenWidth * 0.8 + 20} // Card width + spacing
          decelerationRate="fast"
          onScrollBeginDrag={handleScrollBegin}
          onMomentumScrollEnd={onMomentumScrollEnd}
          contentContainerStyle={{ paddingHorizontal: 20 }}
          getItemLayout={(data, index) => ({
            length: screenWidth * 0.8 + 20,
            offset: (screenWidth * 0.8 + 20) * index,
            index,
          })}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "25%",
    backgroundColor: "black",
  },
  card: {
    width: screenWidth * 0.8, // Adjust card width for partial view
    marginRight: 20, // Space between cards
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    borderRadius: 10,
  },
  image: {
    width: "100%",
    height: "70%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 8,
    marginHorizontal: 10,
  },
  description: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
    marginHorizontal: 10,
    textAlign: "center",
  },
});

export default ScrollContainerHorizontal;
