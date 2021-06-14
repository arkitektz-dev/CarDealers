import React from "react";
import Navbar from "../../Component/Navbar.js/Index";
import { TouchableOpacity } from "react-native";
import { Image } from "react-native";
import { Text } from "react-native";
import { StyleSheet, View } from "react-native";
import Back from "../../Assets/NewAsset/backButton.png";

const MainScreen = ({ navigation }) => {
  return (
    <>
      <View style={styles.parent}>
        <Navbar
          style={styles.nav}
          Title="HomeScreen"
          source={Back}
          backStyle={styles.back}
          goBack={() => navigation.goBack()}
        />
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
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              Terms of use
            </Text>
            <Text style={{ fontSize: 18 }}> and </Text>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              Privacy Policy
            </Text>
          </View>
        </View>
      </View>
    </>
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
  nav: {
    backgroundColor: "#fff",
    flexDirection: "row",
    width: "100%",
    justifyContent: "flex-start",
    height: 49,
  },
  back: { width: 30, height: 20, top: 14, resizeMode: "contain" },

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
