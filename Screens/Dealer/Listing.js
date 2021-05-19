import React, { useEffect, useState } from "react";
import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import Card from "../../Component/CardViews/Card";
import { SearchComponent } from "../../Component/Search";
import { ActivityIndicator } from "react-native-paper";
import { screenWidth } from "../../Global/Dimension";
import { fetchDealerData } from "../../Data/FetchData";

const ListingDealer = () => {
  const [dealerdata, setDealerData] = useState([]);
  const [dealerCount, setDealerCount] = useState(0);
  const [filteredData, setfilteredData] = useState([]);

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    fetchDealerData().then((data) => {
      setDealerData(data.arr);
      setfilteredData(data.arr);
      setDealerCount(data.size);
      setLoading(false);
    });
  }, []);
  const searchDealer = (text) => {
    if (text) {
      const newData = dealerdata.filter((item) => {
        return (
          item.contactInformation[0].toLowerCase(text).indexOf(text) >= 0 ||
          item.name.toLowerCase(text).indexOf(text) >= 0
        );
      });

      setDealerData(newData);
    } else {
      setDealerData(filteredData);
    }
  };
  const _renderItem = ({ item }) => {
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
    navigation.navigate("DealerDetailScreen", { item });
  };

  return (
    <View style={{ backgroundColor: "#fff" }}>
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

        <SearchComponent
          style={styles.search}
          onChangeHandler={(text) => searchDealer(text)}
        />
      </View>
      <View style={{ flexDirection: "row", padding: 10 }}>
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
          contentContainerStyle={{ paddingBottom: "30%" }}
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
