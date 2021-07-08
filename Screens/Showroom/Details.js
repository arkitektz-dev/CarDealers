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
import { screenHeight, screenWidth } from "../../Global/Dimension";
import HomeCard from "../../Component/CardViews/HomeProductListCard";
import AuthContext from "../../Component/Authcontext";

const ShowroomDetailScreen = ({ route }) => {
  const item = route.params.item;
  const showroomId = route.params.item.id;
  const [dealerCount, setdealerCount] = useState(0);
  const [modalData, setModalData] = useState([]);
  const [carCount, setcarCount] = useState(0);
  const [dataCar, setDataCar] = useState([]);
  const [visible, setVisible] = useState(false);
  const authContext = useContext(AuthContext);

  const arr = [];

  useEffect(() => {
    fetchShowroomData();
    fetchData();
    // console.log(route);
    // console.log(authContext.user);
  }, []);

  // const AssociateShowroom = () => {
  //   const userRef = firestore()
  //     .collection("Users")
  //     .doc(route.params.item.id);

  //   const obj = {
  //     id: userRef,
  //     Name: route.params.item.name,
  //   };
  //   firestore()
  //     .collection("Users")
  //     .doc(authContext.user)
  //     .update(obj)
  //     .then(() => {
  //       alert("Showroom Associated!");
  //     });
  // };
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
        const paramShowroomId = showroomId.toString();
        if (showroomDataId == paramShowroomId)
          arr.push(documentSnapshot.data());
      });
      setDataCar(arr);
      setcarCount(arr.length);
    });
  };
  const fetchShowroomData = async () => {
    let dealersCount = 0;
    const ref = firestore().collection("Dealers");
    await ref.get().then((querySnapshot) => {
      querySnapshot.forEach((documentSnapshot) => {
        var a = documentSnapshot.data().showrooms.filter((s) => {
          if (s.id.id.trim() == showroomId) {
            return true;
          }
        });
        if (a.length > 0) {
          dealersCount++;
        }
      });
      setdealerCount(dealersCount);
    });
  };
  const modalVisible = () => {
    if (visible == false) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };
  const onPressHandler2 = (item) => {
    navigation.navigate("DealerProfile", { item });
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
            onPress={() => onPressHandler2(item)}
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
  const navigation = useNavigation();
  return (
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
            <Text style={{ color: "blue", fontSize: 18, fontWeight: "900" }}>
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
            source={{ uri: item.images[0] }}
            onPress={() => navigation.goBack()}
            style={{
              width: 85,
              height: 85,
              borderRadius: 85 / 2,
            }}
          />
          <View style={{ width: 15 }}></View>
          <View style={{ flexDirection: "column", justifyContent: "flex-end" }}>
            <View style={styles.DealerName}>
              <Text style={styles.carInfoText}> {item.name} </Text>
            </View>
            <View style={{ flexDirection: "column" }}>
              <Text style={styles.h1}>{item.contactInformation}</Text>
              <Text style={styles.txt1}>{item.location}</Text>
            </View>
          </View>
          {/* <Text onPress={AssociateShowroom}> ID </Text> 
       {authContext.user != undefined ? (
            <Text>Hey</Text>
          ) : (
            <Text>Not Signed IN</Text>
          )} */}
        </View>
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
          <TouchableOpacity activeOpacity={0} style={styles.CarInfoTitle}>
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
      <FlatList
        contentContainerStyle={{
          alignSelf: "center",
        }}
        numColumns={2}
        data={dataCar}
        renderItem={_renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};
export default memo(ShowroomDetailScreen);
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
    height: screenHeight * 0.15,
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
});
