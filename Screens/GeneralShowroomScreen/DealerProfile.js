import React, { useEffect } from "react";
import { Image, StyleSheet, Text, View, FlatList } from "react-native";
import firestore from "@react-native-firebase/firestore";
import IonIcon from "react-native-vector-icons/Ionicons";
import LottieView from "lottie-react-native";
import Profile from "../../Assets/BlueProfileLogo.png";
import { useNavigation } from "@react-navigation/core";
import {
  autoCapitalize,
  screenHeight,
  screenWidth,
} from "../../Global/Dimension";
import HomeCard from "../../Component/CardViews/ProfileCard";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Modal } from "react-native";
const ShowroomDealerProfile = ({ route }) => {
  const param = route.params.item.data;
  const paramId = route.params.item.id;

  const [showroomCount, setshowroomCount] = useState(0);
  const [carCount, setcarCount] = useState(0);
  const [dataCar, setDataCar] = useState([]);
  const [modalData, setModalData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const fetchData = async () => {
    const ref = firestore().collection("Advertisments");
    await ref.get().then((querySnapshot) => {
      querySnapshot.forEach((documentSnapshot) => {
        let dealerId;
        if (typeof documentSnapshot.data().dealer.id == "string") {
          dealerId = documentSnapshot.data().dealer.id.split("/")[1];
        } else {
          dealerId = documentSnapshot
            .data()
            .dealer.id.id.toString()
            .trim();
        }
        const paramdealerId = paramId.toString();
        if (dealerId == paramdealerId) {
          arr.push(documentSnapshot.data());
        }
      });
      setDataCar(arr);
      setcarCount(arr.length);
    });
  };
  const onPressShowroomHandeler = (item) => {
    setVisible(false);
    navigation.navigate("DealerShowroomProfile", { item });
  };
  const _renderShowroomList = ({ item }) => {
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
            onPress={() => onPressShowroomHandeler(item)}
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
              {item.name}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  useEffect(() => {
    setLoading(true);
    setshowroomCount(param.showrooms.length);
    fetchData().then(() => setLoading(false));
    setModalData(route.params.item.data.showrooms);
  }, []);
  const modalVisible = () => {
    if (visible == false) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };
  const arr = [];
  const navigation = useNavigation();

  const _renderItem = ({ item }) => {
    return (
      <HomeCard
        pressHandler={() => onPressHandler(item)}
        title={autoCapitalize(
          `${item.vehicle.information.make +
            " " +
            item.vehicle.information.model +
            " " +
            item.vehicle.information.modelYear}`
        )}
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
  const _onEmpty = () => {
    return (
      <View
        style={{
          top: "40%",
          paddingBottom: "90%",
          flex: 1,
          flexDirection: "column",
          backgroundColor: "#fff",
        }}
      >
        <Text style={{ fontSize: 20 }}> No Cars Available </Text>
      </View>
    );
  };
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
          <View style={styles.searchHolder}>
            <IonIcon
              style={{ margin: 10 }}
              name="chevron-back-circle-sharp"
              color="white"
              size={35}
              onPress={() => navigation.goBack()}
            />
            <Text style={styles.headingText}>Dealer Profile</Text>
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
                source={Profile}
                style={{
                  width: 85,
                  height: 85,
                }}
              />
              <View style={{ width: 15 }}></View>
              <View style={{ flexDirection: "row" }}>
                <View
                  style={{
                    flexDirection: "column",
                    justifyContent: "flex-end",
                  }}
                >
                  <View style={styles.DealerName}>
                    <Text style={styles.carInfoText}>
                      {"\b"}

                      {autoCapitalize(param.name)}
                      {" \b"}
                    </Text>
                  </View>
                  <View style={{ flexDirection: "column" }}>
                    <Text style={styles.h1}>{param.showrooms[0].name}</Text>

                    <Text style={styles.txt1}>
                      {param.contactInformation[0]}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={{ height: 20 }}></View>
          </View>
          <View
            style={{
              flexDirection: "row",
              margin: 5,
              justifyContent: "space-evenly",
            }}
          >
            <Modal
              visible={visible}
              onRequestClose={() => setVisible(false)}
              containerStyle={{ backgroundColor: "rgba(0.5, 0.25, 0, 0.2)" }}
            >
              <TouchableOpacity
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
                renderItem={_renderShowroomList}
                data={modalData}
                keyExtractor={(item, index) => index.toString()}
              />
            </Modal>
            <TouchableOpacity
              style={{ flexDirection: "column" }}
              onPress={modalVisible}
            >
              <Text
                style={{
                  fontSize: 35,
                  fontWeight: "bold",
                  color: "grey",
                  textAlign: "center",
                }}
              >
                {showroomCount}
              </Text>

              <View
                style={{
                  margin: 10,
                  flexDirection: "row",
                  justifyContent: "flex-end",
                }}
                style={styles.CarInfoTitle}
              >
                <Text style={styles.countText}> SHOWROOMS </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={{ flexDirection: "column" }}>
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
                <Text style={styles.countText}> CARS </Text>
              </View>
            </TouchableOpacity>
          </View>

          <FlatList
            columnWrapperStyle={{ justifyContent: "space-around" }}
            numColumns={2}
            data={dataCar}
            ListEmptyComponent={_onEmpty}
            renderItem={_renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      )}
    </>
  );
};
export default ShowroomDealerProfile;
const styles = StyleSheet.create({
  Nav: { flexDirection: "row" },
  distance: {
    height: screenHeight * 0.035,
  },
  parent: {
    flexDirection: "column",
    backgroundColor: "#fff",
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
    flexDirection: "column",
    bottom: "1%",
    borderBottomWidth: 2,
    borderBottomColor: "#e0e0e0",
  },
  imageSize: {
    width: screenWidth * 0.35,
    height: screenHeight * 0.15,
  },
  h1: {
    color: "#1c2e65",
    fontSize: 16,
    fontWeight: "bold",
  },
  txt1: {
    color: "grey",
    fontSize: 13,
    fontWeight: "bold",
  },
  carInfoText: {
    fontWeight: "bold",
    fontSize: 17,
    color: "white",
    marginBottom: 5,
  },
  searchHolder: {
    backgroundColor: "#1c2e65",
    flexDirection: "row",
    flexGrow: 1,
  },
  countText: {
    fontWeight: "bold",
    fontSize: 17,
    color: "white",
    marginBottom: 5,
    textAlign: "center",
  },
  DealerName: {
    backgroundColor: "#1c2e65",
    justifyContent: "center",
  },
  CarInfoTitle: {
    backgroundColor: "#1c2e65",
    justifyContent: "center",
    width: screenWidth * 0.35,
  },
  heading: {
    color: "#565656",
    fontSize: 20,
    fontWeight: "bold",
    left: "5%",
  },
  border: {
    borderColor: "#1c2e65",
    borderWidth: 2,
    right: "13%",
  },
  headingText: {
    fontWeight: "bold",
    fontSize: 19,
    color: "white",
    marginLeft: "20%",
    textAlignVertical: "center",
  },
});
