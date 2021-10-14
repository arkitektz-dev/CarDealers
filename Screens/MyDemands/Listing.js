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
  Modal,
  ScrollView,
} from "react-native";
import IonIcon from "react-native-vector-icons/Ionicons";
import AppCheckBox from "../../Component/AppCheckbox";
import { useToast } from "native-base";

import LottieView from "lottie-react-native";

import { useNavigation } from "@react-navigation/core";
import {
  fetchCarData,
  fetchDealerCar,
  fetchMoreCar,
  getData,
  UpdateDemandData,
} from "../../Data/FetchData";
import { SearchComponent } from "../../Component/Search";
import Filter from "../../Component/Search/Fliter";
import { screenHeight, screenWidth } from "../../Global/Dimension";
import { RefreshControl } from "react-native";
import changeNumberFormat from "../../Component/Converter";
import DemandFilter from "../../Component/Search/DemandFilter";

const MyDemandListing = () => {
  const [dataCar, setDataCar] = useState([]);
  const [carCount, setcarCount] = useState(0);
  const toast = useToast();

  const [filteredData, setfilteredData] = useState([]);
  const [search, setSearch] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [shown, setShown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [moreloading, setMoreLoading] = useState(false);
  const [startAfter, setStartAfter] = useState(Object);
  const [noData, setNoData] = useState(false);
  const [modal, setModal] = useState(false);
  const [modalData, setModalData] = useState(false);
  const [stateChange, setStateChange] = useState(false);
  const [statusLoader, setStatusLoader] = useState(false);
  const [checkbox, setCheckbox] = useState([]);

  const statuses = ["Active", "Inactive", "Sold"];
  var value;
  const adArr = [];
  const navigation = useNavigation();
  const onChangeHandler = (item) => {
    setCheckbox([item]);
  };
  const convertData = async () => {
    value = await getData().then((res) => res.DealerId);
  };

  const compare = async () => {
    const ref = firestore()
      .collection("Demand")
      .orderBy("date", "desc");
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
          adArr.push({...documentSnapshot.data(),id: documentSnapshot.id});
        }
      });
      
      var ar1 = adArr.filter((e) => e.adStatus.startsWith("A"));
      var ar2 = adArr.filter((e) => e.adStatus.startsWith("S"));
      var ar3 = adArr.filter((e) => e.adStatus.startsWith("I"));
      let result = [...ar1, ...ar2, ...ar3];
      setDataCar(result);
      setcarCount(adArr.length);
    });
  };
  useEffect(() => {
    setLoading(true);
    convertData();
    compare().then(() => setLoading(false));
  }, [refresh]);

  const onSearch = () => {
    if (searchText) {
      const newData = dataCar.filter((item) => {
        const itemData = `${item.Make ? item.Make.toUpperCase() : ""}
        ${item.Year ? item.Year : ""} ${
          item.Model ? item.Model.toUpperCase() : ""
        }`;
        const textData = searchText.toUpperCase();

        return itemData.indexOf(textData) > -1;
      });

      setfilteredData(newData);
      setcarCount(newData.length);
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
    if (dropdownValues.City != "") {
      ref = ref.where("Model", "==", dropdownValues.Model);
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
  const onEdit = (item) => {
    if (checkbox[0] == item.adStatus) {
      setModal(false);
    } else {
      setStatusLoader(true);
      UpdateDemandData(item, checkbox[0], functionBack, item.id);
    }
  };
  const functionBack = (data) => {
    console.log("back called");

    setModal(false);

    toast.show({
      title: "Status Changed",
      status: "success",
      description: "Your Ad. status has been changed",
      duration: 1500,
      minWidth: "90%",
      isClosable: false,
    });
    setStatusLoader(false);
    setLoading(true);
    convertData();
    compare().then(() => setLoading(false));
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
        <View
          activeOpacity={0.9}
          onPress={_onEndReached}
          style={styles.loadMoreBtn}
        >
          <Text style={styles.btnText}>No More to Show</Text>
          {moreloading ? (
            <ActivityIndicator color="#1c2e65" style={{ marginLeft: 8 }} />
          ) : null}
        </View>
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
            <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
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
              <Text
                style={{
                  textAlign: "left",
                  color: "#565656",
                  fontSize: 16,
                  fontWeight: "bold",
                }}
              >
                - {item?.adStatus}
              </Text>
            </View>
            <View style={{ height: 10 }}></View>

            <Text
              style={{
                color: "#1c2e65",
                fontSize: 14,
                fontWeight: "bold",
                textAlign: "left",
              }}
            >
              {`${changeNumberFormat(item.minPrice)} - ${changeNumberFormat(
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
            <TouchableOpacity
              style={{
                backgroundColor: "#A7D2DE",
                borderRadius: 20,
                alignItems: "center",
                justifyContent: "center",
                marginTop: 5,
                width: 120,
              }}
              onPress={() => {
                setCheckbox([item.adStatus]);
                setModalData(item);
                setModal(true);
              }}
            >
              <Text style={[styles.location, { color: "black" }]}>
                Change Status{" "}
              </Text>
            </TouchableOpacity>
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
      .catch((e) => console.log(e, "Tjs"));
  };
  const onRefresh = () => {
    setRefresh(true);
  };
  return (
    <View style={{ backgroundColor: "white" }}>
      <Modal
        visible={modal}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setModal(false)}
      >
        <View
          style={{
            flex: 1,

            backgroundColor: "rgba(0,0,0,0.7)",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <View style={styles.dropdownHeader}>
            <Text
              style={{
                color: "#000000",
                fontSize: 16,
              }}
            >
              Change Status
            </Text>
            {statusLoader ? (
              <ActivityIndicator size="small" color="#1e2d64" />
            ) : (
              <TouchableOpacity onPress={() => onEdit(modalData)}>
                <Text
                  style={{
                    color: "#1e2d64",
                    fontSize: 16,
                  }}
                >
                  Update
                </Text>
              </TouchableOpacity>
            )}
          </View>
          <ScrollView style={styles.form_container}>
            {statuses.map((item) => {
              return (
                <TouchableOpacity
                  style={styles.checkerItem}
                  activeOpacity={0.8}
                  onPress={() => onChangeHandler(item)}
                >
                  <Text
                    style={{
                      color: checkbox.includes(item) ? "black" : "grey",
                      fontSize: 18,
                      fontWeight: "800",
                      marginTop: 5,
                    }}
                    key={(item, index) => index.toString()}
                  >
                    {item}
                  </Text>
                  {checkbox.includes(item) ? (
                    <AppCheckBox
                      status={checkbox.includes(item) ? "checked" : "unchecked"}
                    />
                  ) : null}
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </Modal>
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
        {/* <TouchableOpacity onPress={() => setShown(true)}>
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
        </TouchableOpacity> */}
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
  dropdownHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: "#000000",
    borderBottomWidth: 0.5,
    height: 55,
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    width: "100%",
    marginTop: 80,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  checkerItem: {
    flexDirection: "row",
    marginTop: 9,
    borderBottomColor: "grey",
    borderBottomWidth: 0.5,
    justifyContent: "space-between",
    paddingVertical: 7,
    minHeight: 52,
  },
  form_container: {
    paddingBottom: "20%",
    backgroundColor: "#fff",
    width: "100%",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  location: {
    fontSize: 15,
    fontFamily: "Roboto-Medium",
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
