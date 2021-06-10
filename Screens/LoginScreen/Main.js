import React from "react";
import { TouchableWithoutFeedback } from "react-native";
import { TouchableOpacity } from "react-native";
import { Image } from "react-native";
import { Text } from "react-native";
import { StyleSheet, View } from "react-native";

const MainScreen = ({ navigation }) => {
  return (
    <View style={styles.parent}>
      <View
        style={{
          justifyContent: "center",
          height: "15%",
        }}
      >
        <Text style={styles.head}>Sign In To Contine</Text>
      </View>

      <View>
        <Image
          source={require("../../Assets/NewAsset/DrawerLogo.png")}
          style={styles.image}
        />
      </View>
      <View>
        <View style={{ height: 25 }}></View>
        <TouchableOpacity
          activeOpacity={0}
          style={styles.border}
          onPress={() => navigation.navigate("LoginScreen")}
        >
          <Image
            source={require("../../Assets/NewAsset/Email.png")}
            style={styles.icon}
          />
          <Text
            style={{
              color: "#000000",
              fontWeight: "900",
              textAlign: "center",
              textAlignVertical: "center",
            }}
          >
            Continue with Username
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: "column",
          flex: 1,
          justifyContent: "flex-end",
          bottom: "5%",
        }}
      >
        <Text style={{ fontSize: 18 }}>By Continuning you agree to our </Text>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>Terms of use</Text>
          <Text style={{ fontSize: 18 }}> and </Text>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            Privacy Policy
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {
    backgroundColor: "#fff",
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },
  image: {
    width: 300,
    height: 120,
    resizeMode: "contain",
  },
  icon: {
    width: 25,
    height: 30,
    resizeMode: "contain",
    margin: 5,
  },
  icon1: {
    width: 20,
    height: 30,
    resizeMode: "contain",
    margin: 5,
  },
  head: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#333",
  },
  border: {
    borderWidth: 2,
    borderColor: "#000000",
    paddingHorizontal: 20,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
});

export default MainScreen;
