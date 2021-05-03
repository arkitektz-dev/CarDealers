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
import Card from "../../Component/Card";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const ListingShowroom = ({ route }) => {
  const [showroomdata, setShowroomData] = useState([]);
  const ref = firestore().collection("Showrooms");
  useEffect(() => {
    ref.get().then((querySnapshot) => {
      const arr = [];
      querySnapshot.forEach((documentSnapshot) => {
        // setData(documentSnapshot.data());
        arr.push(documentSnapshot.data());
      });
      setShowroomData(arr);
    });
  }, []);
  const navigation = useNavigation();

  const onPressHandler = (item) => {
    navigation.navigate("ShowroomDetailScreen", { item });
  };
  const _renderItem = ({ item }) => {
    return (
      <Card
        onPressHandler={() => onPressHandler(item)}
        image={item.images[0]}
        title={item.name}
        subTitle={item.location}
      />
    );
  };
  return (
    <View>
      <FlatList
        data={showroomdata}
        renderItem={_renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};
export default ListingShowroom;
const styles = StyleSheet.create({
  imageSize: {
    borderRadius: 15,
    backgroundColor: "white",
    marginBottom: 20,
    overflow: "hidden",
  },
  imageHolder: {
    alignSelf: "flex-start",
    height: 200,
    overflow: "hidden",
    width: 400,
  },
});
