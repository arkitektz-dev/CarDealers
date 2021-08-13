import React, { memo, useEffect, useState } from "react";
import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import LottieView from "lottie-react-native";

import IonIcon from "react-native-vector-icons/Ionicons";

import { useNavigation } from "@react-navigation/core";
import Card from "../../Component/CardViews/Card";
import { SearchComponent } from "../../Component/Search";
import { ActivityIndicator } from "react-native-paper";
import { screenWidth } from "../../Global/Dimension";
import { fetchDealerData, fetchMoreDealer } from "../../Data/FetchData";

const ListingDealer = () => {
  const [dealerdata, setDealerData] = useState([]);
  const [dealerCount, setDealerCount] = useState(0);
  const [startAfter, setStartAfter] = useState(Object);
  const [filteredData, setfilteredData] = useState([]);
  const [moreloading, setMoreLoading] = useState(false);

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    fetchDealerData().then((data) => {
      setStartAfter(data.lastVal);
      setDealerData(data.arr);
      setfilteredData(data.arr);
      setDealerCount(data.size);
      setLoading(false);
    });
  }, []);

  const searchDealer = (text) => {
    if (text) {
      const newData = dealerdata.filter((item) => {
        const itemData = `${
          item.contactInformation.length > 0
            ? item.contactInformation[0].toUpperCase()
            : item.contactInformation[0]
        }   
         ${item.name ? item.name.toUpperCase() : ""}`;
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setDealerData(newData);
      if (newData.length > 0) {
        setDealerCount(newData.length);
      }
    } else {
      setDealerCount(filteredData.length);
      setDealerData(filteredData);
    }
  };
  const _onEndReached = () => {
    setMoreLoading(true);
    fetchMoreDealer(startAfter)
      .then((res) => {
        setDealerData([...dealerdata, ...res.arr]);
        if (filteredData.length > 0) {
          setfilteredData([...dealerdata, ...res.arr]);
        }
        setDealerCount(dealerdata.length + res.arr.length);
        setStartAfter(res.lastVal);
        setMoreLoading(false);
      })
      .catch((e) => console.log(e));
  };
  const _renderFooter = () => {
    return (
      <View
        style={{
          padding: 10,
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <TouchableOpacity onPress={_onEndReached} style={styles.loadMoreBtn}>
          <Text style={styles.btnText}>Load More</Text>
          {moreloading ? (
            <ActivityIndicator color="#1c2e65" style={{ marginLeft: 8 }} />
          ) : null}
        </TouchableOpacity>
      </View>
    );
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
    <View style={{ backgroundColor: "#fff", flex: 1, flexDirection: "column" }}>
      <View style={styles.searchHolder}>
        <IonIcon
          style={{ margin: 10 }}
          name="chevron-back-circle-sharp"
          color="white"
          size={35}
          onPress={() => navigation.goBack()}
        />

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
        <LottieView
          source={require("../../Assets/CarLoader.json")}
          autoPlay
          resizeMode="contain"
          style={{
            alignSelf: "center",
            width: 140,
            height: 140,
          }}
          hardwareAccelerationAndroid={true}
        />
      ) : (
        <FlatList
          ListFooterComponent={filteredData.length > 0 ? _renderFooter : null}
          contentContainerStyle={{ paddingBottom: "10%" }}
          data={dealerdata}
          renderItem={_renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </View>
  );
};
export default memo(ListingDealer);
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
    backgroundColor: "#1c2e65",
    flexDirection: "row",
  },
  search: {
    width: "75%",
    textAlign: "left",
    borderRadius: 5,
    maxHeight: "72%",
    textAlignVertical: "center",

    alignSelf: "center",
  },
  loadMoreBtn: {
    padding: 10,
    borderColor: "#1c2e65",
    borderWidth: 1,
    borderRadius: 4,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  distance: {
    width: screenWidth * 0.09,
  },
});
