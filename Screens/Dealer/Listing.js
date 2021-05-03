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
import Card from "../../Component/Card";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const ListingDealer = () => {
  const [dealerdata, setDealerData] = useState([]);
  const ref = firestore().collection("Dealers");
  useEffect(() => {
    ref.get().then((querySnapshot) => {
      const arr = [];
      querySnapshot.forEach((documentSnapshot) => {
        // setData(documentSnapshot.data());
        arr.push(documentSnapshot.data());
      });
      setDealerData(arr);
    });
  }, []);

  const _renderItem = ({ item }) => {
    return (
      <Card
        onPressHandler={() => onPressHandler(item)}
        image={item.images[0]}
        title={item.name}
        subTitle={item.contactInformation[0]}
      />
    );
  };
  const navigation = useNavigation();
  const onPressHandler = (item) => {
    navigation.navigate("DealerDetailScreen", { item });
  };

  return (
    <View>
      <FlatList
        data={dealerdata}
        renderItem={_renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};
export default ListingDealer;
const styles = StyleSheet.create({
  imageSize: {
    width: "100%",
    height: "100%",
  },
  imageHolder: {
    alignSelf: "flex-start",
    height: 200,
    overflow: "hidden",
    width: 100,
  },
});
