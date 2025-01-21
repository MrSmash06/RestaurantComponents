import React, { useState, useEffect } from "react";
import {
  StatusBar,
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from "react-native";
import Icon from "@expo/vector-icons/MaterialIcons";
import { MaterialIcons } from "@expo/vector-icons";
import OfferCard from "./OfferCard";
import { useLocalSearchParams } from "expo-router";

const { height: screenHeight, width: screenWidth } = Dimensions.get("window");
const { id } = useLocalSearchParams(); // Get restaurant ID from search params
const [restro, setRestro] = useState(null); // State to store restaurant details
const [loading, setLoading] = useState(true); // Loading state for fetching data
const [error, setError] = useState<string | null>(null); // Explicitly declare error type as string or null

const images = [
  { id: 1, image: require("../assets/image1.jpg") },
  { id: 2, image: require("../assets/image2.jpg") },
  { id: 3, image: require("../assets/image3.jpg") },
  { id: 4, image: require("../assets/image4.jpg") },
  { id: 5, image: require("../assets/image5.jpg") },
];

const loopedImages = [
  { ...images[images.length - 1], id: "start-clone" },
  ...images,
  { ...images[0], id: "end-clone" },
];

const HeaderButton = ({
  icon,
  onPress,
}: {
  icon: keyof typeof MaterialIcons.glyphMap;
  onPress: () => void;
}) => (
  <TouchableOpacity onPress={onPress}>
    <Icon
      name={icon}
      size={20}
      color="#000"
      style={{ padding: 5, marginHorizontal: 5 }}
    />
  </TouchableOpacity>
);

const RatingBar = () => (
  <View style={styles.ratingBar}>
    <View style={styles.ratingLeft}>
      <Icon name="star" size={22} color="rgb(248, 68, 100)" />
      <Text style={styles.ratingText}>8.3/10</Text>
    </View>
    <TouchableOpacity style={styles.rateButton}>
      <Text style={styles.rateButtonText}>Rate Now</Text>
    </TouchableOpacity>
  </View>
);

// const OfferCard = () => <View style={styles.offerCard} />;

const HotelDescription = () => {
  const [expanded, setExpanded] = React.useState(false);

  const fullDescription = `Experience luxury dining at its finest with panoramic city views. Our restaurant offers a perfect blend of traditional and modern cuisine, crafted by award-winning chefs. `;

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, text.lastIndexOf(" ", maxLength));
  };

  return (
    <View style={styles.descriptionContainer}>
      <Text style={styles.hotelName}>Hotel Taj Palace</Text>

      <View style={styles.locationRow}>
        <Icon name="location-on" size={18} color="#666" />
        <Text style={styles.locationText}>Mumbai, Maharashtra</Text>
      </View>

      <View style={styles.typeRow}>
        <View style={styles.cuisineContainer}>
          <Icon name="restaurant" size={16} color="#666" />
          <Text style={styles.cuisineText}>Multi-Cuisine</Text>
        </View>
        <View style={styles.costContainer}>
          <Icon name="payment" size={16} color="#666" />
          <Text style={styles.costText}>₹2,500 for two</Text>
        </View>
      </View>

      <View style={styles.descriptionBox}>
        <Text style={styles.description}>
          {expanded ? (
            fullDescription
          ) : (
            <>
              {truncateText(fullDescription, 100)}
              <Text>... </Text>
              <Text
                onPress={() => setExpanded(true)}
                style={styles.readMoreText}>
                more
              </Text>
            </>
          )}
          {expanded && (
            <Text
              onPress={() => setExpanded(false)}
              style={styles.readMoreText}>
              {" "}
              less
            </Text>
          )}
        </Text>
      </View>

      <View style={styles.facilitiesRow}>
        {[
          { icon: "wifi", label: "Free WiFi" },
          { icon: "local-parking", label: "Parking" },
          { icon: "ac-unit", label: "AC" },
          { icon: "smoke-free", label: "No Smoking" },
        ].map((facility, index) => (
          <View key={index} style={styles.facilityItem}>
            <Icon
              name={facility.icon as keyof typeof MaterialIcons.glyphMap}
              size={16}
              color="#666"
            />
            <Text style={styles.facilityText}>{facility.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const FooterButton = ({ title }: { title: string }) => (
  <TouchableOpacity style={styles.footerButton}>
    <Text style={styles.footerButtonText}>{title}</Text>
  </TouchableOpacity>
);

const ImageCarousel = () => {
  const flatListRef = React.useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = React.useState(1);
  const [isResetting, setIsResetting] = React.useState(false);

  React.useEffect(() => {
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
    <View style={styles.carouselContainer}>
      <FlatList
        ref={flatListRef}
        data={loopedImages}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Image source={item.image} style={styles.carouselImage} />
        )}
        initialScrollIndex={1}
        getItemLayout={(data, index) => ({
          length: screenWidth,
          offset: screenWidth * index,
          index,
        })}
        onMomentumScrollEnd={(event) => {
          const newIndex = Math.round(
            event.nativeEvent.contentOffset.x / screenWidth
          );
          handleIndexChange(newIndex);
        }}
      />
      <View style={styles.pagination}>
        {images.map((_, i) => (
          <View
            key={i}
            style={[
              styles.paginationDot,
              currentIndex === i + 1 ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const HomePage = () => {
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
    <>
      <StatusBar backgroundColor="transparent" barStyle="dark-content" />
      <View style={styles.container}>
        <View style={styles.header}>
          <HeaderButton icon="arrow-back-ios" onPress={() => {}} />
          <Text style={styles.headerTitle}>Home</Text>
          <HeaderButton icon="share" onPress={() => {}} />
        </View>

        <ScrollView>
          <View style={styles.content}>
            <ImageCarousel />
            <RatingBar />
            <HotelDescription />

            <View style={styles.offersSection}>
              <Text style={styles.sectionTitle}>Top Offers for you</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {[1, 2, 3, 4, 5, 6].map((_, index) => (
                  <OfferCard key={index} />
                ))}
              </ScrollView>
            </View>

            <Image
              source={require("../assets/image5.jpg")}
              style={styles.regularImage}
            />
            <Image
              source={require("../assets/image3.jpg")}
              style={styles.regularImage}
            />
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <FooterButton title="Menu" />
          <FooterButton title="Book" />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    height: screenHeight * 0.065,
    borderBottomWidth: 0.3,
    borderBottomColor: "grey",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
    right: screenWidth * 0.34,
  },
  content: {
    flexGrow: 1,
    paddingVertical: 10,
    alignItems: "center",
    gap: 4,
  },
  carouselContainer: {
    height: screenHeight * 0.25,
    width: screenWidth,
  },
  carouselImage: {
    width: screenWidth,
    height: screenHeight * 0.25,
    resizeMode: "cover",
  },
  regularImage: {
    width: screenWidth * 0.98,
    height: screenHeight * 0.25,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#000",
  },
  ratingBar: {
    height: screenHeight * 0.06,
    width: screenWidth * 0.98,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    backgroundColor: "#f2f5fa",
  },
  ratingLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: 10,
  },
  ratingText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  rateButton: {
    backgroundColor: "#fff",
    padding: 5,
    borderRadius: 8,
    borderColor: "rgb(248, 68, 100)",
    borderWidth: 0.5,
  },
  rateButtonText: {
    fontSize: 12,
    fontWeight: "500",
    color: "rgb(248, 68, 100)",
  },
  pagination: {
    flexDirection: "row",
    position: "absolute",
    bottom: 10,
    width: "100%",
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
    backgroundColor: "#333",
  },
  inactiveDot: {
    backgroundColor: "#ccc",
  },
  offersSection: {
    height: screenHeight * 0.2,
    width: screenWidth * 0.98,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#000",
    overflow: "hidden",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginLeft: 10,
    marginTop: 3,
  },
  offerCard: {
    width: screenWidth * 0.7,
    height: screenHeight * 0.085,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#000",
    marginHorizontal: 5,
    marginTop: 10,
  },
  footer: {
    height: screenHeight * 0.07,
    borderTopWidth: 0.3,
    borderTopColor: "grey",
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 8,
  },
  footerButton: {
    borderWidth: 0.3,
    width: "48%",
    height: screenHeight * 0.05,
    borderRadius: 4,
    backgroundColor: "rgb(248, 68, 100)",
    alignItems: "center",
    justifyContent: "center",
  },
  footerButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  descriptionContainer: {
    width: screenWidth * 0.98,
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  hotelName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 1,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  locationText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 4,
    marginTop: 1,
  },
  typeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  cuisineContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  cuisineText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 4,
  },
  costContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  costText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 4,
  },
  description: {
    fontSize: 14,
    color: "#444",
    lineHeight: 20,
  },
  facilitiesRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  facilityItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
    marginBottom: 8,
  },
  facilityText: {
    fontSize: 12,
    color: "#666",
    marginLeft: 4,
  },
  descriptionBox: {
    // marginVertical: 12,
    marginBottom: 8,
  },
  description_text: {
    fontSize: 14,
    color: "#444",
    lineHeight: 20,
  },
  readMoreButton: {
    marginTop: 4,
  },
  readMoreText: {
    color: "rgb(248, 68, 100)",
    fontSize: 14,
    fontWeight: "500",
  },
});

export default HomePage;
