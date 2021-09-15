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

import Back from "../../Assets/NewAsset/backButton.png";

import { Button } from "../../Component/Button/Index";
import { useNavigation } from "@react-navigation/core";
import { HelperText, TextInput } from "react-native-paper";
import { screenHeight, screenWidth } from "../../Global/Dimension";

import { storeData } from "../../Data/FetchData";
import Navbar from "../../Component/Navbar.js/Index";
import AuthContext from "../../Component/Authcontext";
import { ActivityIndicator } from "react-native";

const buttonWidth = screenWidth * 0.7;
const buttonHeight = screenWidth * 0.11;

const logoHeight = screenHeight * 0.2;
const titleHeight = screenHeight * 0.1;

const titleWidth = screenWidth * 0.6;
const logoWidth = screenWidth * 0.5;

export const LoginScreen = () => {
  const [user, setUser] = useState({ name: "", password: "" });
  const [auth, setAuth] = useState(false);
  const [secure, setSecure] = useState(true);
  const [emptyFieldError, setEmptyFieldError] = useState(false);
  const [loader, setLoader] = useState(false);

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
    } else {
      await ref
        .where("username", "==", user.name.toLocaleLowerCase())
        .where("password", "==", user.password.toLocaleLowerCase())
        .get()
        .then((querySnapshot) => {
          if (querySnapshot.size == 0) {
            alert("Invalid Username or Password");
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
        <View style={styles.inputContainer}>
          {/* <View style={styles.logoContainer}>
            <Text style={styles.headText}>Sign In</Text>
          </View> */}
          <Image
            source={require("../../Assets/NewAsset/DrawerLogo.png")}
            style={styles.image}
          />
          <View>
            <TextInput
              renderToHardwareTextureAndroid
              returnKeyType="next"
              placeholderTextColor="#000000"
              label="Username"
              mode="outlined"
              // fla

              theme={{
                colors: {
                  primary: "#1B3661",
                  placeholder: "grey",
                  text: "black",
                },
              }}
              dense="20"
              outlineColor="#CCCCCC"
              focus
              style={{ backgroundColor: "white" }}
              onChangeText={(e) => {
                setEmptyFieldError(false), setUser({ ...user, name: e });
              }}
            />
          </View>
          <View style={styles.distance}></View>
          <TextInput
            right={
              <TextInput.Icon name="eye" onPress={() => setSecure(!secure)} />
            }
            secureTextEntry={secure}
            label="Password"
            mode="outlined"
            theme={{
              colors: {
                primary: "#1B3661",
                placeholder: "grey",
                text: "black",
              },
            }}
            dense="20"
            outlineColor="#CCCCCC"
            style={{ backgroundColor: "white" }}
            onChangeText={(e) => {
              setEmptyFieldError(false), setUser({ ...user, password: e });
            }}
          />
          <View style={styles.forgotpassContainer}>
            <Text
              style={styles.forgotpassText}
              onPress={() => navigation.navigate("ForgotPassword")}
            >
              Forgot Password?
            </Text>

            <Text
              style={styles.forgotpassText}
              onPress={() => navigation.navigate("Home")}
            >
              Skip to home
            </Text>
          </View>

          <View style={styles.buttonContainer}>
            <Button
              title={
                loader ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  "Login"
                )
              }
              onPressHandler={Login}
              style={styles.background}
            />
          </View>
          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Signup for an account? </Text>
            <Text
              style={styles.signupButtonText}
              onPress={() => {
                navigation.navigate("SignupScreen");
              }}
            >
              {" "}
              Signup
            </Text>
          </View>
          {/* {emptyFieldError ? (
            <HelperText
              type="error"
              style={{ color: "red", fontWeight: "600", textAlign: "left" }}
            >
              Field can not be empty!
            </HelperText>
          ) : null} */}
        </View>

        {/* <View style={styles.forgotpassContainer}>
          <Text
            style={styles.forgotpassText}
            onPress={() => navigation.navigate("ForgotPassword")}
          >
            Forgot Password?
          </Text>
          <View style={{ width: "15%" }}></View>
        </View> */}

        {/* <View style={styles.buttonContainer}>
          <Text
            style={styles.skipButton}
            onPress={() => {
              navigation.navigate("Home");
            }}
          >
            SKIP
          </Text>
        </View> */}
        {/* </View> */}
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
    width: "100%",
    resizeMode: "contain",
    marginBottom: 60,
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
  inputContainer: { width: "100%", flex: 1, justifyContent: "center" },
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
    marginBottom: 70,
  },
  headText: {
    fontSize: 28,

    fontWeight: "600",
    color: "#000000",
    textAlign: "center",
  },
  titleContainer: {
    alignSelf: "center",
    height: titleHeight,
    width: titleWidth,
  },
});
