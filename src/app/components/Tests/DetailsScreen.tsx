// app/details.js
import React from "react";
import { View, Text } from "react-native";
import { useDataContext } from "./DataContext";

const DetailsScreen = () => {
  const { data } = useDataContext();

  return (
    <View>
      <Text>Details Screen</Text>
      <Text>Received Data: {data}</Text>
    </View>
  );
};

export default DetailsScreen;
