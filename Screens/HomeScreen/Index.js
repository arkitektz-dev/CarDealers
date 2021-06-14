import React, { memo, useEffect, useState } from "react";
import {
  Image,
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import CategoryCard from "../../Component/CardComponent/CategoryCard";
import DemandCarCard from "../../Component/CardComponent/Demand Car";

import Drawer from "../../Assets/NewAsset/Drawer.png";
import HomeLogo from "../../Assets/NewAsset/homelog.png";
import DealerCard from "../../Component/CardComponent/DealersCard";
import ShowroomCard from "../../Component/CardComponent/ShowroomCard";
import CarCard from "../../Component/CardComponent/CarCard";
import { screenHeight } from "../../Global/Dimension";
import { getData } from "../../Data/FetchData";
import NavHome from "../../Component/HomeNav";

const HomeScreen = ({ navigation }) => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    getData().then((data) => setUserInfo(data));
  }, []);

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
        <NavHome
          leftComponent={
            <TouchableOpacity
              style={{
                flex: 1,
                width: 47,
              }}
              onPress={() => navigation.openDrawer()}
            >
              <Image
                source={Drawer}
                style={{
                  width: 23,
                  height: 21,
                  top: 10,
                  left: 7,
                  alignSelf: "flex-start",
                  resizeMode: "contain",
                }}
              />
            </TouchableOpacity>
          }
          centerComponent={
            <Image source={HomeLogo} style={styles.logo} resizeMode="contain" />
          }
        />

        <View style={styles.distance}></View>

        <CategoryCard />

        <View style={styles.distance}></View>
        <DemandCarCard />
        <View style={styles.distance}></View>

        <CarCard />

        <View style={styles.distance}></View>

        <DealerCard />
        <View style={styles.distance}></View>

        <ShowroomCard />
      </View>
    </ScrollView>
  );
};
export default memo(HomeScreen);
const styles = StyleSheet.create({
  border: {
    borderColor: "red",
    borderWidth: 2,
    right: "13%",
  },
  logo: {
    width: 170,
    height: 40,
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
  search: {
    width: "100%",
    borderRadius: 20,
    maxHeight: "72%",

    shadowColor: "#470000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    elevation: 6,
    textAlignVertical: "center",
  },
});
