import React, { useState } from "react";
import auth from "@react-native-firebase/auth";
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Button } from "../../Component/Button/Index";
import { useNavigation } from "@react-navigation/core";
import { TextInput } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const logoHeight = screenHeight * 0.3;
const titleHeight = screenHeight * 0.1;

const titleWidth = screenWidth * 0.6;
const logoWidth = screenWidth * 0.5;

export const LoginScreen = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const navigation = useNavigation();

  const Login = async () => {
    await auth()
      .signInWithEmailAndPassword(user.email, user.password)
      .then(async (response) => {
        try {
          await AsyncStorage.setItem("user", response.user.uid);
          console.log(response.user.uid);
          navigation.navigate("Home");
        } catch (error) {
          console.log(error);
          console.log("Testing");
        }
      })

      .catch(() => console.log("Invalid Email Or Password"));
  };

  return (
    <ImageBackground
      blurRadius={2}
      source={{
        uri:
          "https://reactnativecode.com/wp-content/uploads/2017/10/Guitar.jpg",
      }}
      style={styles.imageBackground}
    >
      <View style={styles.logoContainer}>
        <Text style={{ color: "red", textAlign: "center" }}>Hey</Text>
      </View>

      <View style={styles.titleContainer}>
        <View style={{ height: screenWidth * 0.07 }}></View>

        <Text
          style={{
            color: "white",
            fontSize: 20,
            fontWeight: "700",
            textAlign: "center",
          }}
        >
          Welcome Back
        </Text>
        <Text
          style={{
            color: "white",
            fontSize: 14,
            fontWeight: "400",
            textAlign: "center",
            top: 7,
          }}
        >
          SignIn to Continue
        </Text>
      </View>
      <View style={{ height: screenWidth * 0.07 }}></View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          placeholderTextColor="white"
          mode="flat"
          label="Email:"
          underlineColor="#fff"
          underlineColorAndroid="#fff"
          theme={{
            colors: { primary: "white", placeholder: "#ffffff", text: "white" },
          }}
          style={{
            backgroundColor: "transparent",
            color: "#fff",
          }}
          onChangeText={(e) => setUser({ ...user, email: e })}
        />
        <View style={styles.distance}></View>
        <TextInput
          placeholder="Password"
          placeholderTextColor="white"
          label="Password:"
          theme={{
            colors: { primary: "white", placeholder: "#ffffff", text: "white" },
          }}
          underlineColor="#fff"
          underlineColorAndroid="#fff"
          style={{ backgroundColor: "transparent" }}
          onChangeText={(e) => setUser({ ...user, password: e })}
        />
      </View>
      <View style={styles.forgotpassContainer}>
        <Text style={styles.forgotpassText}>Forgot Password?</Text>
        <View style={{ width: "15%" }}></View>
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Login" onLogin={Login} />
      </View>
      <View style={styles.signupContainer}>
        <Text
          style={styles.signupText}
          onPress={() => navigation.navigate("SignupScreen")}
        >
          Signup for an account?
        </Text>
      </View>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
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
