import React, { memo, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import { fetchCarData, fetchMoreCar } from "../../Data/FetchData";
import { SearchComponent } from "../../Component/Search";
import Filter from "../../Component/Search/Fliter";
import { screenHeight, screenWidth } from "../../Global/Dimension";

const ListingCars = () => {
  const [dataCar, setDataCar] = useState([]);
  const [carCount, setcarCount] = useState(0);
  const [filteredData, setfilteredData] = useState([]);
  const [search, setSearch] = useState([]);
  const [shown, setShown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [moreloading, setMoreLoading] = useState(false);
  const [startAfter, setStartAfter] = useState(Object);
  const navigation = useNavigation();

  useEffect(() => {
    setLoading(true);
    fetchCarData().then((res) => {
      setDataCar(res.arr);
      setStartAfter(res.lastVal);
      setfilteredData(res.arr);
      setcarCount(res.size);
      setLoading(false);
    });
  }, []);

  const onSearch = (text) => {
    if (text) {
      const newData = dataCar.filter((item) => {
        const itemData = `${item.vehicle.information.make.toUpperCase()}
        ${item.vehicle.information.modelYear.toUpperCase()} ${item.vehicle.information.model.toUpperCase()}`;
        const textData = text.toUpperCase();

        return itemData.indexOf(textData) > -1;
      });

      setDataCar(newData);
    } else {
      setDataCar(filteredData);
    }
  };
  const onFilter = (dropdownValues) => {
    const newData = dataCar.filter((item) => {
      const itemData = `${item.vehicle.information.make.toUpperCase()}   
      ${item.vehicle.information.modelYear.toUpperCase()} ${item.vehicle.information.model.toUpperCase()}`;
      const textData = dropdownValues.Make.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });

    setDataCar(newData);
    setcarCount(newData.length);
  };

  const onPressHandler = (item) => {
    navigation.navigate("DetailCarScreen", { item });
  };
  const _renderFooter = () => {
    if (moreloading) return true;

    return (
      <ActivityIndicator
        size="large"
        color="red"
        style={{ marginBottom: 10 }}
      />
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
            <Image
              source={{ uri: item.images[0] }}
              style={styles.imageSize}
              resizeMode={"contain"}
            />

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
                  color: "red",
                  fontSize: 14,
                  fontWeight: "bold",
                  textAlign: "left",
                }}
              >
                {item.amount}
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
    fetchMoreCar(startAfter).then((res) => {
      setDataCar([...dataCar, ...res.arr]);
      setcarCount(dataCar.length + res.arr.length);
      setStartAfter(res.lastVal);
      setMoreLoading(false);
    });
  };
  return (
    <View style={{ backgroundColor: "white" }}>
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
          onChangeHandler={(text) => onSearch(text)}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate("AddCar")}
          style={{
            right: 75,
            top: 10,
            backgroundColor: "#fff",
            width: 35,
            height: 35,
            borderRadius: 35 / 2,
          }}
        ></TouchableOpacity>
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
            Filter
          </Text>
        </TouchableOpacity>
      </View>
      {loading ? (
        <ActivityIndicator color="red" size="large" />
      ) : (
        <FlatList
          data={dataCar}
          contentContainerStyle={{ paddingBottom: "35%" }}
          renderItem={_renderItem}
          keyExtractor={(item, index) => index.toString()}
          ListFooterComponent={_renderFooter}
          onEndReached={_onEndReached}
          onEndReachedThreshold={0.01}
          scrollEventThrottle={150}
        />
      )}
    </View>
  );
};
export default memo(ListingCars);
const styles = StyleSheet.create({
  imageSize: {
    width: screenWidth * 0.35,
    height: screenHeight * 0.2,
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
