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
import HomeCard from "../../Component/CardViews/HomeProductListCard";
import { useState } from "react";
const ShowroomDealerProfile = ({ route }) => {
  const param = route.params.item.data;

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

        const paramdealerId = param.id.toString();
        if (dealerId == paramdealerId) {
          arr.push(documentSnapshot.data());
        }
      });
      setDataCar(arr);
      setcarCount(arr.length);
    });
  };
  useEffect(() => {
    setshowroomCount(param.showrooms.length);
    fetchData().then(() => setLoading(false));
    console.log(route.params.item.id);
  }, []);
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
                    {/* {param.showrooms.map((item) => {
                      return <Text style={styles.h1}>{item.name}</Text>;
                    })} */}

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
            <View style={{ flexDirection: "column" }}>
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
              <View style={styles.CarInfoTitle}>
                <Text style={styles.countText}> SHOWROOMS </Text>
              </View>
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
                <Text style={styles.countText}> CARS </Text>
              </View>
            </View>
          </View>
          {dataCar.length > 0 ? (
            <FlatList
              contentContainerStyle={{
                alignSelf: "center",
                backgroundColor: "#fff",
              }}
              numColumns={2}
              data={dataCar}
              renderItem={dataCar.length > 0 ? _renderItem : _onEmpty}
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
