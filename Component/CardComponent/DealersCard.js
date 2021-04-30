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

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const DealerCard = () => {
  const [dealerData, setDealerData] = useState([]);
  const arr = [];
  const fetchData = async () => {
    const ref = firestore().collection("Dealers");
    await ref.get().then((querySnapshot) => {
      querySnapshot.forEach((documentSnapshot) => {
        arr.push(documentSnapshot.data());
      });
      setDealerData(arr);
    });
  };
  useEffect(() => {
    fetchData();
  }, []);

  const navigation = useNavigation();

  const onPressHandler = (item) => {
    navigation.navigate("DealerDetailScreen", {item});
  };
  const _renderItem = ({item}) => {
    return (
      <TouchableOpacity onPress={() => onPressHandler(item)}>
        <View
          style={{
            justifyContent: "space-between",
            left: "10%",
          }}
        >
          <Image
            source={{uri: item.images[0]}}
            style={styles.imageSize}
            resizeMode="contain"
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
              color: "#565656",
              fontSize: 14,
              fontWeight: "bold",
            }}
          >
            {item.contactInformation[0]}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={{flex: 1, flexDirection: "column", alignContent: "center"}}>
      <TouchableOpacity
        onPress={() => navigation.navigate("DealerStack")}
        style={{flexDirection: "row"}}
      >
        <Text style={styles.heading}> FEATURED DEALERS</Text>
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
      <FlatList
        ItemSeparatorComponent={ListItemSeparator}
        data={dealerData}
        renderItem={_renderItem}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default DealerCard;
const styles = StyleSheet.create({
  imageSize: {
    width: screenWidth * 0.5,
    height: screenHeight * 0.15,
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
