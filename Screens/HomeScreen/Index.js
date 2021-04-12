import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { FlatList, Image, StatusBar, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Searchbar } from "react-native-paper";
import { Button } from "../../Component/Button/Index";
import Card from "../../Component/CardComponent/Card";
import CategoryCard from "../../Component/CardComponent/CategoryCard";

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
    <View
      style={{
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Searchbar style={{ width: "80%", borderRadius: 20 }} />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          backgroundColor: "black",
        }}
      >
        <CategoryCard />
      </View>
      <Card />

      <Button title="Logout" onLogin={Logout} />
    </View>
  );
};
export default HomeScreen;
