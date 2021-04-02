import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { Text, View } from "react-native";
import { Button } from "../../Component/Button/Index";

const HomeScreen = () => {
  const Logout = async () => {
    try {
      const val = await AsyncStorage.removeItem("user");
      console.log(val);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={{ justifyContent: "center", alignContent: "center" }}>
      <Button title="Test" onLogin={Logout} />
    </View>
  );
};
export default HomeScreen;
