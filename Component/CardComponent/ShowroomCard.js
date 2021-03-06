import React, { useEffect, useState } from "react";
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
import { fetchShowroomData } from "../../Data/FetchData";
import ListItemSeparator from "../ItemSeperator/Index";
import { useNavigation } from "@react-navigation/core";
import SkeletonLoader from "../SkeletonPlaceholder/Index";
import DealerHomeCard from "../CardViews/DealerHomeCard";
import { screenHeight, screenWidth } from "../../Global/Dimension";

const ShowroomCard = () => {
  const [showroomData, setShowroomData] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchShowroomData().then((res) => {
      setShowroomData(res.arr);
      setLoading(false);
    });
  }, []);

  const navigation = useNavigation();

  const onPressHandler = (item) => {
    navigation.navigate("ShowroomDetailScreen", { item });
  };
  const _renderItem = ({ item }) => {
    return (
      <DealerHomeCard
        title={item.name}
        price={item.city}
        image={{ uri: item.images[0] }}
        pressHandler={() => onPressHandler(item)}
      />
    );
  };
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        alignContent: "center",
      }}
    >
      <View style={{flexDirection: "row",
          backgroundColor: "#F8F8F8",
          width: "100%",
          paddingBottom: 10,
          paddingTop: 25,
          paddingHorizontal: 20, }}>
        <Text style={styles.heading}>Our Showrooms</Text>
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
            <Text
               style={{ fontSize: 15, color: "#606884",fontFamily:"Roboto-Medium" }}
            >
              {" View All "}
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
    borderWidth: 1,
    borderColor: "#606884",
    borderRadius: 5,
  },
  heading: {
    color: "#333",
    fontSize: 18,
    fontFamily:"Roboto-Bold"
  },
});
