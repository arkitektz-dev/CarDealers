import React, { useEffect, useState } from "react";
import Car from "../../Assets/Car.png";
import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions,
} from "react-native";
import ListItemSeparator from "../ItemSeperator/Index";
import { useNavigation } from "@react-navigation/core";
import firestore from "@react-native-firebase/firestore";
import SkeletonLoader from "../SkeletonPlaceholder/Index";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const Card = () => {
  const [dataCar, setDataCar] = useState([]);
  const [loading, setLoading] = useState(false);
  const arr = [];

  const fetchData = async () => {
    setLoading(true);
    const ref = firestore().collection("Advertisments");
    await ref.get().then((querySnapshot) => {
      querySnapshot.forEach((documentSnapshot) => {
        arr.push(documentSnapshot.data());
      });
      setDataCar(arr);
    });
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const navigation = useNavigation();
  const onPressHandler = (item) => {
    navigation.navigate("DetailCarScreen", { item });
  };
  const _renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => onPressHandler(item)}>
        <View style={{ justifyContent: "space-between", left: "10%" }}>
          <Image
            source={{ uri: item.images[0] }}
            style={styles.imageSize}
            resizeMode={"contain"}
          />

          <Text
            style={{
              textAlign: "left",
              color: "#565656",
              fontSize: 14,
              fontWeight: "bold",
            }}
          >
            {item.vehicle.information.make}
            {""}
            {item.vehicle.information.model}
            {"\b"}
            {item.vehicle.information.modelYear}
          </Text>

          <Text
            style={{
              color: "#565656",
              fontSize: 10,
              fontWeight: "800",
              textAlign: "left",
            }}
          >
            {item.vehicle.city} | {item.vehicle.mileage} | {""}
            {item.vehicle.additionalInformation.engineType}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  //
  return (
    <View style={{ flex: 1, flexDirection: "column", alignContent: "center" }}>
      <TouchableOpacity
        style={{ flexDirection: "row", marginBottom: 15 }}
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
      {loading ? (
        <SkeletonLoader />
      ) : (
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={ListItemSeparator}
          data={dataCar}
          renderItem={_renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </View>
  );
};

export default Card;
const styles = StyleSheet.create({
  imageSize: {
    width: screenWidth * 0.5,
    height: screenHeight * 0.15,
  },
  heading: {
    color: "#565656",
    fontSize: 20,
    fontWeight: "bold",
    left: "5%",
  },
  border: {
    borderColor: "red",
    borderWidth: 2,
    right: "13%",
  },
});
