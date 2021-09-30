import { useNavigation } from "@react-navigation/core";
import React, { memo } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FontAwsome from "react-native-vector-icons/FontAwesome";
import Octicons from "react-native-vector-icons/Octicons";
import { screenWidth } from "../../Global/Dimension";

const CategoryCard = () => {
  const naivgation = useNavigation();
  return (
    <View style={{ flexDirection: "column" }}>
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "#F8F8F8",
          width: "100%",
          paddingBottom: 10,
          paddingTop: 25,
          paddingHorizontal: 20,
        }}
      >
        <Text style={styles.texthead}>Our Services</Text>
      </View>
      <View
        style={{
          justifyContent: "space-evenly",
          flexDirection: "row",
          flex: 1,
          paddingVertical: 15,
          paddingHorizontal: 20,
        }}
      >
        <TouchableOpacity
          style={styles.container}
          onPress={() => naivgation.navigate("CarStack")}
        >
          {/* <View style={styles.container}> */}
          <FontAwsome name="car" size={35} color="#1e2d64" />
          <Text style={styles.text}>CAR</Text>
          {/* </View> */}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.container}
          onPress={() => naivgation.navigate("DealerStack")}
        >
          {/* <View style={styles.container}> */}
          <FontAwsome name="user" size={35} color="#1e2d64" />
          <Text style={styles.text}>DEALERS</Text>
          {/* </View> */}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.container}
          onPress={() => naivgation.navigate("ShowroomStack")}
        >
          {/* <View style={styles.container}> */}
          <FontAwsome name="building" size={35} color="#1e2d64" />
          <Text style={styles.text}>SHOWROOM</Text>
          {/* </View> */}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.container}
          onPress={() => naivgation.navigate("DemandCars")}
        >
          {/* <View style={styles.container}> */}
          <Octicons name="request-changes" size={35} color="#1e2d64" />
          <Text style={styles.text}>DEMAND</Text>
          {/* </View> */}
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: "space-evenly",
    paddingVertical: 15,
    width: "23%",
    alignItems: "center",
    borderColor: "#b3b5b8",
    borderWidth: 0.3,
    borderRadius: 5,
    height: 80,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  texthead: {
    color: "#333",
    fontSize: 19,
    fontWeight: "bold",
    textAlignVertical: "center",
    textAlign: "center",
  },
  text: {
    color: "black",
    fontSize: 10,
    width: "100%",

    textAlign: "center",
    fontFamily: "Roboto-Medium",
  },
});
export default memo(CategoryCard);
