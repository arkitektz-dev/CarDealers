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
          backgroundColor: "#f8f8f8",
          padding: 10,
          marginBottom: 10,
        }}
      >
        <Text style={styles.texthead}>Our Services</Text>
      </View>
      <View
        style={{
          justifyContent: "space-evenly",
          flexDirection: "row",
          flex: 1,
          padding: 10,
        }}
      >
        <TouchableOpacity onPress={() => naivgation.navigate("CarStack")}>
          <View style={styles.container}>
            <FontAwsome name="car" size={35} color="#1e2d64" />
            <Text style={styles.text}>CAR</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => naivgation.navigate("DealerStack")}>
          <View style={styles.container}>
            <FontAwsome name="user" size={35} color="#1e2d64" />
            <Text style={styles.text}>DEALER</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => naivgation.navigate("ShowroomStack")}>
          <View style={styles.container}>
            <FontAwsome name="building" size={35} color="#1e2d64" />
            <Text style={styles.text}>SHOWROOM</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => naivgation.navigate("DemandCars")}>
          <View style={styles.container}>
            <Octicons name="request-changes" size={35} color="#1e2d64" />
            <Text style={styles.text}>DEMAND</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: "space-evenly",
    padding: 15,
    width: 95,
    alignItems: "center",
    borderColor: "#b3b5b8",
    borderWidth: 0.3,
    borderRadius: 5,
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
    color: "#000000",
    fontSize: 10,
    width: "100%",
    fontWeight: "900",
    textAlign: "center",
  },
});
export default memo(CategoryCard);
