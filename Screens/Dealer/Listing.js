import React, { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import firestore from "@react-native-firebase/firestore";
import Dealer from "../../Assets/Dealer.png";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const ListingDealer = () => {
  //   const [data, setData] = useState([]);
  const ref = firestore().collection("Dealers");

  //   useEffect(async () => {
  //     await ref.get().then((querySnapshot) => {
  //       querySnapshot.forEach((documentSnapshot) => {
  //         setData(documentSnapshot.data());
  //       });
  //       //   console.log(data.contactInformation[1]);
  //     });
  //   }, []);

  const data = [
    {
      address: "03102324123",
      image: Dealer,
      name: "Home Land",
    },
    {
      address: "03002354122",

      image: Dealer,
      name: "Home Land",
    },
    {
      address: "0329421012",

      image: Dealer,
      name: "Home Land",
    },
    {
      address: "03451234567",

      image: Dealer,
      name: "Home Land",
    },
  ];
  const _renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => onPressHandler(item)}>
        <View
          style={{
            margin: 5,
            backgroundColor: "white",
            borderRadius: 20,
            flexDirection: "column",
          }}
        >
          <View
            style={{
              left: "5%",
            }}
          >
            <Image
              source={item.image}
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
              {item.name}
            </Text>
            <Text
              style={{
                textAlign: "left",
                color: "red",
                fontSize: 14,
                fontWeight: "bold",
              }}
            >
              {item.address}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  const navigation = useNavigation();
  const onPressHandler = (item) => {
    navigation.navigate("DealerDetailScreen", { item });
  };

  return (
    <View>
      <FlatList
        data={data}
        renderItem={_renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};
export default ListingDealer;
const styles = StyleSheet.create({
  imageSize: {
    width: screenWidth * 0.35,
    height: screenHeight * 0.15,
  },
});
