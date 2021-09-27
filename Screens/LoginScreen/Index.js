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

import Back from "../../Assets/NewAsset/backButton.png";
import Ionicons from "react-native-vector-icons/Ionicons";

import { Button } from "../../Component/Button/Index";
import { useNavigation } from "@react-navigation/core";
import { HelperText, TextInput } from "react-native-paper";
import { screenHeight, screenWidth } from "../../Global/Dimension";

import { storeData } from "../../Data/FetchData";
import Navbar from "../../Component/Navbar.js/Index";
import AuthContext from "../../Component/Authcontext";
import { ActivityIndicator } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

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
        description: "Username & Password required",
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
          style={styles.searchHolder}
          onPress={() => navigation.goBack()}
        >
          <Ionicons
            style={{ marginRight: 8 }}
            name="chevron-back-sharp"
            color="#000000"
            size={28}
            onPress={() => navigation.goBack()}
          />
          <Text style={{ color: "#000000", fontSize: 18 }}>Sign in</Text>
        </TouchableOpacity>
        <View style={styles.inputContainer}>
          <View style={styles.logoContainer}>
            <Text style={styles.headText}>Sign in to Car Dealer</Text>
          </View>

          <View>
            <Text style={{ color: "#000000", fontSize: 18 }}>Username</Text>
            <TextInput
              renderToHardwareTextureAndroid
              returnKeyType="next"
            
              placeholder="Example11"
              mode="fiat"

              theme={{
                colors: {
                  primary: "#1B3661",
                  placeholder: "grey",
                  text: "black",
                },
              }}
              dense
              outlineColor="#CCCCCC"
              focus
              style={{ backgroundColor: "white" }}
              onChangeText={(e) => {
                setEmptyFieldError(false), setUser({ ...user, name: e });
              }}
            />
          </View>
          <View style={styles.distance}></View>
          <Text style={{ color: "#000000", fontSize: 18 }}>Password</Text>
          <TextInput
            right={
              <TextInput.Icon name="eye" onPress={() => setSecure(!secure)} />
            }
            secureTextEntry={secure}
            placeholder="Enter Password"
            mode="fiat"
            theme={{
              colors: {
                primary: "#1B3661",
                placeholder: "grey",
                text: "black",
              },
            }}
            dense
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
          </View>

          <View style={styles.buttonContainer}>
            <Button
              title={
                loader ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  "Sign in"
                )
              }
              onPressHandler={Login}
              style={styles.background}
            />
          </View>
          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Don't have an account? </Text>
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
  searchHolder: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    marginLeft:-9
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
  inputContainer: { width: "100%", flex: 1 },
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
    fontWeight: "600",
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
    paddingHorizontal: 25,
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
    marginBottom: 40,
    marginTop: 20,
  },
  headText: {
    fontSize: 25,

    fontWeight: "700",
    color: "#373737",
  },
  titleContainer: {
    alignSelf: "center",
    height: titleHeight,
    width: titleWidth,
  },
});
