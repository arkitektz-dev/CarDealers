import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  Image,
} from "react-native";
import firestore from "@react-native-firebase/firestore";
import { useToast } from "native-base";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AntDesign from "react-native-vector-icons/AntDesign";

import Back from "../../Assets/NewAsset/backButton.png";

import { Button } from "../../Component/Button/Index";
import { useNavigation } from "@react-navigation/core";
import { HelperText, TextInput } from "react-native-paper";
import { screenHeight, screenWidth } from "../../Global/Dimension";

import { storeData } from "../../Data/FetchData";
import Navbar from "../../Component/Navbar.js/Index";
import AuthContext from "../../Component/Authcontext";
import { ActivityIndicator } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { marginBottom } from "styled-system";

const buttonWidth = screenWidth * 0.7;
const buttonHeight = screenWidth * 0.11;

const logoHeight = screenHeight * 0.2;
const titleHeight = screenHeight * 0.1;

const titleWidth = screenWidth * 0.6;
const logoWidth = screenWidth * 0.5;

export const Walkthrough = () => {
  const [user, setUser] = useState({ name: "", password: "" });
  const [auth, setAuth] = useState(false);
  const [secure, setSecure] = useState(true);
  const [emptyFieldError, setEmptyFieldError] = useState(false);
  const [loader, setLoader] = useState(false);
  const toast = useToast();
  const callme = () => {
    setLoader(false);
    setTimeout(() => {
      toast.show({
        title: "Login Failed",
        status: "error",
        description: "Invalid Username or Password",
        duration: 1500,
        minWidth: "90%",
        isClosable: false,
      });
    }, 1000);
  };

  const navigation = useNavigation();
  const offsetKeyboard = Platform.select({
    ios: 0,
    android: 10,
  });
  const Login = async () => {
    setLoader(true);
    const ref = firestore().collection("Users");

    if (user.name == "" || user.password == "") {
      setEmptyFieldError(true);
      toast.show({
        title: "Login Failed",
        status: "error",
        description: "Email & Password required",
        duration: 1500,
        minWidth: "90%",
        isClosable: false,
      });
    } else {
      await ref
        .where("username", "==", user.name.toLocaleLowerCase())
        .where("password", "==", user.password.toLocaleLowerCase())
        .get()
        .then((querySnapshot) => {
          if (querySnapshot.size == 0) {
            console.log("error");
            callme();
          } else
            querySnapshot.forEach((doc) => {
              const a = { ...doc.data() };
              a.id = doc.id;
              a.isSignedIn = true;
              const b = {
                id: a.id,
                email: a.email,
                image: a.image,
                name: a.name,
                isSignedIn: a.isSignedIn,
                password: a.password,
                phone: a.phone,
                username: a.username,
                DealerId: `${a.DealerId._documentPath._parts[1]}`,
              };

              storeData(b);
              navigation.replace("Home");

              setLoader(false);
            });
        })
        .catch((error) => {
          setLoader(false);

          console.log("Error getting data:", error);
        });
    }
    setLoader(false);
  };

  return (
    <ScrollView
      // style={styles.container}
      contentContainerStyle={styles.container}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "android" ? "height" : "padding"}
        keyboardVerticalOffset={offsetKeyboard}
        style={{ flex: 1 }}
      >
        <TouchableOpacity
          style={{ alignSelf: "flex-end", marginTop: 20 }}
          onPress={() => {
            navigation.navigate("Home");
          }}
        >
          <AntDesign name="close" color={"grey"} size={28} />
        </TouchableOpacity>

        <View style={styles.inputContainer}>
          <View style={styles.logoContainer}>
            <Text style={styles.headText}>Sign In To Continue</Text>
          </View>
          <View>
            <Image
              source={require("../../Assets/NewAsset/DrawerLogo.png")}
              style={styles.image}
            />
            <TouchableOpacity
              style={styles.touchButton}
              onPress={() => {
                navigation.navigate("LoginScreen");
              }}
            >
              <FontAwesome name="envelope" color={"#373737"} size={22} />
              <Text
                style={{ fontSize: 17, fontWeight: "700", color: "#373737" }}
              >
                Continue with Email
              </Text>
              <FontAwesome
                name="user-plus"
                color={"black"}
                size={22}
                style={{ opacity: 0 }}
              />
            </TouchableOpacity>
            <View style={styles.distance}></View>
            <TouchableOpacity
              style={styles.touchButton}
              onPress={() => {
                navigation.navigate("SignupScreen");
              }}
            >
              <FontAwesome name="user-plus" color={"#373737"} size={22} />
              <Text
                style={{ fontSize: 17, fontWeight: "700", color: "#373737" }}
              >
                Create an account
              </Text>
              <FontAwesome
                name="user-plus"
                color={"black"}
                size={22}
                style={{ opacity: 0 }}
              />
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.BorderText}>
              By continuing you agree to our
            </Text>
            <View style={styles.privacy}>
              <TouchableOpacity>
                <Text
                  style={{ fontWeight: "700", color: "#373737", fontSize: 18 }}
                >
                  Terms of use
                </Text>
              </TouchableOpacity>
              <Text style={{ color: "#373737", fontSize: 18 }}> and </Text>
              <TouchableOpacity>
                <Text
                  style={[
                    { fontWeight: "700", color: "#373737", fontSize: 18 },
                  ]}
                >
                  Privacy Policy
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  header: {
    color: "white",
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
  },
  image: {
    height: 80,
    width: "68%",
    resizeMode: "contain",
    marginBottom: 60,
    alignSelf: "center",
    // marginTop:-120
  },
  background: {
    alignSelf: "center",
    backgroundColor: "#1e2d64",
    width: buttonWidth,
    height: buttonHeight,
    justifyContent: "center",
    borderRadius: 5,
  },
  errorSpace: {
    top: "3%",
  },
  text_h2: {
    color: "white",
    fontSize: 15,
    fontWeight: "400",
    textAlign: "center",
    top: 7,
  },
  imageBackground: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
  },
  distance: {
    height: screenHeight * 0.02,
  },
  inputContainer: {
    width: "100%",
    flex: 1,
    justifyContent: "space-around",
    marginBottom: 25,
  },
  forgotpassContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 6,
  },
  forgotpassText: {
    color: "#000000",
    fontWeight: "700",
    fontSize: 14,
    textDecorationLine: "underline",
  },
  signupContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  signupText: {
    color: "#000000",
    fontWeight: "700",
    fontSize: 14,
  },
  signupButtonText: {
    color: "#000000",
    fontWeight: "700",
    fontSize: 14,
    textDecorationLine: "underline",
  },
  skipButton: {
    color: "#fff",
    textAlignVertical: "center",
    textAlign: "center",
    backgroundColor: "#1e2d64",
    width: buttonWidth,
    height: buttonHeight,
    justifyContent: "center",
    borderRadius: 5,
  },
  container: {
    flex: 1,
    flexDirection: "column",
    paddingHorizontal: 30,
    backgroundColor: "white",
  },
  nav: {
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "flex-start",
    height: 49,
  },
  back: { width: 30, height: 20, top: 14, resizeMode: "contain" },
  buttonContainer: {
    width: "100%",
    marginTop: 28,
  },
  logoContainer: {
    // marginTop: 20,
    marginBottom: -40,
  },
  BorderText: {
    fontSize: 18,

    color: "#373737",
    textAlign: "center",
  },
  privacy: {
    flexDirection: "row",
    alignSelf: "center",
  },
  headText: {
    fontSize: 22,

    fontWeight: "700",
    color: "grey",
    textAlign: "center",
  },
  titleContainer: {
    alignSelf: "center",
    height: titleHeight,
    width: titleWidth,
  },
  touchButton: {
    width: "100%",
    backgroundColor: "white",
    height: 45,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 22,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#373737",
  },
});
