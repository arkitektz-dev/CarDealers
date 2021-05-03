import AsyncStorage from "@react-native-async-storage/async-storage";
import firestore from "@react-native-firebase/firestore";
import React, { useEffect, useState } from "react";
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
import CategoryCard from "../../Component/CardComponent/CategoryCard";

import BellIcon from "../../Assets/BellIcon.png";
import Drawer from "../../Assets/Drawer.png";
import { SearchComponent } from "../../Component/Search";
import DealerCard from "../../Component/CardComponent/DealersCard";
import { TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import ShowroomCard from "../../Component/CardComponent/ShowroomCard";
import CarCard from "../../Component/CardComponent/CarCard";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const HomeScreen = ({ navigation }) => {
  const [confirm, setConfirm] = useState(null);
  const [code, setCode] = useState("");
  const [data, setData] = useState([]);
  const Logout = async () => {
    navigation.navigate("Login");
    // try {
    //   const val = await AsyncStorage.removeItem("user");
    //   navigation.navigate("LoginScreen");
    // } catch (error) {
  };

  return (
    <ScrollView>
      <View
        style={{
          justifyContent: "center",
          flexDirection: "column",
          flex: 1,
          backgroundColor: "#fff",
        }}
      >
        <View style={styles.distance}></View>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flexDirection: "column" }}>
            <Text style={styles.welcome}> Hi, Jon Herry</Text>
            <Text style={styles.location}> Karachi, Pakistan</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              flex: 1,
              justifyContent: "flex-end",
              bottom: "10%",
            }}
          >
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Image
                source={Drawer}
                resizeMode="contain"
                style={{
                  width: 60,
                  height: 60,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.distance}></View>

        <SearchComponent image={BellIcon} />

        <View style={styles.distance}></View>
        <CategoryCard />

        <View style={styles.distance}></View>

        <CarCard />

        <View style={styles.distance}></View>

        <DealerCard />
        <View style={styles.distance}></View>

        <ShowroomCard />

        {/* <Button title="Logout" onLogin={Logout} /> */}
      </View>
    </ScrollView>
  );
};
export default HomeScreen;
const styles = StyleSheet.create({
  border: {
    borderColor: "red",
    borderWidth: 2,
    right: "13%",
  },
  distance: {
    height: screenHeight * 0.035,
  },
  heading: {
    color: "#565656",
    fontSize: 20,
    fontWeight: "bold",
    left: "5%",
  },
  welcome: {
    color: "#565656",
    fontSize: 25,
    fontWeight: "bold",
  },
  location: {
    color: "#565656",
    fontSize: 16,
    fontWeight: "bold",
  },
});
