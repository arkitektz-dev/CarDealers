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
import Dealer from "../../Assets/Dealer.png";
import Card from "../../Component/CardViews/Card";
import {SearchComponent} from "../../Component/Search";
import {ActivityIndicator} from "react-native-paper";
import { screenWidth } from "../../Global/Dimension";

const ListingDealer = () => {
  const [dealerdata, setDealerData] = useState([]);
  const [dealerCount, setDealerCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const ref = firestore().collection("Dealers");
  useEffect(() => {
    setLoading(true);
    ref.get().then((querySnapshot) => {
      const arr = [];
      querySnapshot.forEach((documentSnapshot) => {
        arr.push(documentSnapshot.data());
      });
      setDealerData(arr);
      ref.get().then((querySnapshot) => {
        setDealerCount(querySnapshot.size);
        setLoading(false);
      });
    });
  }, []);

  const _renderItem = ({item}) => {
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
    navigation.navigate("DealerDetailScreen", {item});
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
          {dealerCount} Results
        </Text>
      </View>
      {loading ? (
        <ActivityIndicator color="red" size="small" />
      ) : (
        <FlatList
          contentContainerStyle={{paddingBottom: "30%"}}
          data={dealerdata}
          renderItem={_renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
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
  searchHolder: {
    backgroundColor: "red",
    flexDirection: "row",
    flexGrow: 1,
  },
  search: {
    width: "75%",
    textAlign: "left",
    borderRadius: 5,
    maxHeight: "72%",

    alignSelf: "center",
  },
  distance: {
    width: screenWidth * 0.09,
  },
});
