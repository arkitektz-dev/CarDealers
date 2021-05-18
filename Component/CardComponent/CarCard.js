import React, {useEffect, useState} from "react";
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
import SkeletonLoader from "../SkeletonPlaceholder/Index";
import ListItemSeparator from "../ItemSeperator/Index";
import {useNavigation} from "@react-navigation/core";
import firestore from "@react-native-firebase/firestore";
import HomeCard from "../CardViews/HomeProductListCard";
import { screenHeight, screenWidth } from "../../Global/Dimension";

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
      setDataCar(arr)
      });
      console.log(dataCar)
          });
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const navigation = useNavigation();
  const onPressHandler = (item) => {
    navigation.navigate("DetailCarScreen", {item});
  };
  const _renderItem = ({item}) => {
    return (
      <HomeCard  title={`${item.vehicle.information.make+" "+item.vehicle.information.model+" "+item.vehicle.information.modelYear} `}  
      price= {`${item.amount}`}
      subtitle={`${item.vehicle.city+" "+item.vehicle.mileage+" "+item.vehicle.additionalInformation.engineType} `} 
      image={{uri: item.images[0]}}
      pressHandler={() => onPressHandler(item)} />
       
    );
  };

  return (
    <View style={{flex: 1, flexDirection: "column", alignContent: "center"}}>
      <View style={{flexDirection: "row", marginBottom: 15}}>
        <Text style={styles.heading}> FEATURED CARS</Text>
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            justifyContent: "flex-end",
          }}
        >
          <TouchableOpacity
            style={styles.border}
            onPress={() => navigation.navigate("CarStack")}
          >
            <Text style={{fontSize: 15, fontWeight: "bold", color: "red"}}>
              {" View More "}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
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
    fontSize: 16,
    fontWeight: "bold",
    left: "5%",
  },
  border: {
    borderColor: "red",
    borderWidth: 2,
    right: "13%",
  },
});
