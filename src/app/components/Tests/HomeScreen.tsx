// app/HomeScreen.js
import React, { useState } from "react";
import { View, Button, TextInput } from "react-native";
import { useRouter } from "expo-router";
import { useDataContext } from "./DataContext";

const HomeScreen = () => {
  const [inputData, setInputData] = useState("");
  const { setData } = useDataContext();
  const router = useRouter();

  const handleNavigate = () => {
    // Store data in context instead of query
    setData(inputData);
    router.push("./components/Tests/DetailsScreen");
  };

  return (
    <View>
      <TextInput
        value={inputData}
        onChangeText={setInputData}
        placeholder="Enter some data"
      />
      <Button title="Go to Details" onPress={handleNavigate} />
    </View>
  );
};

export default HomeScreen;
