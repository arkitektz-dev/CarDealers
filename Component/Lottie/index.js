import React from "react";
import LottieView from "lottie-react-native";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/core";

const LottieLoader = () => {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.searchHolder}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            left: 10,
            top: 10,
            backgroundColor: "#fff",
            width: 35,
            height: 35,
            borderRadius: 35 / 2,
          }}
        ></TouchableOpacity>
        <View style={styles.distance}></View>
      </View>
      <LottieView
        source={require("../../Assets/login.json")}
        autoPlay
        resizeMode="contain"
        style={{
          alignSelf: "center",
          width: 500,
          height: 500,
        }}
        hardwareAccelerationAndroid={true}
      />
      <Text onPress={() => navigation.navigate("Login")} style={styles.text}>
        Sign In to Continue
      </Text>
    </View>
  );
};
export default LottieLoader;
const styles = StyleSheet.create({
  text: {
    textAlign: "center",
    fontSize: 24,
    color: "red",
    fontWeight: "bold",
  },
  searchHolder: {
    backgroundColor: "red",
    flexDirection: "row",
    height: 49,
  },
});
