import React, { useState } from "react";
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import firestore from "@react-native-firebase/firestore";

import BackgroundImage from "../../Assets/loginBackground.png";
import AppLogo from "../../Assets/AppLogo.png";

import { Button } from "../../Component/Button/Index";
import { useNavigation } from "@react-navigation/core";
import { HelperText, TextInput } from "react-native-paper";
import { screenHeight, screenWidth } from "../../Global/Dimension";

import { storeData } from "../../Data/FetchData";

const buttonWidth = screenWidth * 0.7;
const buttonHeight = screenWidth * 0.11;

const logoHeight = screenHeight * 0.2;
const titleHeight = screenHeight * 0.1;

const titleWidth = screenWidth * 0.6;
const logoWidth = screenWidth * 0.5;

export const LoginScreen = () => {
  const [user, setUser] = useState({ name: "", password: "" });
  const [auth, setAuth] = useState(false);
  const [emptyFieldError, setEmptyFieldError] = useState(false);
  const navigation = useNavigation();

  const Login = async () => {
    const ref = firestore().collection("Users");

    if (user.name == "" || user.password == "") {
      setEmptyFieldError(true);
    } else {
      ref
        .where("username", "==", user.name)
        .where("password", "==", user.password)
        .get()
        .then((querySnapshot) => {
          if (querySnapshot.size == 0) {
            alert("Invalid Username or Password");
          } else
            querySnapshot.forEach((doc) => {
              const a = { ...doc.data() };
              a.id = doc.id;
              a.isSignedIn = true;
              storeData(a);
              navigation.replace("Home");
            });
        })
        .catch((error) => {
          alert("Error getting data: ", error);
        });
    }
  };

  return (
    <ImageBackground
      blurRadius={2}
      source={BackgroundImage}
      style={styles.imageBackground}
    >
      <View style={styles.logoContainer}>
        <Image
          source={AppLogo}
          resizeMode="contain"
          style={{ width: 300, height: 300, alignSelf: "center" }}
        />
      </View>

      <View style={styles.titleContainer}>
        <View style={{ height: screenWidth * 0.07 }}></View>

        <Text style={styles.header}>Welcome Back</Text>
        <Text style={styles.text_h2}>Signin to Continue</Text>
      </View>
      <View style={{ height: screenWidth * 0.07 }}></View>
      <View style={styles.inputContainer}>
        <View>
          <TextInput
            renderToHardwareTextureAndroid
            returnKeyType="next"
            placeholderTextColor="white"
            mode="flat"
            label="Username:"
            underlineColor="#fff"
            underlineColorAndroid="#fff"
            theme={{
              colors: {
                primary: "white",
                placeholder: "#ffffff",
                text: "white",
              },
            }}
            style={{
              backgroundColor: "transparent",
              color: "#fff",
            }}
            onChangeText={(e) => {
              setEmptyFieldError(false), setUser({ ...user, name: e });
            }}
          />
        </View>
        <View style={styles.distance}></View>
        <TextInput
          secureTextEntry
          placeholderTextColor="white"
          label="Password:"
          theme={{
            colors: { primary: "white", placeholder: "#ffffff", text: "white" },
          }}
          underlineColor="#fff"
          underlineColorAndroid="#fff"
          style={{ backgroundColor: "transparent" }}
          onChangeText={(e) => {
            setEmptyFieldError(false), setUser({ ...user, password: e });
          }}
        />
      </View>
      <View style={styles.forgotpassContainer}>
        <Text style={styles.forgotpassText}>Forgot Password?</Text>
        <View style={{ width: "15%" }}></View>
      </View>
      <View style={styles.distance}></View>
      {emptyFieldError ? (
        <HelperText
          type="error"
          style={{ color: "#fff", fontWeight: "500", textAlign: "center" }}
        >
          Field can not be empty!
        </HelperText>
      ) : null}
      <View style={styles.buttonContainer}>
        <Button
          title="Login"
          onPressHandler={Login}
          style={styles.background}
        />
      </View>

      <View style={styles.signupContainer}>
        <Text
          style={styles.signupText}
          onPress={() => {
            navigation.navigate("SignupScreen");
          }}
        >
          Signup for an account?
        </Text>
      </View>
      <View style={styles.distance}></View>
      <View style={styles.signupContainer}>
        <Text
          style={styles.signupText}
          onPress={() => {
            navigation.navigate("Home");
          }}
        >
          SKIP
        </Text>
      </View>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  header: {
    color: "white",
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
  },
  background: {
    alignSelf: "center",
    backgroundColor: "red",
    width: buttonWidth,
    height: buttonHeight,
    justifyContent: "center",
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
    height: null,
    width: null,
  },
  distance: {
    height: screenHeight * 0.02,
  },
  inputContainer: { width: screenWidth * 0.7, alignSelf: "center" },
  forgotpassContainer: {
    flexDirection: "row",
    flex: 0.1,
    top: 15,
    alignSelf: "flex-end",
  },
  forgotpassText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
  },
  signupContainer: {
    flexDirection: "row",
    flex: 0.1,
    top: "15%",
    alignSelf: "center",
  },
  signupText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
  },
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  buttonContainer: {
    flexDirection: "row",
    flex: 0.2,
    justifyContent: "center",
    top: 15,
  },
  logoContainer: {
    height: logoHeight,
    width: logoWidth,
    justifyContent: "center",
    marginTop: 10,
    alignSelf: "center",
  },
  titleContainer: {
    alignSelf: "center",
    height: titleHeight,
    width: titleWidth,
  },
});
