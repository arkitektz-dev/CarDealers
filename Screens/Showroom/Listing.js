import React, {useEffect, useState} from "react";
import {
  Dimensions,
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {useNavigation} from "@react-navigation/core";
import firestore from "@react-native-firebase/firestore";
import Card from "../../Component/CardViews/Card";
import {SearchComponent} from "../../Component/Search";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const ListingShowroom = ({route}) => {
  const [showroomdata, setShowroomData] = useState([]);
  const [showroomCount, setshowroomCount] = useState([]);

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
    ref.get().then((querySnapshot) => {
      setshowroomCount(querySnapshot.size);
    });
  }, []);
  const navigation = useNavigation();

  const onPressHandler = (item) => {
    navigation.navigate("ShowroomDetailScreen", {item});
  };
  const _renderItem = ({item}) => {
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
    <View style={{backgroundColor: "#fff"}}>
      <StatusBar hidden={false} animated={true} />
      <View style={styles.searchHolder}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            left: 10,
            top: 10,
            backgroundColor: "#fff",
            width: 35,
            height: 35,
            borderRadius: 35 / 2,
          }}
        ></TouchableOpacity>
        <View style={styles.distance}></View>

        <SearchComponent style={styles.search} />
      </View>
      <View style={{flexDirection: "row", padding: 10}}>
        <Text
          style={{
            color: "#333",
            display: "flex",
            fontWeight: "800",
            fontSize: 18,
          }}
        >
          {showroomCount} Results
        </Text>
      </View>
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
  searchHolder: {
    backgroundColor: "red",
    flexDirection: "row",
    flexGrow: 1,
  },
  search: {
    width: "75%",
    borderRadius: 5,
    maxHeight: "72%",

    alignSelf: "center",
  },
  distance: {
    width: screenWidth * 0.09,
  },
});
