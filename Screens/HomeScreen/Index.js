import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, View } from "react-native";
import { Button } from "../../Component/Button/Index";
import HomeCard from "../../Component/CardComponent/Home";

const HomeScreen = () => {
  const navigation = useNavigation();

  const Logout = async () => {
    try {
      const val = await AsyncStorage.removeItem("user");
      navigation.navigate("LoginScreen");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={{ justifyContent: "center", alignContent: "center" }}>
      <HomeCard />
      <Button title="Test" onLogin={Logout} />
    </View>
  );
};
export default HomeScreen;
