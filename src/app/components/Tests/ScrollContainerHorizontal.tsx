import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
} from "react-native";

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

const ScrollContainerHorizontal = () => {
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);
  const isInteracting = useRef(false);

  useEffect(() => {
    startAutoScroll();
    return () => clearAutoScroll();
  }, []);

  const startAutoScroll = () => {
    intervalRef.current = setInterval(() => {
      if (!isInteracting.current) {
        setCurrentIndex((prevIndex) =>
          prevIndex === data.length - 1 ? 0 : prevIndex + 1
        );
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

  const handleScrollEnd = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(offsetX / screenWidth); // Calculate the correct index based on the scroll offset
    setCurrentIndex(newIndex); // Update the current index
    isInteracting.current = false; // Reset interaction flag
    startAutoScroll(); // Restart the auto-scroll after manual interaction
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({
        index: currentIndex,
        animated: true,
      });
    }
  }, [currentIndex]);

  return (
    <View style={{ height: "100%", width: "100%" }}>
      <View style={styles.container}>
        <FlatList
          ref={flatListRef}
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToAlignment="start"
          snapToInterval={screenWidth} // Match the card width
          decelerationRate="fast"
          onScrollBeginDrag={handleScrollBegin} // Detect manual interaction
          onMomentumScrollEnd={handleScrollEnd} // Handle snap and reset timer
          contentContainerStyle={{}}
          getItemLayout={(data, index) => ({
            length: screenWidth,
            offset: screenWidth * index,
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
    paddingLeft: "10%",
    paddingRight: "10%",
    width: screenWidth, // Full screen width for each card
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
