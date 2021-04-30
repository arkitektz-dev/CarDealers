import React, {useEffect, useState} from "react";
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {useNavigation} from "@react-navigation/core";
import firestore from "@react-native-firebase/firestore";
import Dealer from "../../Assets/Dealer.png";
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

  const _renderItem = ({item}) => {
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
              source={{uri: item.images[0]}}
              style={styles.imageSize}
              resizeMode={"contain"}
            />
            <Text
              style={{
                width: screenWidth * 0.3,
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
                width: screenWidth * 0.3,
                textAlign: "left",
                color: "red",
                fontSize: 14,
                fontWeight: "bold",
              }}
            >
              {item.contactInformation[0]}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  const navigation = useNavigation();
  const onPressHandler = (item) => {
    navigation.navigate("DealerDetailScreen", {item});
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
