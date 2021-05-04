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
            backgroundColor: "#fff",
            width: 20,
            borderRadius: 10,
          }}
        >
          <Text style={{color: "#fff"}}>sd</Text>
        </TouchableOpacity>
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
          Results
        </Text>
      </View>
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
