import React, { useEffect, useState } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import {
  StatusBar,
  View,
  Text,
  Dimensions,
  StyleSheet,
  Image,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Icon from "@expo/vector-icons/MaterialIcons";
import { MaterialIcons } from "@expo/vector-icons";

const { height: screenHeight, width: screenWidth } = Dimensions.get("window");

/* ----------------------------- SUBCOMPONENTS ----------------------------- */

/* 1) Header */
const Header = ({
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
      color="#121212"
      style={{ padding: 5, marginHorizontal: 5 }}
    />
  </TouchableOpacity>
);

/* 2) Image Carousel */
const images = [
  { id: 1, image: require("../assets/image1.jpg") },
  { id: 2, image: require("../assets/image1.jpg") },
  { id: 3, image: require("../assets/image1.jpg") },
  { id: 4, image: require("../assets/image1.jpg") },
  { id: 5, image: require("../assets/image1.jpg") },
];

const loopedImages = [
  { ...images[images.length - 1], id: "start-clone" },
  ...images,
  { ...images[0], id: "end-clone" },
];

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
    <View style={carouselStyles.carouselContainer}>
      <FlatList
        ref={flatListRef}
        data={loopedImages}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Image source={item.image} style={carouselStyles.carouselImage} />
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
      <View style={carouselStyles.pagination}>
        {images.map((_, i) => (
          <View
            key={i}
            style={[
              carouselStyles.paginationDot,
              currentIndex === i + 1
                ? carouselStyles.activeDot
                : carouselStyles.inactiveDot,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const carouselStyles = StyleSheet.create({
  carouselContainer: {
    height: screenHeight * 0.25,
    width: screenWidth,
  },
  carouselImage: {
    width: screenWidth,
    height: screenHeight * 0.25,
    resizeMode: "cover",
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
});

/* 3) Rating */
const Rating = () => (
  <View style={ratingStyles.ratingBar}>
    <View style={ratingStyles.ratingLeft}>
      <Icon name="star" size={22} color="rgb(248, 68, 100)" />
      <Text style={ratingStyles.ratingText}>8.3/10</Text>
    </View>
    <TouchableOpacity style={ratingStyles.rateButton}>
      <Text style={ratingStyles.rateButtonText}>Rate Now</Text>
    </TouchableOpacity>
  </View>
);

const ratingStyles = StyleSheet.create({
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
});

/* 4) Description */
const Description = ({
  name,
  location,
  description,
}: {
  name: string;
  location: string;
  description: string;
}) => {
  const [expanded, setExpanded] = React.useState(false);

  const fullDescription = description;

  // Helper to truncate text
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, text.lastIndexOf(" ", maxLength));
  };

  return (
    <View style={descriptionStyles.descriptionContainer}>
      <Text style={descriptionStyles.hotelName}>{name}</Text>

      <View style={descriptionStyles.locationRow}>
        <Icon name="location-on" size={18} color="#666" />
        <Text style={descriptionStyles.locationText}>{location}</Text>
      </View>

      <View style={descriptionStyles.typeRow}>
        <View style={descriptionStyles.cuisineContainer}>
          <Icon name="restaurant" size={16} color="#666" />
          <Text style={descriptionStyles.cuisineText}>Multi-Cuisine</Text>
        </View>
        <View style={descriptionStyles.costContainer}>
          <Icon name="payment" size={16} color="#666" />
          <Text style={descriptionStyles.costText}>₹2,500 for two</Text>
        </View>
      </View>

      <View style={descriptionStyles.descriptionBox}>
        <Text style={descriptionStyles.description}>
          {expanded ? (
            fullDescription
          ) : (
            <>
              {truncateText(fullDescription, 100)}
              <Text>... </Text>
              <Text
                onPress={() => setExpanded(true)}
                style={descriptionStyles.readMoreText}>
                more
              </Text>
            </>
          )}
          {expanded && (
            <Text
              onPress={() => setExpanded(false)}
              style={descriptionStyles.readMoreText}>
              {" "}
              less
            </Text>
          )}
        </Text>
      </View>

      <View style={descriptionStyles.facilitiesRow}>
        {[
          { icon: "wifi", label: "Free WiFi" },
          { icon: "local-parking", label: "Parking" },
          { icon: "ac-unit", label: "AC" },
          { icon: "smoke-free", label: "No Smoking" },
        ].map((facility, index) => (
          <View key={index} style={descriptionStyles.facilityItem}>
            <Icon
              name={facility.icon as keyof typeof MaterialIcons.glyphMap}
              size={16}
              color="#666"
            />
            <Text style={descriptionStyles.facilityText}>{facility.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const descriptionStyles = StyleSheet.create({
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
    marginBottom: 8,
  },
  readMoreText: {
    color: "rgb(248, 68, 100)",
    fontSize: 14,
    fontWeight: "500",
  },
});

/* 5) FooterButton */
const FooterButton = ({ title }: { title: string }) => (
  <TouchableOpacity style={footerButtonStyles.footerButton}>
    <Text style={footerButtonStyles.footerButtonText}>{title}</Text>
  </TouchableOpacity>
);

const footerButtonStyles = StyleSheet.create({
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
});

/* --------------------------- MAIN COMPONENT ---------------------------- */
const SearchedRestro = () => {
  const { id } = useLocalSearchParams(); // Get restaurant ID from search params
  const [restro, setRestro] = useState<any>(null); // State to store restaurant details
  const [loading, setLoading] = useState(true); // Loading state for fetching data
  const [error, setError] = useState<string | null>(null); // Error state
  const router = useRouter();

  useEffect(() => {
    const fetchRestroData = async () => {
      try {
        const response = await fetch(
          `http://192.168.1.4:3000/api/restro/${id}`
        );
        const data = await response.json();
        if (response.ok) {
          console.log("Fetched Data:", data);
          setRestro(data.restaurant);
        } else {
          setError(data.error || "Error fetching data");
        }
      } catch (err) {
        console.error("Fetch Error:", err);
        setError("An error occurred while fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchRestroData();
  }, [id]);

  if (loading) {
    return (
      <View style={mainStyles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text style={mainStyles.loadingText}>
          Loading restaurant details...
        </Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={mainStyles.container}>
        <Text style={mainStyles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  if (!restro) {
    return (
      <View style={mainStyles.container}>
        <Text style={mainStyles.errorText}>No restaurant data found!</Text>
      </View>
    );
  }

  // Destructure data from `restro` and store in local variables
  const { name, location, description } = restro;

  // A small OfferCard for the horizontal list
  const OfferCard = () => <View style={mainStyles.offerCard} />;

  return (
    <>
      <StatusBar backgroundColor="transparent" barStyle="dark-content" />
      <View style={mainStyles.container}>
        {/* Header Bar */}
        <View style={mainStyles.header}>
          <Header
            icon="arrow-back-ios"
            onPress={() => {
              router.push("/components/Search/Search");
            }}
          />
          <Text style={mainStyles.headerTitle}>Home</Text>
          <Header icon="share" onPress={() => {}} />
        </View>

        {/* Scroll View containing all the content of the page */}
        <ScrollView>
          <View style={mainStyles.content}>
            {/* Image Carousel */}
            <ImageCarousel />

            {/* Rating Bar */}
            <Rating />

            {/* Pass local variables to Description */}
            <Description
              name={name}
              location={location}
              description={description}
            />

            {/* Offers Section */}
            <View style={mainStyles.offersSection}>
              <Text style={mainStyles.sectionTitle}>Top Offers for you</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {[1, 2, 3, 4, 5].map((_, index) => (
                  <OfferCard key={index} />
                ))}
              </ScrollView>
            </View>

            {/* Regular Images */}
            <Image
              source={require("../assets/image1.jpg")}
              style={mainStyles.regularImage}
            />
            <Image
              source={require("../assets/image2.jpg")}
              style={mainStyles.regularImage}
            />
          </View>
        </ScrollView>

        {/* Footer Section */}
        <View style={mainStyles.footer}>
          <FooterButton title="Menu" />
          <FooterButton title="Book" />
        </View>
      </View>
    </>
  );
};

/* ----------------------------- STYLES (MAIN) ---------------------------- */
const mainStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
  regularImage: {
    width: screenWidth * 0.98,
    height: screenHeight * 0.25,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#000",
  },
  offersSection: {
    height: screenHeight * 0.15,
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
});

/* ----------------------------- EXPORT ----------------------------- */
export default SearchedRestro;
