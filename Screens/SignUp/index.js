import React, { useState } from "react";
import auth from "@react-native-firebase/auth";
import { TextInput } from "react-native-paper";
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Button } from "../../Component/Button/Index";
import { DismissKeyboard } from "../../Component/KeyboardDismiss";
import { useNavigation } from "@react-navigation/core";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const logoHeight = screenHeight * 0.3;
const titleHeight = screenHeight * 0.1;

const titleWidth = screenWidth * 0.6;
const logoWidth = screenWidth * 0.5;

export const SignupScreen = () => {
  const [user, setUser] = useState({ email: "", password: "" });

  const Signup = async () => {
    auth()
      .createUserWithEmailAndPassword(user.email, user.password)
      .then(() => {
        console.log("User account created & signed in!");
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          alert("That email address is already in use!");
        }

        if (error.code === "auth/invalid-email") {
          alert("That email address is invalid!");
        }

        console.error(error);
      });
  };
  const navigation = useNavigation();
  return (
    <DismissKeyboard>
      <ImageBackground
        blurRadius={2}
        source={{
          uri:
            "https://reactnativecode.com/wp-content/uploads/2017/10/Guitar.jpg",
        }}
        style={styles.imageBackground}
      >
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <Text style={{ color: "red", textAlign: "center" }}>Hey</Text>
          </View>

          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>Register User</Text>
          </View>
          <View style={{ height: screenWidth * 0.05 }}></View>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Email"
              placeholderTextColor="white"
              // style={styles.textInput}
              mode="flat"
              label="Email:"
              underlineColor="#fff"
              underlineColorAndroid="#fff"
              theme={{
                colors: {
                  primary: "white",
                  placeholder: "#ffffff",
                  text: "white",
                },
              }}
              style={{ backgroundColor: "transparent", color: "#fff" }}
              onChangeText={(e) => setUser({ ...user, email: e })}
            />
            <View style={styles.distance}></View>
            <TextInput
              placeholder="Password"
              placeholderTextColor="white"
              label="Password:"
              theme={{
                colors: {
                  primary: "white",
                  placeholder: "#ffffff",
                  text: "white",
                },
              }}
              underlineColor="#fff"
              underlineColorAndroid="#fff"
              style={styles.textInput}
              style={{ backgroundColor: "transparent" }}
              onChangeText={(e) => setUser({ ...user, password: e })}
            />
          </View>

          <View style={styles.buttonContainer}>
            <Button title="Register" onLogin={Signup} />
          </View>
          <View style={styles.signupContainer}>
            <Text
              style={styles.signupText}
              onPress={() => navigation.navigate("LoginScreen")}
            >
              Already have a account ?
            </Text>
          </View>
        </View>
      </ImageBackground>
    </DismissKeyboard>
  );
};
const styles = StyleSheet.create({
  distance: {
    height: screenHeight * 0.02,
  },
  titleText: {
    color: "white",
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
  },
  container: {
    height: screenHeight * 0.8,
  },
  textInput: {
    borderBottomColor: "#fff",
    color: "#fff",
    borderBottomWidth: 1,
  },
  imageBackground: {
    flex: 1,
    height: null,
    width: null,
    // opacity: 0.7,
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
    backgroundColor: "yellow",
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
