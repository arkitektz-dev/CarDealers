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
import Car from "../../Assets/Car.png";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const ListingShowroom = () => {
  const [data, setData] = useState([]);
  const ref = firestore().collection("Showrooms");
  useEffect(() => {
    ref.get().then((querySnapshot) => {
      console.log("Abc");
      const arr = [];
      querySnapshot.forEach((documentSnapshot) => {
        // setData(documentSnapshot.data());
        arr.push(documentSnapshot.data());
      });
      setData(arr);
    });
  }, []);
  const navigation = useNavigation();
  const onPressHandler = (item) => {
    navigation.navigate("ShowroomDetailScreen", { item });
  };
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
              {item.location}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
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
export default ListingShowroom;
const styles = StyleSheet.create({
  imageSize: {
    width: screenWidth * 0.35,
    height: screenHeight * 0.15,
  },
});
