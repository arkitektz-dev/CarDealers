import React, { memo, useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Keyboard,
} from "react-native";
import LottieView from "lottie-react-native";
import IonIcon from "react-native-vector-icons/Ionicons";
import { Image } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { ActivityIndicator } from "react-native-paper";
import firestore from "@react-native-firebase/firestore";

import { SearchComponent } from "../../Component/Search";
import {
  imageChecker,
  screenHeight,
  screenWidth,
} from "../../Global/Dimension";
import {
  fetchDealerData,
  fetchDealerDataGeneral,
  fetchMoreDealer,
  fetchMoreDealerWithSearch,
} from "../../Data/FetchData";

const ListingDealer = ({ data }) => {
  const [filteredData, setfilteredData] = useState([]);
  const [dealerdata, setDealerData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [dealerCount, setDealerCount] = useState(0);
  const [startAfter, setStartAfter] = useState(Object);
  const [moreloading, setMoreLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [datalength, setDatalength] = useState(0);
  const [searchLoadMore, setSearchLoadMore] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchDealerDataGeneral(data.route.params).then((data) => {
      setDealerData(data.arr);
      setfilteredData(data.arr);
      setDatalength(data.arr.length);
      setDealerCount(data.arr.length);
      setLoading(false);
    });
    console.log(data.route.params);
  }, []);
  const searchDealer = async (text) => {
    Keyboard.dismiss();
    if (searchText) {
      setSearchLoadMore(true);
      setLoading(true);

      const arr = [];
      let ref = firestore().collection("Users");

      if (searchText != "") {
        ref = firestore()
          .collection("Users")
          .where("name", ">=", searchText)
          .where("name", "<=", searchText + "\uf8ff");
      }

      var a = await ref.limit(10).get();
      const lastVal = a.docs[a.docs.length - 1];
      console.log("lastV", lastVal);
      setStartAfter(lastVal);
      a.docs.forEach((data) => {
        arr.push(data.data());
      });
      console.log(arr);
      setDealerData(arr);

      setDealerCount(arr.length);

      setLoading(false);
    }
  };
  const _onEndReached = () => {
    setMoreLoading(true);
    if (!searchLoadMore) {
      fetchMoreDealer(startAfter)
        .then((res) => {
          setDealerData([...dealerdata, ...res.arr]);
          if (filteredData.length > 0) {
            setfilteredData([...dealerdata, ...res.arr]);
          }
          setDatalength(res.arr.length);
          setDealerCount(dealerdata.length + res.arr.length);
          setStartAfter(res.lastVal);
          setMoreLoading(false);
        })
        .catch((e) => console.log(e));
    } else {
      fetchMoreDealerWithSearch(startAfter, searchText)
        .then((res) => {
          setDealerData([...dealerdata, ...res.arr]);
          if (filteredData.length > 0) {
            setfilteredData([...dealerdata, ...res.arr]);
          }
          setDatalength(res.arr.length);
          setDealerCount(dealerdata.length + res.arr.length);
          setStartAfter(res.lastVal);
          setMoreLoading(false);
        })
        .catch((e) => console.log(e));
    }
  };
  const _renderFooter = () => {
    return (
      <View
        style={{
          padding: 10,
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          display:'none'
        }}
      >
        <TouchableOpacity style={styles.loadMoreBtn}>
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
      <TouchableOpacity onPress={() => onPressHandler(item)}>
        <View
          style={{
            flexDirection: "column",
            borderBottomWidth: 1,
            borderBottomColor: "#f0f0f0",
            borderStyle: "dotted",
          }}
        >
          <View
            style={{
              left: "5%",
              flexDirection: "row",
            }}
          >
            <View
              style={{
                margin: 5,
                width: screenWidth * 0.28,
                height: screenHeight * 0.17,
              }}
            >
              <Image
                source={{ uri: imageChecker(item.image) }}
                style={styles.imageSize}
                resizeMode={"contain"}
              />
            </View>

            <View style={{ flexDirection: "column", margin: 15, top: 10 }}>
              <Text
                style={{
                  textAlign: "left",
                  color: "#1c2e65",
                  fontSize: 16,
                  fontWeight: "bold",
                }}
              >
                {item?.name}
              </Text>
              <View style={{ height: 10 }}></View>

              <Text
                style={{
                  color: "#565656",
                  fontSize: 14,
                  fontWeight: "800",
                  textAlign: "left",
                }}
              >
                {item?.phone}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );

    // <Card
    //   onPressHandler={() => onPressHandler(item)}
    //   image={item.images[0]}
    //   title={item.name}
    //   subTitle={item.contactInformation[0]}
    // />
    //    );
  };
  const onPressHandler = (item) => {
    navigation.navigate("DealerDetailScreen", { item });
  };
  const navigation = useNavigation();

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
          onSearchPress={searchDealer}
          onChangeHandler={(text) => setSearchText(text)}
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
          ListFooterComponent={_renderFooter}
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
    borderRadius: 10,
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
