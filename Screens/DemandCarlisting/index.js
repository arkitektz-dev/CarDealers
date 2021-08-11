import React, { memo, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  RefreshControl,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import IonIcon from "react-native-vector-icons/Ionicons";
import LottieView from "lottie-react-native";
import numberWithCommas from "../../Component/Converter";
import {
  fetchDemandCarData,
  fetchMoreDemandCar,
  fetchSpecificDealer,
} from "../../Data/FetchData";
import { SearchComponent } from "../../Component/Search";
import Filter from "../../Component/Search/Fliter";
import { screenHeight, screenWidth } from "../../Global/Dimension";
import CallSeller from "../../Assets/NewAsset/Call.png";
import { Linking } from "react-native";

const DemandCarList = () => {
  const [dataCar, setDataCar] = useState([]);
  const [carCount, setcarCount] = useState(0);
  const [filteredData, setfilteredData] = useState([]);
  const [search, setSearch] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [dealerCallData, setDealerCallData] = useState();
  const [shown, setShown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [moreloading, setMoreLoading] = useState(false);
  const [startAfter, setStartAfter] = useState(Object);

  const navigation = useNavigation();

  useEffect(() => {
    fetchDemandCarData().then((res) => {
      setLoading(true);
      setDataCar(res.arr);
      setStartAfter(res.lastVal);
      // setfilteredData(res.arr);
      setcarCount(res.size);
      setLoading(false);
    });
  }, []);
  const makeCall = (x) => {
    let phoneNumber = "";

    const dealerId = x.id.toString();
    fetchSpecificDealer(dealerId)
      .then((data) => setDealerCallData(data.data().contactInformation[0]))
      .catch((err) => console.log(err));

    if (Platform.OS === "android") {
      phoneNumber = `tel:${dealerCallData}`;
    } else {
      phoneNumber = `telprompt:${dealerCallData}`;
    }

    Linking.openURL(phoneNumber);
  };
  const onSearch = (text) => {
    if (text) {
      const newData = dataCar.filter((item) => {
        const itemData = `${item.Make.toUpperCase()}
        ${item.Year} ${item.Model.toUpperCase()}`;
        const textData = text.toUpperCase();

        return itemData.indexOf(textData) > -1;
      });

      setfilteredData(newData);
    } else {
      setfilteredData(dataCar);
    }
  };
  // const onFilter = async (dropdownValues) => {
  //   const arr = [];
  //   let ref = firestore().collection("Demand");

  //   if (dropdownValues.Make != "") {
  //     ref = ref.where("Make", "==", dropdownValues.Make);
  //   }

  //   // if (dropdownValues.Make != "") {
  //   //   ref = ref.where("vehicle.information.make", "==", dropdownValues.Make);
  //   // }

  //   // if (dropdownValues.City != "") {
  //   //   ref = ref.where("vehicle.city", "==", dropdownValues.City);
  //   // }
  //   // if (dropdownValues.ExteriorColor != "") {
  //   //   ref = ref.where(
  //   //     "vehicle.exteriorColor",
  //   //     "==",
  //   //     dropdownValues.ExteriorColor
  //   //   );
  //   // }
  //   // if (dropdownValues.Assemble != "") {
  //   //   ref = ref.where(
  //   //     "vehicle.additionalInformation.assembly",
  //   //     "==",
  //   //     "imported"
  //   //   );
  //   // }

  //   var a = await ref.get();
  //   a.docs.forEach((data) => {
  //     arr.push(data.data());
  //   });
  //   setfilteredData(arr);
  //   {
  //     filteredData.length > 0
  //       ? setcarCount(arr.length)
  //       : setcarCount(dataCar.length);
  //   }

  //   // const newData = dataCar.filter((item) => {
  //   //   const itemData = `${item.Make.toUpperCase()}
  //   //   ${item.Year} ${item.Model.toUpperCase()}`;
  //   //   const textData = text.toUpperCase();

  //   //   const textData = dropdownValues.Make.toUpperCase();

  //   //   return itemData.indexOf(textData) > -1;
  //   // });

  //   // setDataCar(newData);
  //   // setcarCount(newData.length);
  // };

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
              {`${numberWithCommas(item.minPrice)} - ${numberWithCommas(
                item.maxPrice
              )}`}
            </Text>
            <Text
              style={{
                color: "#1c2e65",
                fontSize: 14,
                fontWeight: "bold",
                textAlign: "left",
                marginTop: 5,
              }}
            >
              {`${item.minYear} - ${item.maxYear}`}
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
              {item.Dealer.Name}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={{ margin: 15, width: 150 }}
          onPress={() => makeCall(item.Dealer.id)}
        >
          <Image
            source={CallSeller}
            style={{
              width: "100%",
              height: 50,
              resizeMode: "contain",
              alignSelf: "flex-start",
            }}
          />
        </TouchableOpacity>
      </View>
    );
  };
  const _onEndReached = () => {
    setMoreLoading(true);
    fetchMoreDemandCar(startAfter).then((res) => {
      setDataCar([...dataCar, ...res.arr]);
      // setfilteredData([...dataCar, ...res.arr]);
      setcarCount(dataCar.length + res.arr.length);
      setStartAfter(res.lastVal);
      setMoreLoading(false);
    });
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchDemandCarData().then((res) => {
      setDataCar(res.arr);
      setStartAfter(res.lastVal);
      // setfilteredData(res.arr);
      setcarCount(res.size);
      setRefreshing(false);
    });
  };
  return (
    <View style={{ backgroundColor: "white" }}>
      <View style={styles.searchHolder}>
        <IonIcon
          name="chevron-back-circle-sharp"
          color="white"
          size={35}
          style={{ margin: 10 }}
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
        <TouchableOpacity onPress={() => navigation.navigate("AddDemandCar")}>
          <Text
            style={{
              color: "#333",
              display: "flex",
              fontWeight: "bold",
              fontSize: 18,
            }}
          >
            Add Demand Car
          </Text>
        </TouchableOpacity>
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
          data={filteredData.length > 0 ? filteredData : dataCar}
          contentContainerStyle={{ paddingBottom: "35%" }}
          renderItem={_renderItem}
          keyExtractor={(item, index) => index.toString()}
          ListFooterComponent={_renderFooter}
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
export default memo(DemandCarList);
const styles = StyleSheet.create({
  imageSize: {
    width: screenWidth * 0.35,
    height: screenHeight * 0.2,
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
});
