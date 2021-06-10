import React from "react";
import LottieView from "lottie-react-native";
import { StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/core";
import IonIcon from "react-native-vector-icons/Ionicons";

const LottieLoader = () => {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.searchHolder}>
        <IonIcon
          style={{ margin: 5 }}
          name="chevron-back-circle-sharp"
          color="white"
          size={35}
          onPress={() => navigation.goBack()}
        />
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
    color: "#1c2e65",
    fontWeight: "bold",
  },
  searchHolder: {
    backgroundColor: "#1c2e65",
    flexDirection: "row",
    height: 49,
  },
});
