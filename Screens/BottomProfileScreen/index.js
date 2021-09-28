import React, { memo, useContext, useEffect, useState } from "react";
import Drawer from "../../Assets/Drawer.png";

import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import firestore from "@react-native-firebase/firestore";
import IonIcon from "react-native-vector-icons/Ionicons";

import Profile from "../../Assets/BlueProfileLogo.png";
import { useNavigation } from "@react-navigation/core";
import { imageChecker, screenHeight, screenWidth } from "../../Global/Dimension";
import HomeCard from "../../Component/CardViews/HomeProductListCard";
import { Modal } from "react-native";
import { fetchSpecificDealer, getData } from "../../Data/FetchData";
import AuthContext from "../../Component/Authcontext";
import { ScrollView } from "react-native-gesture-handler";

const BottomProfileScreen = ({ route }) => {
  const authContext = useContext(AuthContext);
  const [param, setParam] = useState();
  const [carCount, setcarCount] = useState(0);
  const [dataCar, setDataCar] = useState([]);
  const [modalData, setModalData] = useState([]);
  const [userinfo, setUserInfo] = useState(null);
  const [image, setImage] = useState(undefined);

  const [visible, setVisible] = useState(false);
  const dealer = authContext.user;
  const fetchData = async () => {
    const ref = firestore().collection("Advertisments").orderBy('date','desc');
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

        const paramdealerId = authContext.user.toString();
        if (dealerId == paramdealerId) {
          arr.push(documentSnapshot.data());
        }
      });
      setDataCar(arr);
      setModalData(param.showrooms)
      setcarCount(arr.length);
    });
  };
  const modalVisible = () => {
    if (visible == false) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };
  useEffect(() => {
    fetchSpecificDealer(dealer).then((res) => {
      setParam(res.data());
    });

    fetchData();
    getData().then((data) => {
      setUserInfo(data);
      setImage(data.image);
    });
  }, []);

  const arr = [];

  const onPressHandler = (item) => {
    navigation.navigate("DetailCarScreen", { item,onBackHandler:onBackHandler });
  };

  const onBackHandler = (item) => {
    fetchData()
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
            // onPress={() => onPressHandler2(item)}
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
  const navigation = useNavigation();
  return (
    <ScrollView>
      <View style={styles.parent}>
        <View style={styles.searchHolder}>
          <IonIcon
            style={{ margin: 10 }}
            name="chevron-back-circle-sharp"
            color="white"
            size={35}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.headingText}> {param && param.name}</Text>
        </View>
        <Modal
          visible={visible}
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
            <Text style={{ color: "blue", fontSize: 18, fontWeight: "900" }}>
              Close
            </Text>
          </TouchableOpacity>

          <FlatList
            renderItem={_renderShowroomList}
            data={modalData}
            keyExtractor={(item, index) => index.toString()}
          />
        </Modal>

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
            style={styles.avatar}
            accessibilityLabel="Pic"
            source={{
              uri: imageChecker(image),
            }}
          />
            <View style={{ width: 15 }}></View>
            <View style={{ flexDirection: "row" }}>
              <View
                style={{ flexDirection: "column", justifyContent: "flex-end" }}
              >
                <View style={styles.DealerName}>
                  <Text style={styles.carInfoText}>
                    {"\b"}
                    {userinfo && userinfo.name.toUpperCase()}
                    {" \b"}
                  </Text>
                </View>
                <View style={{ flexDirection: "column" }}>
                  <Text style={styles.h1}>
                    {param && param.showrooms[0].name}
                  </Text>

                  <Text style={styles.txt1}>
                    {param && param.contactInformation[0]}
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
              {param && param.showrooms.length}
            </Text>

            <TouchableOpacity
              onPress={modalVisible}
              style={styles.CarInfoTitle}
            >
              <Text style={styles.countText}> SHOWROOMS </Text>
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
              <Text style={styles.countText}> CARS </Text>
            </View>
          </View>
        </View>
        <FlatList
          contentContainerStyle={{ alignSelf: "center" }}
          numColumns={2}
          data={dataCar}
          renderItem={_renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </ScrollView>
  );
};
export default memo(BottomProfileScreen);
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
    // width:40
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 63,
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
