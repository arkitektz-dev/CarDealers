import { useNavigation } from "@react-navigation/core";
import React, { memo } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

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
        }}
      >
        <TouchableOpacity onPress={() => naivgation.navigate("CarStack")}>
          <View style={styles.container}>
            <Text style={styles.text}>CAR</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => naivgation.navigate("DealerStack")}>
          <View style={styles.container}>
            <Text style={styles.text}>DEALER</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => naivgation.navigate("ShowroomStack")}>
          <View style={styles.container}>
            <Text style={styles.text}>SHOWROOM</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#1e2d64",
    borderRadius: 25,
    padding: 5,
    margin: 5,
    justifyContent: "flex-start",
    overflow: "hidden",
    width: screenWidth * 0.3,
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
    color: "#fff",
    fontSize: 16,
    fontWeight: "900",
    textAlignVertical: "center",
    textAlign: "center",
    paddingBottom: 5,
  },
});
export default memo(CategoryCard);
