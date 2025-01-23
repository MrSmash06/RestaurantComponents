import React from "react";
import {
  StatusBar,
  View,
  Text,
  Dimensions,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";

// imports of components
import Header from "./Header";
import Rating from "./Rating";
import ImageCarousel from "./ImageCarousel";
import Description from "./Description";
import FooterButton from "./FooterButton";

const { height: screenHeight, width: screenWidth } = Dimensions.get("window");

const OfferCard = () => <View style={styles.offerCard} />;

const HomePage = () => {
  return (
    <>
      <StatusBar backgroundColor="transparent" barStyle="dark-content" />
      <View style={styles.container}>
        {/* Header Bar Including Hotel Name and Share Button etc... */}
        <View style={styles.header}>
          <Header icon="arrow-back-ios" onPress={() => {}} />
          <Text style={styles.headerTitle}>Home</Text>
          <Header icon="share" onPress={() => {}} />
        </View>

        {/* Scroll View containing all the content of the page */}
        <ScrollView>
          <View style={styles.content}>
            {/* Image Carousel */}
            <ImageCarousel />

            {/* Rating Bar */}
            <Rating />

            {/* Description */}
            <Description name={restro.name} description={restro.description} />

            {/* Offers Section */}
            <View style={styles.offersSection}>
              <Text style={styles.sectionTitle}>Top Offers for you</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {[1, 2, 3, 4, 5].map((_, index) => (
                  <OfferCard key={index} />
                ))}
              </ScrollView>
            </View>

            {/* Regular Images */}
            <Image
              source={require("../assets/image1.jpg")}
              style={styles.regularImage}
            />
            <Image
              source={require("../assets/image2.jpg")}
              style={styles.regularImage}
            />
          </View>
        </ScrollView>

        {/* Footer Section */}
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

export default HomePage;
