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
  Modal,
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
import DemandFilter from "../../Component/Search/DemandFilter";
import {
  defineDate,
  imageChecker,
  screenHeight,
  screenWidth,
} from "../../Global/Dimension";
import CallSeller from "../../Assets/NewAsset/Call.png";
import { Linking } from "react-native";
import firestore from "@react-native-firebase/firestore";
import car from "../../Assets/car.png";
const DemandCarList = () => {
  const [dataCar, setDataCar] = useState([]);
  const [carCount, setcarCount] = useState(0);
  const [filteredData, setfilteredData] = useState([]);
  const [search, setSearch] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [dealerCallData, setDealerCallData] = useState();
  const [shown, setShown] = useState(false);
  const [loading, setLoading] = useState(true);
  const [moreloading, setMoreLoading] = useState(false);
  const [startAfter, setStartAfter] = useState(Object);
  const [datalength, setDatalength] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState(undefined);
  const navigation = useNavigation();

  useEffect(() => {
    fetchDemandCarData().then((res) => {
      setLoading(true);
      setDataCar(res.arr);
      setDatalength(res.arr.length);
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
      .then((data) => {
        console.log(data.data());
        if (Platform.OS === "android") {
          phoneNumber = `tel:${"+92" + data.data().contactInformation[0]}`;
        } else {
          phoneNumber = `telprompt:${"+92" +
            data.data().contactInformation[0]}`;
        }
        Linking.openURL(phoneNumber);
      })
      .catch((err) => console.log(err));
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
  const onFilter = async (dropdownValues) => {
    const arr = [];
    setLoading(true);
    let ref = firestore().collection("Demand");

    if (dropdownValues.Make != "") {
      ref = ref.where("Make", "==", dropdownValues.Make);
    }
    if (dropdownValues.Model != "") {
      ref = ref.where("Model", "==", dropdownValues.Model);
    }

    if (dropdownValues.price.init != "0") {
      console.log("init", dropdownValues.price.init);
      ref = ref.orderBy("minPrice", "asc");
      ref = ref.where("minPrice", ">", dropdownValues.price.init.toString());
    }
    if (dropdownValues.price.final != "10000000") {
      console.log("max", dropdownValues.price.final);
      ref = ref.orderBy("maxPrice", "asc");
      ref = ref.where("maxPrice", "<", dropdownValues.price.final.toString());
    }
    ref = ref.orderBy("date", "desc");
    var a = await ref.limit(5).get();
    a.docs.forEach((data) => {
      arr.push(data.data());
    });
    console.log(arr);
    setfilteredData(arr);
    setDataCar(arr);
    setDatalength(arr.length);

    setcarCount(arr.length);

    setLoading(false);
    // const newData = dataCar.filter((item) => {
    //   const itemData = `${item.Make.toUpperCase()}
    //   ${item.Year} ${item.Model.toUpperCase()}`;
    //   const textData = text.toUpperCase();

    //   const textData = dropdownValues.Make.toUpperCase();

    //   return itemData.indexOf(textData) > -1;
    // });

    // setDataCar(newData);
    // setcarCount(newData.length);
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
        {datalength == 5 ? (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={_onEndReached}
            style={styles.loadMoreBtn}
          >
            <Text style={styles.btnText}>Load More</Text>
            {moreloading ? (
              <ActivityIndicator color="#1c2e65" style={{ marginLeft: 8 }} />
            ) : null}
          </TouchableOpacity>
        ) : (
          <View activeOpacity={0.7} style={styles.loadMoreBtn}>
            <Text style={styles.btnText}>No More Data</Text>
            {moreloading ? (
              <ActivityIndicator color="#1c2e65" style={{ marginLeft: 8 }} />
            ) : null}
          </View>
        )}
      </View>
    );
  };
  const _renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.itemStyle}
        onPress={() => {
          setModalData(item);
          setModalVisible(true);
        }}
      >
        <View style={{ marginLeft: -25 }}>
          <Image
            source={car}
            onPress={() => navigation.goBack()}
            style={{
              width: 150,
              height: 52,
            }}
          />
        </View>
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
            <Text
              style={{
                color: "#565656",
                fontSize: 14,
                fontWeight: "800",
                textAlign: "left",
              }}
            >
              {defineDate(item.date)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  const _onEndReached = () => {
    setMoreLoading(true);
    fetchMoreDemandCar(startAfter).then((res) => {
      setDataCar([...dataCar, ...res.arr]);
      // setfilteredData([...dataCar, ...res.arr]);
      setDatalength(res.arr.length);
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
    <View style={{ backgroundColor: "white", height: "100%" }}>
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
          backgroundColor: "white",
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
        <DemandFilter
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
        {/* <TouchableOpacity onPress={() => navigation.navigate("AddDemandCar")}>
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
        </TouchableOpacity> */}
      </View>
      {loading ? (
        <View style={{ flex: 1 }}>
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
        </View>
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={[styles.centeredView, { width: "100%" }]}>
          <View style={[styles.modalView, { width: "90%" }]}>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.cross}
            >
              <IonIcon
                name="ios-close"
                size={20}
                color={"black"}
                enableRTL={true}
              />
            </TouchableOpacity>
            <View style={styles.modalTitle}>
              <Text
                style={{
                  textAlign: "left",
                  color: "#565656",
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
                Dealer Info
              </Text>
            </View>
            <View>
              <View style={styles.modaluser}>
                <Image
                  source={{ uri: imageChecker(modalData?.Dealer?.image) }}
                  onPress={() => navigation.goBack()}
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 50,
                    marginLeft: -20,
                  }}
                />
                <View style={{ marginLeft: 20 }}>
                  <Text
                    style={{
                      color: "#565656",
                      fontSize: 16,
                      fontWeight: "800",
                      textAlign: "left",
                    }}
                  >
                    {modalData?.Dealer?.Name}
                  </Text>
                  <TouchableOpacity
                    style={{ width: 120 }}
                    onPress={() => makeCall(modalData?.Dealer?.id)}
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
              </View>
            </View>
          </View>
        </View>
      </Modal>
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
    // flexGrow: 1,
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    alignSelf: "center",
    // marginTop: 22,
    // marginBottom:-10
  },
  modalView: {
    // margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    paddingVertical: 25,
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  itemStyle: {
    flexDirection: "row",
    borderBottomWidth: 2,
    borderBottomColor: "#e0e0e0",
    alignItems: "center",
    justifyContent: "center",
  },
  cross: {
    backgroundColor: "#CCCCCC",
    position: "absolute",
    right: 15,
    top: 12,
    width: 26,
    height: 26,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  modalTitle: {
    position: "absolute",
    top: 15,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  modaluser: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    // borderColor: "grey",
    // borderBottomWidth: 0.5,
    paddingVertical: 10,
    marginTop:10
  },
});
