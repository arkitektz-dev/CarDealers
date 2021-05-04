import React, {useEffect, useState} from "react";
import firestore from "@react-native-firebase/firestore";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import ListItemSeparator from "../ItemSeperator/Index";
import {useNavigation} from "@react-navigation/core";
import SkeletonLoader from "../SkeletonPlaceholder/Index";
import HomeCard from "../CardViews/HomeProductListCard";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const ShowroomCard = () => {
  const [showroomData, setShowroomData] = useState();
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    const ref = firestore().collection("Showrooms");

    setLoading(true);
    await ref.get().then((querySnapshot) => {
      const arr = [];
      querySnapshot.forEach((documentSnapshot) => {
        arr.push(documentSnapshot.data());
      });
      setShowroomData(arr);
    });
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const navigation = useNavigation();

  const onPressHandler = (item) => {
    navigation.navigate("ShowroomDetailScreen", {item});
  };
  const _renderItem = ({item}) => {
    return (
      <HomeCard
        title={item.name}
        subtitle={item.location}
        image={{uri: item.images[0]}}
        pressHandler={() => onPressHandler(item)}
      />
    );
  };
  return (
    <View style={{flex: 1, flexDirection: "column", alignContent: "center"}}>
      <View style={{flexDirection: "row", marginBottom: 15}}>
        <Text style={styles.heading}> SHOWROOM DEALERS</Text>
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            justifyContent: "flex-end",
          }}
        >
          <TouchableOpacity
            style={styles.border}
            onPress={() =>
              navigation.navigate("ShowroomStack", {
                showroomData,
              })
            }
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
