import React, { memo, useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";

import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import IonIcon from "react-native-vector-icons/Ionicons";

import LottieView from "lottie-react-native";

import { useNavigation } from "@react-navigation/core";
import {
  fetchCarData,
  fetchDealerCar,
  fetchMoreCar,
  getData,
} from "../../Data/FetchData";
import { SearchComponent } from "../../Component/Search";
import Filter from "../../Component/Search/Fliter";
import { screenHeight, screenWidth } from "../../Global/Dimension";
import { RefreshControl } from "react-native";
import changeNumberFormat from "../../Component/Converter";

const MyDemandListing = () => {
  const [dataCar, setDataCar] = useState([]);
  const [carCount, setcarCount] = useState(0);
  const [filteredData, setfilteredData] = useState([]);
  const [search, setSearch] = useState([]);
  const [shown, setShown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [moreloading, setMoreLoading] = useState(false);
  const [startAfter, setStartAfter] = useState(Object);
  const [noData, setNoData] = useState(false);
  var value;
  const adArr = [];
  const navigation = useNavigation();

  const convertData = async () => {
    value = await getData().then((res) => res.DealerId);
  };

  const compare = async () => {
    const ref = firestore().collection("Demand");
    await ref.get().then((querySnapshot) => {
      querySnapshot.forEach((documentSnapshot) => {
        let dealerId;
        if (typeof documentSnapshot.data().Dealer.id == "string") {
          dealerId = documentSnapshot.data().Dealer.id.split("/")[1];
        } else {
          dealerId = documentSnapshot
            .data()
            .Dealer.id.id.toString()
            .trim();
        }

        const paramdealerId = value;

        if (dealerId == paramdealerId) {
          console.log(documentSnapshot.data(), "Data");
          adArr.push(documentSnapshot.data());
        }
      });
      setDataCar(adArr);
      setcarCount(adArr.length);
      // setfilteredData(adArr);
    });
  };
  useEffect(() => {
    setLoading(true);
    convertData();
    compare();
    setLoading(false);
  }, []);

  const onSearch = (text) => {
    if (text) {
      const newData = dataCar.filter((item) => {
        const itemData = `${item.Make.toUpperCase()}
        ${item.Year.toUpperCase()} ${item.Model.toUpperCase()}`;
        const textData = text.toUpperCase();

        return itemData.indexOf(textData) > -1;
      });

      setfilteredData(newData);
    } else {
      setfilteredData(dataCar);
    }
  };

  const onFilter = async (dropdownValues) => {
    const arr = [];
    let ref = firestore().collection("Demand");

    if (dropdownValues.Make != "") {
      ref = ref.where("Make", "==", dropdownValues.Make);
    }

    if (dropdownValues.Year != "") {
      ref = ref.where("Year", "==", dropdownValues.Year);
    }

    if (dropdownValues.price.init > 0) {
      ref = ref.where("amount", ">", `${dropdownValues.price.init}`);
      ref = ref.where("amount", "<", `${dropdownValues.price.final}`);
    }
    // if (dropdownValues.City != "") {
    //   ref = ref.where("vehicle.city", "==", dropdownValues.City);
    // }
    // if (dropdownValues.ExteriorColor != "") {
    //   ref = ref.where(
    //     "vehicle.exteriorColor",
    //     "==",
    //     dropdownValues.ExteriorColor
    //   );
    // }
    // if (dropdownValues.Assemble != "") {
    //   ref = ref.where(
    //     "vehicle.additionalInformation.assembly",
    //     "==",
    //     "imported"
    //   );
    // }

    var a = await ref.get();
    a.docs.forEach((data) => {
      arr.push(data.data());
    });
    setfilteredData(arr);
    {
      filteredData.length > 0
        ? setcarCount(arr.length)
        : setcarCount(dataCar.length);
    }
  };

  const onPressHandler = (item) => {
    navigation.navigate("DetailCarScreen", { item });
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
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={_onEndReached}
          style={styles.loadMoreBtn}
        >
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
            borderBottomWidth: 2,
            borderBottomColor: "#e0e0e0",
          }}
        >
          <View
            style={{
              left: "5%",
              flexDirection: "row",
            }}
          >
            {/* <Image
              source={{ uri: item.images[0] }}
              style={styles.imageSize}
              resizeMode={"contain"}
            /> */}

            <View style={{ flexDirection: "column", margin: 15, top: 10 }}>
              <Text
                style={{
                  textAlign: "left",
                  color: "#565656",
                  fontSize: 16,
                  fontWeight: "bold",
                }}
              >
                {item.Make} {item.Model} {"\b"}
                {item.Year}
              </Text>
              <View style={{ height: 10 }}></View>
              <Text
                style={{
                  color: "#1c2e65",
                  fontSize: 14,
                  fontWeight: "bold",
                  textAlign: "left",
                }}
              >
                {changeNumberFormat(item.Price)}
              </Text>
              <View style={{ height: 10 }}></View>

              {/* <Text
                style={{
                  color: "#565656",
                  fontSize: 14,
                  fontWeight: "800",
                  textAlign: "left",
                }}
              >
                {item.Dealer.Name}
              </Text> */}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  const _onEndReached = () => {
    setMoreLoading(true);
    fetchMoreCar(startAfter)
      .then((res) => {
        setDataCar([...dataCar, ...res.arr]);
        setfilteredData([...dataCar, ...res.arr]);
        setcarCount(dataCar.length + res.arr.length);
        setStartAfter(res.lastVal);
        setMoreLoading(false);
      })
      .catch();
  };
  const onRefresh = () => {
    // setRefreshing(true);
    // fetchCarData().then((res) => {
    //   setDataCar(res.arr);
    //   setStartAfter(res.lastVal);
    //   setfilteredData(res.arr);
    //   setcarCount(res.size);
    //   setRefreshing(false);
    // });
    convertData();
    compare();
  };
  return (
    <View style={{ backgroundColor: "white" }}>
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
          onChangeHandler={(text) => onSearch(text)}
        />
      </View>

      <View
        style={{
          justifyContent: "space-between",
          flexDirection: "row",
          padding: 10,
        }}
      >
        <Text
          style={{
            color: "#333",
            display: "flex",
            fontWeight: "800",
            fontSize: 18,
          }}
        >
          {carCount} Results
        </Text>
        <Filter
          modalVisible={shown}
          toggleModal={(dropdownValues) => {
            setShown(false);
            setSearch(dropdownValues);
            onFilter(dropdownValues);
          }}
          Visibility={() => setShown(false)}
        />
        <TouchableOpacity onPress={() => setShown(true)}>
          <Text
            style={{
              color: "#333",
              display: "flex",
              fontWeight: "800",
              fontSize: 18,
            }}
          >
            Filter{"   "}
            <Image
              source={require("../../Assets/NewAsset/filter.png")}
              style={{ width: 20, height: 15, resizeMode: "contain" }}
              resizeMode="contain"
            />
          </Text>
        </TouchableOpacity>
      </View>
      {noData ? (
        <Text style={{ color: "black", textAlign: "center" }}>No Data</Text>
      ) : null}
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
          data={filteredData.length > 0 ? filteredData : dataCar}
          contentContainerStyle={{ paddingBottom: "35%" }}
          renderItem={_renderItem}
          keyExtractor={(item, index) => index.toString()}
          //    ListFooterComponent={_renderFooter}
          onEndReachedThreshold={0.01}
          scrollEventThrottle={150}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </View>
  );
};
export default memo(MyDemandListing);
const styles = StyleSheet.create({
  imageSize: {
    width: screenWidth * 0.35,
    height: screenHeight * 0.2,
  },
  searchHolder: {
    backgroundColor: "#1c2e65",
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
  loadMoreBtn: {
    padding: 10,
    borderColor: "#1c2e65",
    borderWidth: 1,
    borderRadius: 4,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

//  .then((res) => console.log(res))
//   .catch((err) => console.log(err));
// // fetchDealerCar().then((data) => console.log(data));
// fetchCarData().then((res) => {
// setDataCar(res.arr);
// setStartAfter(res.lastVal);
// setfilteredData(res.arr);
// setcarCount(res.size);});
