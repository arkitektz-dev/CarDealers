import React, {useEffect, useState} from "react";
import firestore from "@react-native-firebase/firestore";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ListItemSeparator from "../ItemSeperator/Index";
import {Dimensions} from "react-native";
import {useNavigation} from "@react-navigation/core";
import {set} from "react-native-reanimated";
import SkeletonLoader from "../SkeletonPlaceholder/Index";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const ShowroomCard = () => {
  const [showroomData, setShowroomData] = useState();
  const [loading, setLoading] = useState(false);

  const ref = firestore().collection("Showrooms");

  useEffect(() => {
    setLoading(true);
    ref.get().then((querySnapshot) => {
      const arr = [];
      querySnapshot.forEach((documentSnapshot) => {
        // setData(documentSnapshot.data());
        arr.push(documentSnapshot.data());
      });
      setShowroomData(arr);
      setLoading(false);
    });
  }, []);

  const navigation = useNavigation();

  const onPressHandler = (item) => {
    navigation.navigate("ShowroomDetailScreen", {item});
  };
  const _renderItem = ({item}) => {
    return (
      <TouchableOpacity onPress={() => onPressHandler(item)}>
        <View style={{justifyContent: "space-between", left: "10%"}}>
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
              color: "#565656",
              fontSize: 14,
              fontWeight: "bold",
            }}
          >
            {item.location}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={{flex: 1, flexDirection: "column", alignContent: "center"}}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("ShowroomStack", {
            showroomData,
          })
        }
        style={{flexDirection: "row", marginBottom: 15}}
      >
        <Text style={styles.heading}> SHOWROOM DEALERS</Text>
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            justifyContent: "flex-end",
          }}
        >
          <View style={styles.border}>
            <Text style={{fontSize: 15, fontWeight: "bold", color: "red"}}>
              {" View More "}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      {loading ? (
        <SkeletonLoader />
      ) : (
        <FlatList
          ItemSeparatorComponent={ListItemSeparator}
          data={showroomData}
          renderItem={_renderItem}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </View>
  );
};

export default ShowroomCard;
const styles = StyleSheet.create({
  imageSize: {
    width: screenWidth * 0.48,
    height: screenHeight * 0.1,
  },
  border: {
    borderColor: "red",
    borderWidth: 2,
    right: "13%",
  },
  heading: {
    color: "#565656",
    fontSize: 20,
    fontWeight: "bold",
    left: "5%",
  },
});
