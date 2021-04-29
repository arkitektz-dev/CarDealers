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
import { Button } from "../../Component/Button/Index";
import Card from "../../Component/CardComponent/Card";
import CategoryCard from "../../Component/CardComponent/CategoryCard";

import BellIcon from "../../Assets/BellIcon.png";
import Drawer from "../../Assets/Drawer.png";
import { SearchComponent } from "../../Component/Search";
import DealerCard from "../../Component/CardComponent/DealersCard";
import { TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import ShowroomCard from "../../Component/CardComponent/ShowroomCard";

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
    //   console.log(error);
  };
  const arr = [];

  // const fetchData = async () => {
  //   const ref = firestore().collection("Advertisments");
  //   // ref.get().then((querySnapshot) => {
  //   //   querySnapshot.forEach((documentSnapshot) => {
  //   //     arr.push(documentSnapshot.data());
  //   //   });
  //   await ref.onSnapshot((querySnapshot) => {
  //     arr.push(querySnapshot.docs);
  //     setData(arr);
  //   });
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  arr.forEach((element) => {
    console.log(element);
  });
  return (
    <ScrollView>
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

        <SearchComponent />

        <View style={styles.distance}></View>
        <CategoryCard />

        <View style={styles.distance}></View>
        <TouchableOpacity
          style={{ flexDirection: "row" }}
          onPress={() => navigation.navigate("CarStack")}
        >
          <Text style={styles.heading}> FEATURED CARS</Text>
          <View
            style={{
              flexDirection: "row",
              flex: 1,
              justifyContent: "flex-end",
            }}
          >
            <View style={styles.border}>
              <Text style={{ fontSize: 15, fontWeight: "bold", color: "red" }}>
                {" View More "}
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        <Card />

        <View style={styles.distance}></View>
        <TouchableOpacity
          onPress={() => navigation.navigate("DealerStack")}
          style={{ flexDirection: "row" }}
        >
          <Text style={styles.heading}> FEATURED DEALERS</Text>
          <View
            style={{
              flexDirection: "row",
              flex: 1,
              justifyContent: "flex-end",
            }}
          >
            <View style={styles.border}>
              <Text style={{ fontSize: 15, fontWeight: "bold", color: "red" }}>
                {" View More "}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <DealerCard />
        <View style={styles.distance}></View>
        <TouchableOpacity
          onPress={() => navigation.navigate("ShowroomStack")}
          style={{ flexDirection: "row" }}
        >
          <Text style={styles.heading}> SHOWROOM DEALERS</Text>
          <View
            style={{
              flexDirection: "row",
              flex: 1,
              justifyContent: "flex-end",
            }}
          >
            <View style={styles.border}>
              <Text style={{ fontSize: 15, fontWeight: "bold", color: "red" }}>
                {" View More "}
              </Text>
            </View>
          </View>
        </TouchableOpacity>

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
    height: screenHeight * 0.02,
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
});
