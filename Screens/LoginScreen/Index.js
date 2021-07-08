import React, { useContext, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import firestore from "@react-native-firebase/firestore";

import Back from "../../Assets/NewAsset/backButton.png";

import { Button } from "../../Component/Button/Index";
import { useNavigation } from "@react-navigation/core";
import { HelperText, TextInput } from "react-native-paper";
import { screenHeight, screenWidth } from "../../Global/Dimension";

import { storeData } from "../../Data/FetchData";
import Navbar from "../../Component/Navbar.js/Index";
import AuthContext from "../../Component/Authcontext";

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
  const navigation = useNavigation();
  const authContext = useContext(AuthContext);
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
              authContext.setUser(b.DealerId);

              storeData(b);
              navigation.replace("Home");
            });
        })
        .catch((error) => {
          alert("Error getting data: ", error);
        });
    }
  };

  return (
    <View style={styles.imageBackground}>
      <Navbar
        style={styles.nav}
        Title="Sign in"
        source={Back}
        backStyle={styles.back}
        goBack={() => navigation.goBack()}
      />
      <View style={styles.logoContainer}>
        <Text style={styles.headText}>Sign in to Car Dealer</Text>
      </View>

      <View style={styles.inputContainer}>
        <View>
          <TextInput
            renderToHardwareTextureAndroid
            returnKeyType="next"
            placeholderTextColor="#000000"
            mode="flat"
            label="Username:"
            underlineColor="#000000"
            underlineColorAndroid="#000000"
            placeholder="Username"
            theme={{
              colors: {
                primary: "#000000",
                placeholder: "#000000",
                text: "#000000",
              },
            }}
            style={{
              backgroundColor: "transparent",
              color: "#000000",
            }}
            onChangeText={(e) => {
              setEmptyFieldError(false), setUser({ ...user, name: e });
            }}
          />
        </View>
        <View style={styles.distance}></View>
        <TextInput
          right={<TextInput.Icon name="eye" onPress={() => setSecure(false)} />}
          secureTextEntry={secure}
          placeholderTextColor="#000000"
          placeholder="Password"
          label="Password:"
          theme={{
            colors: {
              primary: "#000000",
              placeholder: "#000000",
              text: "#000000",
            },
          }}
          underlineColor="#000000"
          underlineColorAndroid="#000000"
          style={{ backgroundColor: "transparent" }}
          onChangeText={(e) => {
            setEmptyFieldError(false), setUser({ ...user, password: e });
          }}
        />
      </View>
      <View style={styles.forgotpassContainer}>
        <Text
          style={styles.forgotpassText}
          onPress={() => navigation.navigate("ForgotPassword")}
        >
          Forgot Password?
        </Text>
        <View style={{ width: "15%" }}></View>
      </View>
      {emptyFieldError ? (
        <HelperText
          type="error"
          style={{ color: "#fff", fontWeight: "500", textAlign: "center" }}
        >
          Field can not be empty!
        </HelperText>
      ) : null}

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
      <View style={styles.buttonContainer}>
        <Button
          title="Login"
          onPressHandler={Login}
          style={styles.background}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Text
          style={styles.skipButton}
          onPress={() => {
            navigation.navigate("Home");
          }}
        >
          SKIP
        </Text>
      </View>
    </View>
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
  inputContainer: { width: screenWidth * 0.7, alignSelf: "center" },
  forgotpassContainer: {
    flexDirection: "row",
    top: 15,
    alignSelf: "center",
    right: 50,
  },
  forgotpassText: {
    color: "#000000",
    fontWeight: "700",
    fontSize: 14,
    textDecorationLine: "underline",
  },
  signupContainer: {
    flexDirection: "row",
    flex: 0.1,
    top: "15%",
    alignSelf: "center",
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
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  nav: {
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "flex-start",
    height: 49,
  },
  back: { width: 30, height: 20, top: 14, resizeMode: "contain" },
  buttonContainer: {
    flexDirection: "row",
    flex: 0.2,
    justifyContent: "center",
    top: 15,
  },
  logoContainer: {
    margin: 20,
  },
  titleContainer: {
    alignSelf: "center",
    height: titleHeight,
    width: titleWidth,
  },
  headText: {
    fontSize: 20,
    fontWeight: "900",
    color: "#000000",
  },
});
