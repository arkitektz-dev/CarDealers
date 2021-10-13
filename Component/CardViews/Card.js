import React from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import colors from "../../config/colors";
import AppText from "../AppText";
import AppLogo from "../../Assets/loading.png";
function Card({ title, subTitle, image, onPressHandler }) {
  const [animating, setanimating] = React.useState(false);
  return (
    <TouchableOpacity style={styles.card} onPress={onPressHandler}>
      <Image
        style={styles.image}
        source={{ uri: image }}
        loadingIndicatorSource={AppLogo}
      ></Image>
      <ActivityIndicator
        color="#1c2e65"
        style={{ position: "absolute", zIndex: 10, top: "30%", left: "42.5%" }}
        size={"large"}
        animating={animating}
      />

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
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
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
