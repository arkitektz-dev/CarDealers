import React, { useRef, useState } from "react";
import auth from "@react-native-firebase/auth";
import firebase from "firebase";

import { TextInput } from "react-native-paper";
import {
  Dimensions,
  ImageBackground,
  Modal,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Button } from "../../Component/Button/Index";
import { DismissKeyboard } from "../../Component/KeyboardDismiss";
import { useNavigation } from "@react-navigation/core";
import { OTPModal } from "../../Component/Modal/OTPModal";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const logoHeight = screenHeight * 0.3;
const titleHeight = screenHeight * 0.2;

const titleWidth = screenWidth * 0.6;
const logoWidth = screenWidth * 0.5;

export const SignupScreen = () => {
  const [user, setUser] = useState({
    name: "",
    username: "",
    phone: "",
    email: "",
    password: "",
  });
  const [confirm, setConfirm] = useState(null);
  const [code, setCode] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const Signup = async () => {
    setModalVisible(true);
    try {
      const confirmation = await auth().signInWithPhoneNumber("+923070211892");
      setConfirm(confirmation);
      console.log("Fired");
    } catch (error) {
      console.log(error);
    }
  };

  // const Signup = async () => {

  //   // try {
  //   //   let userSignup = firebase
  //   //     .database()
  //   //     //referncing to the table
  //   //     .ref("users/");
  //   //   //inserting Data
  //   //   let newUser = userSignup.push();
  //   //   newUser.set(user);
  //   //   alert("Registered Succesfully !");
  //   // } catch (error) {
  //   //   console.log(error);
  //   // }
  // };

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
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>Register User</Text>
          </View>
          <View style={{ height: screenWidth * 0.05 }}></View>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Name"
              placeholderTextColor="white"
              label="Name:"
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
              onChangeText={(e) => setUser({ ...user, name: e })}
            />
            <View style={styles.distance}></View>

            <TextInput
              placeholder="Username"
              placeholderTextColor="white"
              label="Username:"
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
              onChangeText={(e) => setUser({ ...user, username: e })}
            />
            <View style={styles.distance}></View>

            <TextInput
              placeholder="Phone"
              placeholderTextColor="white"
              label="Phone:"
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
              onChangeText={(e) => setUser({ ...user, phone: e })}
            />
            <View style={styles.distance}></View>

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
            <View style={styles.distance}></View>
            <TextInput
              placeholder="Confirm Password"
              placeholderTextColor="white"
              label="Confirm Password:"
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
              // onChangeText={(e) => setUser({ ...user, password: e })}
            />
          </View>

          <View style={styles.buttonContainer}>
            <Button title="Register" onLogin={Signup} />
          </View>

          <OTPModal status={modalVisible} />
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
  underlineStyleHighLighted: {
    borderColor: "#03DAC6",
  },
  distance: {
    height: screenHeight * 0.02,
  },
  titleText: {
    color: "white",
    fontSize: 25,
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
    justifyContent: "center",
    flexDirection: "column",
  },
});
