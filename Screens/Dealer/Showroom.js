import React, { memo, useContext, useEffect, useState } from "react";
import Back from "../../Assets/NewAsset/backButton.png";
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Modal,
} from "react-native";
import IonIcon from "react-native-vector-icons/Ionicons";

import firestore from "@react-native-firebase/firestore";
import { useNavigation } from "@react-navigation/core";
import {
  autoCapitalize,
  screenHeight,
  screenWidth,
} from "../../Global/Dimension";
import HomeCard from "../../Component/CardViews/HomeProductListCard";
import AuthContext from "../../Component/Authcontext";
import LottieView from "lottie-react-native";

const DealerShowroomProfile = ({ route, navigation }) => {
  const showroomId = route.params.item.id._documentPath._parts[1];
  const showroomName = route.params.item.name;

  const [dealerCount, setdealerCount] = useState(0);
  const [modalData, setModalData] = useState([]);
  const [refreshPage, setRefreshPage] = useState("");
  const [carCount, setcarCount] = useState(0);
  const [dataCar, setDataCar] = useState([]);
  const [visible, setVisible] = useState(false);
  const [showroomData, setShowroomData] = useState([]);
  const [showroomExist, setShowroomExist] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tempArr, setTempArr] = useState([]);
  const authContext = useContext(AuthContext);
  const user = authContext.user;
  const arr = [];
  const showroomArr = [];

  const AssignShowroom = () => {
    const Id_Showroom = firestore()
      .collection("Dealers")
      .doc(showroomId);
    const showrooms = [];
    showrooms.push(...tempArr, { id: Id_Showroom, name: item.name });
    try {
      firestore()
        .collection("Dealers")
        .doc(user)
        .update({ showrooms: showrooms })
        .then(() => setRefreshPage("refresh"));
    } catch {
      console.log(error);
    }
  };

  const fetchData = async () => {
    const ref = firestore().collection("Advertisments");
    await ref.get().then((querySnapshot) => {
      querySnapshot.forEach((documentSnapshot) => {
        let showroomDataId;
        if (typeof documentSnapshot.data().showroom.id == "string") {
          showroomDataId = documentSnapshot.data().showroom.id.split("/")[1];
        } else {
          showroomDataId = documentSnapshot
            .data()
            .showroom.id.id.toString()
            .trim();
        }
        const paramShowroomId = showroomId;
        if (showroomDataId == paramShowroomId)
          arr.push(documentSnapshot.data());
      });
      setDataCar(arr);
      setcarCount(arr.length);
    });
  };
  const fetchShowroomData = async () => {
    let dealersCount = 0;
    const arr = [];
    const ref = firestore().collection("Dealers");
    await ref.get().then((querySnapshot) => {
      querySnapshot.forEach((documentSnapshot) => {
        var a = documentSnapshot.data().showrooms.filter((s) => {
          if (s.id.id.trim() == showroomId) {
            arr.push({
              id: documentSnapshot.id,
              data: documentSnapshot.data(),
            });

            return true;
          }

          setModalData(arr);
        });
        if (a.length > 0) {
          dealersCount++;
        }
      });
      setdealerCount(dealersCount);
    });
  };
  const getShowrooms = async () => {
    const ref = firestore().collection("Showrooms");
    await ref.get().then((querySnapshot) => {
      querySnapshot.forEach((documentSnapshot) => {
        let showroomDataId;
        if (typeof documentSnapshot.id == "string") {
          showroomDataId = documentSnapshot.id;
        } else {
          showroomDataId = documentSnapshot.id.toString().trim();
        }
        console.log(showroomId);
        const paramShowroomId = showroomId.toString();
        if (showroomDataId == paramShowroomId) {
          showroomArr.push(documentSnapshot.data());
        }
      });
      setShowroomData(showroomArr);
    });
  };
  const modalVisible = () => {
    if (visible == false) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };
  const onPressHandlerDealerList = (item) => {
    navigation.navigate("ShowroomDealerProfile", { item });
    setVisible(false);
  };
  const _renderDealerList = ({ item }) => {
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
          <TouchableOpacity
            activeOpacity={0}
            onPress={() => onPressHandlerDealerList(item)}
            style={{ flexDirection: "column", margin: 15, top: 10 }}
          >
            <Text
              style={{
                textAlign: "left",
                color: "#565656",
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              {autoCapitalize(item.data.name)}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  const onPressHandler = (item) => {
    navigation.navigate("DetailCarScreen", { item });
  };

  const _renderItem = ({ item }) => {
    return (
      <HomeCard
        pressHandler={() => onPressHandler(item)}
        title={`${item.vehicle.information.make +
          " " +
          item.vehicle.information.model +
          " " +
          item.vehicle.information.modelYear} `}
        price={`${item.amount}`}
        subtitle={`${item.vehicle.city +
          " " +
          item.vehicle.mileage +
          " " +
          item.vehicle.additionalInformation.engineType} `}
        image={{ uri: item.images[0] }}
      />
    );
  };

  //    Showroom Exist Code

  // const ref = firestore()
  //   .collection("Dealers")
  //   .doc(user);
  // ref.get().then((res) => {
  //   setTempArr(res.data().showrooms);
  //   res.data().showrooms.forEach((data) => {
  //     if (data.id._documentPath._parts[1] == showroomId) {
  //       setShowroomExist(showroomId);
  //     }
  //   });
  // });

  useEffect(() => {
    getShowrooms();
    setLoading(true);
    fetchShowroomData();
    fetchData().then(() => setLoading(false));
  }, []);
  return (
    <>
      {loading ? (
        <LottieView
          source={require("../../Assets/CarLoader.json")}
          autoPlay
          resizeMode="contain"
          style={{
            top: 100,
            alignSelf: "center",
            width: 170,
            height: 170,
          }}
          hardwareAccelerationAndroid={true}
        />
      ) : (
        <View style={styles.parent}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View style={styles.searchHolder}>
              <IonIcon
                style={{ margin: 10 }}
                name="chevron-back-circle-sharp"
                color="white"
                size={35}
                onPress={() => navigation.goBack()}
              />
              <Text style={styles.headingText}> Showroom Profile</Text>
            </View>
            <Modal
              visible={visible}
              containerStyle={{ backgroundColor: "rgba(0.5, 0.25, 0, 0.2)" }}
              onRequestClose={() => setVisible(false)}
            >
              <TouchableOpacity
                activeOpacity={0}
                onPress={modalVisible}
                style={{
                  margin: 10,
                  flexDirection: "row",
                  justifyContent: "flex-end",
                }}
              >
                <Text
                  style={{ color: "blue", fontSize: 18, fontWeight: "900" }}
                >
                  Close
                </Text>
              </TouchableOpacity>

              <FlatList
                renderItem={_renderDealerList}
                data={modalData}
                keyExtractor={(item, index) => index.toString()}
              />
            </Modal>
          </View>
          <View style={styles.distance}></View>
          <View style={styles.topDiv}>
            <View
              style={{
                flexDirection: "row",
                alignSelf: "flex-start",
                marginHorizontal: 25,
              }}
            >
              <Image
                source={{ uri: showroomData[0] && showroomData[0].images[0] }}
                onPress={() => navigation.goBack()}
                style={{
                  width: 85,
                  height: 85,
                  borderRadius: 85 / 2,
                }}
              />
              <View style={{ width: 15 }}></View>
              <View
                style={{ flexDirection: "column", justifyContent: "flex-end" }}
              >
                <View style={styles.DealerName}>
                  <Text style={styles.carInfoText}>{showroomName}</Text>
                </View>
                <View style={{ flexDirection: "column" }}>
                  <Text style={styles.h1}>
                    {showroomData[0] && showroomData[0].contactInformation}
                  </Text>
                  <Text style={styles.txt1}>
                    {showroomData[0] && showroomData[0].location}
                  </Text>
                </View>
              </View>
            </View>
            {/* {showroomExist ? (
        <Text style={styles.carSubInfoText}>Showroom Exist</Text>
      ) : (
        <TouchableOpacity onPress={AssignShowroom}>
          <Text style={styles.carSubInfoText}>Showroom Does Not Exist</Text>
        </TouchableOpacity>
      )} */}
          </View>
          <View
            style={{
              flexDirection: "row",
              margin: 5,
              justifyContent: "space-evenly",
            }}
          >
            <View style={{ flexDirection: "column" }}>
              <Text
                style={{
                  fontSize: 35,
                  fontWeight: "bold",
                  color: "grey",
                  textAlign: "center",
                }}
              >
                {dealerCount}
              </Text>
              <TouchableOpacity
                onPress={modalVisible}
                style={styles.CarInfoTitle}
              >
                <Text style={styles.countText}> Dealers </Text>
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: "column" }}>
              <Text
                style={{
                  fontSize: 35,
                  fontWeight: "bold",
                  color: "grey",
                  textAlign: "center",
                }}
              >
                {carCount}
              </Text>
              <View style={styles.CarInfoTitle}>
                <Text style={styles.countText}> Cars </Text>
              </View>
            </View>
          </View>
          {/*  */}
          {dataCar.length > 0 ? (
            <FlatList
              contentContainerStyle={{
                alignSelf: "center",
              }}
              numColumns={2}
              data={dataCar}
              renderItem={_renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
          ) : (
            <LottieView
              source={require("../../Assets/NoData.json")}
              autoPlay
              resizeMode="contain"
              style={{
                bottom: 10,
                alignSelf: "center",
                width: 300,
                height: 300,
              }}
              hardwareAccelerationAndroid={true}
            />
          )}
        </View>
      )}
    </>
  );
};
export default DealerShowroomProfile;
const styles = StyleSheet.create({
  Nav: { flexDirection: "row" },
  parent: {
    flexDirection: "column",
    flex: 1,
    backgroundColor: "#fff",
  },
  searchHolder: {
    backgroundColor: "#1c2e65",
    flexDirection: "row",
    flexGrow: 1,
  },
  navTxt: {
    textAlign: "center",
    alignItems: "center",
    color: "grey",
    fontSize: 23,
    fontWeight: "bold",
  },
  topDiv: {
    width: screenWidth,
    height: screenHeight * 0.18,
    flexDirection: "column",
    borderBottomWidth: 2,
    borderBottomColor: "#e0e0e0",
  },
  imageSize: {
    width: 130,
    height: 90,
    resizeMode: "contain",
  },
  h1: {
    color: "grey",
    fontSize: 16,
    fontWeight: "bold",
  },
  distance: {
    height: screenHeight * 0.035,
  },
  txt1: {
    color: "grey",
    fontSize: 15,
    fontWeight: "800",
  },
  heading: {
    color: "#565656",
    fontSize: 20,
    fontWeight: "bold",
    left: "5%",
  },
  DealerName: {
    backgroundColor: "#1c2e65",
    justifyContent: "center",
  },
  countText: {
    fontWeight: "bold",
    fontSize: 17,
    color: "white",
    marginBottom: 5,
    textAlign: "center",
  },
  headingText: {
    fontWeight: "bold",
    fontSize: 19,
    color: "white",
    marginLeft: "12%",
    textAlignVertical: "center",
  },
  CarInfoTitle: {
    backgroundColor: "#1c2e65",
    justifyContent: "center",
    width: screenWidth * 0.35,
  },
  carInfoText: {
    fontWeight: "bold",
    fontSize: 17,
    color: "white",
    marginBottom: 5,
  },
  carSubInfoText: {
    fontWeight: "bold",
    fontSize: 17,
    color: "#1c2e65",
    right: 10,
    textAlign: "right",
  },
});
