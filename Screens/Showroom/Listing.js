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
import Car from "../../Assets/Car.png";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const ListingShowroom = ({route}) => {
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
    navigation.navigate("ShowroomDetailScreen", {item});
  };
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
            <View style={styles.imageHolder}>
              <Image
                source={{uri: item.images[0]}}
                style={styles.imageSize}
                resizeMode={"contain"}
              />
            </View>
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
