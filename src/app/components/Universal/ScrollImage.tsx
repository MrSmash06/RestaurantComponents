import { StyleSheet, View, Dimensions, Image, FlatList } from "react-native";
import React, { useEffect, useRef, useState } from "react";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const images = [
  { id: 1, image: require("../assets/image1.jpg") },
  { id: 2, image: require("../assets/image2.jpg") },
  { id: 3, image: require("../assets/image3.jpg") },
  { id: 4, image: require("../assets/image4.jpg") },
  { id: 5, image: require("../assets/image5.jpg") },
];

// Add cloned images for seamless looping
const loopedImages = [
  { ...images[images.length - 1], id: "start-clone" }, // Clone the last image
  ...images,
  { ...images[0], id: "end-clone" }, // Clone the first image
];

function ScrollImage() {
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(1); // Start at the first real image
  const [isResetting, setIsResetting] = useState(false); // Track reset state
  const [resetOffset, setResetOffset] = useState(0); // Offset for reset action

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isResetting && flatListRef.current) {
        const nextIndex = currentIndex + 1;
        flatListRef.current.scrollToIndex({ index: nextIndex, animated: true });
        handleIndexChange(nextIndex);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex, isResetting]);

  const handleIndexChange = (index: number) => {
    if (index === loopedImages.length - 1 && flatListRef.current) {
      setIsResetting(true);
      setResetOffset(screenWidth);
      setTimeout(() => {
        setCurrentIndex(1);
        flatListRef.current?.scrollToOffset({
          offset: screenWidth,
          animated: false,
        });
        setIsResetting(false);
      }, 300);
    } else if (index === 0 && flatListRef.current) {
      setIsResetting(true);
      setResetOffset(screenWidth * images.length);
      setTimeout(() => {
        setCurrentIndex(images.length);
        flatListRef.current?.scrollToOffset({
          offset: screenWidth * images.length,
          animated: false,
        });
        setIsResetting(false);
      }, 300);
    } else {
      setCurrentIndex(index);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={loopedImages}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Image source={item.image} style={styles.image} />
        )}
        initialScrollIndex={1} // Start at the first real image
        getItemLayout={(data, index) => ({
          length: screenWidth,
          offset: screenWidth * index,
          index,
        })} // Define item layout
        onMomentumScrollEnd={(event) => {
          const newIndex = Math.round(
            event.nativeEvent.contentOffset.x / screenWidth
          );
          handleIndexChange(newIndex);
        }}
      />
      {/* Pagination Indicators */}
      <View style={styles.pagination}>
        {images.map((_, i) => {
          const isActive = currentIndex === i + 1;
          return (
            <View
              key={i}
              style={[
                styles.paginationDot,
                isActive ? styles.activeDot : styles.inactiveDot,
              ]}
            />
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f4f4",
    marginTop: 30,
  },
  image: {
    width: screenWidth,
    height: screenHeight * 0.25,
    resizeMode: "cover",
  },
  pagination: {
    flexDirection: "row",
    position: "absolute",
    bottom: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: "#000",
  },
  inactiveDot: {
    backgroundColor: "#ccc",
  },
});

export default ScrollImage;
