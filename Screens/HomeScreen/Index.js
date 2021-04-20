import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import firebase from "firebase";
import auth from "@react-native-firebase/auth";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  StatusBar,
  Text,
  TextInput,
  View,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Button } from "../../Component/Button/Index";
import Card from "../../Component/CardComponent/Card";
import CategoryCard from "../../Component/CardComponent/CategoryCard";

import BellIcon from "../../Assets/BellIcon.png";
import Drawer from "../../Assets/Drawer.png";
import { SearchComponent } from "../../Component/Search";
import DealerCard from "../../Component/CardComponent/DealersCard";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const HomeScreen = () => {
  const navigation = useNavigation();
  const [confirm, setConfirm] = useState(null);
  const [code, setCode] = useState("");
  const Logout = async () => {
    navigation.navigate("Login");
    // try {
    //   const val = await AsyncStorage.removeItem("user");
    //   navigation.navigate("LoginScreen");
    // } catch (error) {
    //   console.log(error);
  };

  return (
    <View
      style={{
        justifyContent: "center",
        flexDirection: "column",
        flex: 1,
      }}
    >
      <View style={styles.distance}></View>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.welcome}> Hi, Jon Herry</Text>
        <View
          style={{
            backgroundColor: "yellow",
          }}
        >
          <Image
            source={Drawer}
            resizeMode="contain"
            style={{
              width: 60,
              height: 60,
            }}
          />
        </View>
      </View>
      <View style={styles.distance}></View>

      <SearchComponent />
      <View style={styles.distance}></View>

      <CategoryCard />
      <View style={styles.distance}></View>
      <Text style={styles.heading}> FEATURED CARS</Text>
      <Card />
      <View style={styles.distance}></View>
      <Text style={styles.heading}> FEATURED DEALERS</Text>
      <DealerCard />
      <Button title="Logout" onLogin={Logout} />
    </View>
  );
};
export default HomeScreen;
const styles = StyleSheet.create({
  distance: {
    height: screenHeight * 0.02,
  },
  heading: {
    color: "#565656",
    fontSize: 20,
    fontWeight: "bold",
  },
  welcome: {
    color: "#565656",
    fontSize: 25,
    fontWeight: "bold",
  },
});
