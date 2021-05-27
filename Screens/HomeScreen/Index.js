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

import Drawer from "../../Assets/Drawer.png";
import { SearchComponent } from "../../Component/Search";
import DealerCard from "../../Component/CardComponent/DealersCard";
import ShowroomCard from "../../Component/CardComponent/ShowroomCard";
import CarCard from "../../Component/CardComponent/CarCard";
import { screenHeight } from "../../Global/Dimension";
import { getData } from "../../Data/FetchData";
import Geolocation from "@react-native-community/geolocation";
import Geocoder from "react-native-geocoding";

const HomeScreen = ({ navigation }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [location, setLocation] = useState(null);
  useEffect(() => {
    Geolocation.getCurrentPosition((info) => {
      setLatitude(info.coords.latitude), setLatitude(info.coords.longitude);
    });
    Geocoder.init("AIzaSyBlGABifFjFAm3j5HFQwPHai0PouGUQtbY");
    Geocoder.from(41.89, 12.49)
      .then((json) => {
        console.log(json);
      })
      .catch((error) => console.warn(error));
    getData().then((data) => setUserInfo(data));
    return () => console.log("CleanUp");
  }, []);

  return (
    <ScrollView>
      <View
        style={{
          justifyContent: "center",
          flexDirection: "column",
          flex: 1,
          backgroundColor: "#fff",
          paddingTop: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            paddingLeft: 10,
            paddingRight: 10,
          }}
        >
          <SearchComponent style={styles.search} />
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Image
              source={Drawer}
              style={{ bottom: 7, width: 52, height: 52 }}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: "row",
            backgroundColor: "#f7f7f7",
            flex: 1,
            paddingLeft: 10,
          }}
        >
          <Text style={styles.welcome}>
            Welcome, {userInfo && userInfo.name}
          </Text>
          <View style={{ height: screenHeight * 0.02 }}></View>
        </View>
        <View style={{ flexDirection: "row", paddingLeft: 10 }}>
          <View style={{ backgroundColor: "red", width: 20, borderRadius: 50 }}>
            <Text style={{ color: "red" }}>sd</Text>
          </View>
          <Text style={styles.location}>{longitude}</Text>
        </View>

        <View style={styles.distance}></View>

        <CategoryCard />

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
  },
});
