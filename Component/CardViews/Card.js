import React from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import colors from "../../config/colors";
import AppText from "../AppText";
function Card({ title, subTitle, image, onPressHandler }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPressHandler}>
      <Image style={styles.image} source={{ uri: image }}></Image>
      <View style={styles.detailsContainer}>
        <AppText style={styles.title} numberOfLines={1}>
          {title}
        </AppText>
        <AppText style={styles.subTitle} numberOfLines={2}>
          {subTitle}
        </AppText>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    backgroundColor: colors.white,
    overflow: "hidden",
    margin: 10,
    shadowColor: "#470000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    elevation: 2,
  },
  detailsContainer: {
    padding: 10,
  },
  image: {
    width: "100%",
    height: 200,
  },
  subTitle: {
    textAlign: "left",
    color: "red",
    fontSize: 14,
    fontWeight: "bold",
  },
  title: {
    textAlign: "left",
    color: "#565656",
    fontSize: 14,
    fontWeight: "bold",
  },
});
export default Card;
