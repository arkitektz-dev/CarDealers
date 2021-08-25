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
  RefreshControl,
} from "react-native";
import IonIcon from "react-native-vector-icons/Ionicons";
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/core";

import {
  fetchCarData,
  fetchCarListData,
  fetchMoreCar,
  fetchMoreCarWithoutFilter,
  fetchMoreCarWithSearch,
} from "../../Data/FetchData";
import { SearchComponent } from "../../Component/Search";
import Filter from "../../Component/Search/Fliter";
import { screenHeight, screenWidth } from "../../Global/Dimension";
import changeNumberFormat from "../../Component/Converter";
import { ImageBackground } from "react-native";
import Sold from "../../Assets/Sold.png";

const ListingCars = () => {
  const [dataCar, setDataCar] = useState([]);
  const [carCount, setcarCount] = useState(0);
  const [filteredData, setfilteredData] = useState([]);
  const [search, setSearch] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [shown, setShown] = useState(false);
  const [searchLoadMore, setSearchLoadMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [moreloading, setMoreLoading] = useState(false);
  const [startAfter, setStartAfter] = useState(Object);
  const [filterState, setFilterState] = useState(false);
  const [filter, setFilter] = useState({
    Year: "",
    Make: "",
    City: "",
    ExteriorColor: "",
    Assemble: "",
    initPrice: "",
    finalPrice: "",
  });

  const navigation = useNavigation();

  useEffect(() => {
    setLoading(true);
    fetchCarListData().then((res) => {
      setDataCar(res.arr);
      setStartAfter(res.lastVal);
      setfilteredData(res.arr);
      setcarCount(res.size);
      setLoading(false);
    });
  }, []);

  const onSearch = () => {
    if (searchText) {
      setSearchLoadMore(true);
      const newData = dataCar.filter((item) => {
        const itemData = `${
          item.vehicle.information.make
            ? item.vehicle.information.make.toUpperCase()
            : ""
        }
        ${
          item.vehicle.information.modelYear
            ? item.vehicle.information.modelYear.toUpperCase()
            : ""
        } ${
          item.vehicle.information.model
            ? item.vehicle.information.model.toUpperCase()
            : ""
        }`;
        const textData = searchText.toUpperCase();

        return itemData.indexOf(textData) > -1;
      });
      setcarCount(newData.length);
      setfilteredData(newData);
    } else {
      setDataCar(filteredData);
    }
  };

  const onFilter = async (dropdownValues) => {
    const arr = [];
    let ref = firestore().collection("Advertisments");
    if (dropdownValues.Year != "") {
      ref = ref.where(
        "vehicle.information.modelYear",
        "==",
        dropdownValues.Year
      );
      setFilter({ ...filter, Year: dropdownValues.Year });
      setFilterState(true);
    }

    if (dropdownValues.Make != "") {
      ref = ref.where("vehicle.information.make", "==", dropdownValues.Make);
      setFilter({ ...filter, Make: dropdownValues.Make });
      setFilterState(true);
    }
    // if (dropdownValues.mileage != "") {
    //   ref = ref.where("vehicle.mileage", "==", dropdownValues.mileage);
    // }
    if (dropdownValues.City != "") {
      ref = ref.where("vehicle.city", "==", dropdownValues.City);
      setFilter({ ...filter, City: dropdownValues.City });
      setFilterState(true);
    }
    if (dropdownValues.ExteriorColor != "") {
      ref = ref.where(
        "vehicle.exteriorColor",
        "==",
        dropdownValues.ExteriorColor
      );
      setFilter({ ...filter, ExteriorColor: dropdownValues.ExteriorColor });
      setFilterState(true);
    }

    if (dropdownValues.price.init > 0) {
      ref = ref.where("amount", ">", `${dropdownValues.price.init}`);
      ref = ref.where("amount", "<", `${dropdownValues.price.final}`);
      setFilter({ ...filter, initPrice: dropdownValues.price.init });
      setFilter({ ...filter, finalPrice: dropdownValues.price.final });
      setFilterState(true);
    }

    if (dropdownValues.Assemble != "") {
      ref = ref.where(
        "vehicle.additionalInformation.assembly",
        "==",
        dropdownValues.Assemble
      );
      setFilter({ ...filter, Assemble: dropdownValues.Assemble });
      setFilterState(true);
    }

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
            {item.images[0] != undefined ? (
              <View
                style={{
                  margin: 5,
                  width: screenWidth * 0.28,
                  height: screenHeight * 0.17,
                }}
              >
                <ImageBackground
                  source={{ uri: item.images[0] }}
                  style={styles.imageSize}
                  resizeMode={"cover"}
                >
                  {item.sold ? (
                    <Image
                      resizeMode={"contain"}
                      source={Sold}
                      style={{ alignSelf: "flex-start", width: 70, height: 50 }}
                    />
                  ) : null}
                </ImageBackground>
              </View>
            ) : (
              <View
                style={{
                  width: 130,
                  height: 130,
                }}
              >
                <ImageBackground
                  source={{
                    uri:
                      "https://firebasestorage.googleapis.com/v0/b/cardealer-41e38.appspot.com/o/photos%2FNoImage.jpg?alt=media&token=5c584571-f6f7-4579-9096-08b50eb639ff",
                  }}
                  style={styles.imageSize}
                  resizeMode={"cover"}
                >
                  {item.sold ? (
                    <Image
                      resizeMode={"contain"}
                      source={Sold}
                      style={{ alignSelf: "flex-start", width: 70, height: 50 }}
                    />
                  ) : null}
                </ImageBackground>
              </View>
            )}
            <View style={{ flexDirection: "column", margin: 15, top: 10 }}>
              <Text
                style={{
                  textAlign: "left",
                  color: "#565656",
                  fontSize: 16,
                  fontWeight: "bold",
                }}
              >
                {item.vehicle.information.make} {item.vehicle.information.model}{" "}
                {"\b"}
                {item.vehicle.information.modelYear}
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
                {changeNumberFormat(item.amount)}
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
                {item.vehicle.city} | {""}
                {item.vehicle.mileage} | {""}
                {item.vehicle.additionalInformation.engineType}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  const _onEndReached = () => {
    setMoreLoading(true);
    if (searchLoadMore == true) {
      fetchMoreCarWithSearch(startAfter, searchText)
        .then((res) => {
          if (filteredData.length > 0) {
            // console.log([...filteredData, ...res.arr]);
            setDataCar([...filteredData, ...res.arr]);
            setfilteredData([...filteredData, ...res.arr]);
          }
          setcarCount(filteredData.length + res.arr.length);
          setStartAfter(res.lastVal);
          setMoreLoading(false);
        })
        .catch((e) => console.log(e));
    }
    if (filterState == false && searchLoadMore == false) {
      fetchMoreCarWithoutFilter(startAfter)
        .then((res) => {
          setDataCar([...dataCar, ...res.arr]);
          if (filteredData.length > 0) {
            setfilteredData([...dataCar, ...res.arr]);
          }
          setcarCount(dataCar.length + res.arr.length);
          setStartAfter(res.lastVal);
          setMoreLoading(false);
        })
        .catch((e) => console.log(e));
    }
    if (filterState == true) {
      fetchMoreCar(startAfter, filter).then((res) => {
        if (filteredData.length > 0) {
          setfilteredData([...filteredData, ...res.arr]);
          setcarCount(filteredData.length + res.arr.length);
        } else {
          setDataCar([...dataCar, ...res.arr]);
          setcarCount(dataCar.length + res.arr.length);
        }
        setStartAfter(res.lastVal);
        setMoreLoading(false);
      });
    }
  };
  const onRefresh = () => {
    setRefreshing(true);
    fetchCarData().then((res) => {
      setDataCar(res.arr);
      setStartAfter(res.lastVal);
      setfilteredData(res.arr);
      setcarCount(res.size);
      setRefreshing(false);
    });
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
          onChangeHandler={(text) => setSearchText(text)}
          onSearchPress={onSearch}
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
          onRequestClose={() => setShown(false)}
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
      {/* {noData ? (
        <Text style={{ color: "black", textAlign: "center" }}>No Data</Text>
      ) : null} */}
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
          ListFooterComponent={filteredData.length > 0 ? _renderFooter : null}
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
export default memo(ListingCars);
const styles = StyleSheet.create({
  imageSize: {
    resizeMode: "cover",
    width: "100%",
    height: "100%",
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
