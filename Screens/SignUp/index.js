import React, { useRef, useState } from "react";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { HelperText, TextInput } from "react-native-paper";
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import { Button } from "../../Component/Button/Index";
import { DismissKeyboard } from "../../Component/KeyboardDismiss";
import { useNavigation } from "@react-navigation/core";

import { Tooltip } from "react-native-elements";
import { screenHeight, screenWidth } from "../../Global/Dimension";
import Back from "../../Assets/NewAsset/backButton.png";
import Navbar from "../../Component/Navbar.js/Index";

const buttonWidth = screenWidth * 0.7;
const buttonHeight = screenWidth * 0.11;

const logoHeight = screenHeight * 0.3;
const titleHeight = screenHeight * 0.2;

const titleWidth = screenWidth * 0.6;
const logoWidth = screenWidth * 0.5;

export const SignupScreen = () => {
  const [user, setUser] = useState({
    name: "",
    username: "",
    phone: "+92",
    email: "",
    password: "",
    confirmPassowrd: "",
  });
  const inputTwo = useRef();
  const inputThree = useRef();
  const inputFour = useRef();
  const inputFive = useRef();
  const inputSix = useRef();
  const [confirm, setConfirm] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [emptyFieldError, setEmptyFieldError] = useState(false);
  const [timeoutButton, setTimeoutButton] = useState(false);
  const [emaiError, setEmailError] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [alreadyExit, setAlreadyExit] = useState(false);
  const [otpInput, setOTPInput] = useState({
    pin1: "",
    pin2: "",
    pin3: "",
    pin4: "",
    pin5: "",
    pin6: "",
  });

  const Signup = async () => {
    if (
      user.name == "" ||
      user.password == "" ||
      user.phone == "" ||
      user.username == "" ||
      user.email == ""
    ) {
      alert("Fields Can not be empty");
      setEmptyFieldError(true);
    } else {
      if (!emaiError && !usernameError) {
        setModalVisible(true);
        try {
          const confirmation = await auth().signInWithPhoneNumber(user.phone);
          setConfirm(confirmation);
          console.log(confirmation);
        } catch (error) {
          alert("Invalid Number");
        }
      }
    }
  };

  const navigation = useNavigation();
  const ref = firestore().collection("Users");

  async function confirmCode() {
    console.log("Start");

    try {
      await confirm.confirm(
        otpInput.pin1 +
          otpInput.pin2 +
          otpInput.pin3 +
          otpInput.pin4 +
          otpInput.pin5 +
          otpInput.pin6
      );

      try {
        await ref
          .add(user)
          .then(() => {
            alert("User added!");
          })
          .catch((err) => alert(err));
        alert("Registered Succesfully !");
        navigation.replace("Home");
      } catch (error) {
        alert(error);
      }
    } catch (error) {
      alert("Invalid code.");
    }
  }
  const handleChangeConfirmPassowrd = (e) => {
    setUser({ ...user, confirmPassowrd: e });
    if (e != user.password) {
      setConfirmPasswordError(true);
    } else {
      setConfirmPasswordError(false);
    }
  };
  const handleChangeEmail = (e) => {
    setUser({ ...user, email: e });
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(e) === false) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  };

  const handleChangeUsername = async (e) => {
    setUser({ ...user, username: e });

    let reg = /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/;

    if (reg.test(e) === true) {
      setUsernameError(false);
    } else {
      setUsernameError(true);
      alert("Username is Not Correct");
    }
    await ref
      .where("username", "==", user.username)
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.size == 1) {
        }
      });
  };

  return (
    <DismissKeyboard>
      <ScrollView style={styles.form_container}>
        <Navbar
          style={styles.nav}
          Title="Back"
          source={Back}
          backStyle={styles.back}
          goBack={() => navigation.goBack()}
        />
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Register User</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            autoCapitalize="none"
            placeholderTextColor="#000000"
            label="Name"
            theme={{
              colors: {
                primary: "#000000",
                placeholder: "#000000",
                text: "#000000",
              },
            }}
            underlineColor="#000000"
            underlineColorAndroid="#000000"
            style={styles.textInput}
            style={{ backgroundColor: "transparent" }}
            onChangeText={(e) => setUser({ ...user, name: e })}
          />
          <View style={styles.distance}></View>

          <TextInput
            autoCapitalize="none"
            placeholderTextColor="#000000"
            label="Username"
            theme={{
              colors: {
                primary: "#000000",
                placeholder: "#000000",
                text: "#000000",
              },
            }}
            underlineColor="#000000"
            underlineColorAndroid="#000000"
            style={styles.textInput}
            style={{ backgroundColor: "transparent" }}
            onChangeText={handleChangeUsername}
          />
          {usernameError ? (
            <Text style={{ color: "#000000" }}>Username is Not Correct</Text>
          ) : null}
          {alreadyExit ? (
            <Text style={{ color: "#000000" }}>Username Already Exist</Text>
          ) : null}
          <View style={styles.distance}></View>

          <TextInput
            autoCapitalize="none"
            keyboardType="number-pad"
            maxLength={14}
            label="Phone"
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
            onChangeText={(e) => setUser({ ...user, phone: e })}
          />
          <Tooltip
            popover={<Text style={{ color: "#000000" }}>Start with +92</Text>}
          >
            <Text
              style={{
                color: "#000000",
                fontStyle: "italic",
                fontWeight: "bold",
              }}
            >
              Number Format Please Check
            </Text>
          </Tooltip>

          <View style={styles.distance}></View>

          <TextInput
            autoCapitalize="none"
            placeholderTextColor="#000000"
            maxLength={40}
            // style={styles.textInput}
            keyboardType="email-address"
            mode="flat"
            label="Email"
            underlineColor="#000000"
            underlineColorAndroid="#000000"
            theme={{
              colors: {
                primary: "#000000",
                placeholder: "#000000",
                text: "#000000",
              },
            }}
            style={{ backgroundColor: "transparent", color: "#000000" }}
            onChangeText={handleChangeEmail}
          />
          {emaiError ? (
            <Text style={{ color: "#000000" }}>Email is Not Correct</Text>
          ) : null}

          <View style={styles.distance}></View>
          <TextInput
            autoCapitalize="none"
            maxLength={20}
            secureTextEntry
            placeholderTextColor="#000000"
            label="Password"
            theme={{
              colors: {
                primary: "#000000",
                placeholder: "#000000",
                text: "#000000",
              },
            }}
            underlineColor="#000000"
            underlineColorAndroid="#000000"
            style={styles.textInput}
            style={{ backgroundColor: "transparent" }}
            onChangeText={(e) => setUser({ ...user, password: e })}
          />

          {/* <View style={styles.distance}></View> */}
          <TextInput
            autoCapitalize="none"
            maxLength={20}
            secureTextEntry
            placeholderTextColor="#000000"
            label="Confirm Password"
            theme={{
              colors: {
                primary: "#000000",
                placeholder: "#000000",
                text: "#000000",
              },
            }}
            underlineColor="#000000"
            underlineColorAndroid="000000"
            style={styles.textInput}
            style={{ backgroundColor: "transparent" }}
            onChangeText={handleChangeConfirmPassowrd}
          />
          {confirmPasswordError ? (
            <HelperText
              type="error"
              style={{
                color: "#000000",
                fontWeight: "500",
                textAlign: "center",
              }}
            >
              Passwords Do Not Match
            </HelperText>
          ) : null}
        </View>
        {emptyFieldError ? (
          <HelperText
            type="error"
            style={{
              color: "#000000",
              fontWeight: "500",
              textAlign: "center",
            }}
          >
            Field can not be empty!
          </HelperText>
        ) : null}

        <View style={styles.buttonContainer}>
          <Button
            title="Register"
            style={styles.background}
            onPressHandler={Signup}
          />
        </View>

        <Modal visible={modalVisible} animationType={"slide"}>
          <View
            style={{
              flexDirection: "column",
              flex: 1,
              justifyContent: "center",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <TextInput
                autoFocus={true}
                blurOnSubmit={false}
                onChangeText={(e) => {
                  if (e.length === 1) inputTwo.current.focus();
                  setOTPInput({ ...otpInput, pin1: e });
                }}
                returnKeyType={"next"}
                maxLength={1}
                placeholder="-"
                keyboardType="number-pad"
                textAlign="center"
                style={styles.OTP_text}
                value={otpInput.first}
                theme={{
                  colors: {
                    primary: "#1c2e65",
                    placeholder: "#1c2e65",
                    text: "#1c2e65",
                  },
                }}
                underlineColor="#1c2e65"
                underlineColorAndroid="#1c2e65"
              />
              <View style={styles.space} />
              <TextInput
                ref={inputTwo}
                returnKeyType="next"
                blurOnSubmit={false}
                onChangeText={(e) => {
                  if (e.length === 1)
                    inputThree.current.focus(),
                      setOTPInput({ ...otpInput, pin2: e });
                }}
                maxLength={1}
                placeholder="-"
                keyboardType="number-pad"
                style={styles.OTP_text}
                value={otpInput.second}
                theme={{
                  colors: {
                    primary: "#1c2e65",
                    placeholder: "#1c2e65",
                    text: "#1c2e65",
                  },
                }}
                underlineColor="#1c2e65"
                underlineColorAndroid="#1c2e65"
                theme={{
                  colors: {
                    primary: "#1c2e65",
                    placeholder: "#1c2e65",
                    text: "#1c2e65",
                  },
                }}
                underlineColor="#1c2e65"
                underlineColorAndroid="#1c2e65"
              />
              <View style={styles.space} />

              <TextInput
                ref={inputThree}
                maxLength={1}
                placeholder="-"
                keyboardType="number-pad"
                onChangeText={(e) => {
                  if (e.length === 1) inputFour.current.focus();
                  setOTPInput({ ...otpInput, pin3: e });
                }}
                style={styles.OTP_text}
                theme={{
                  colors: {
                    primary: "#1c2e65",
                    placeholder: "#1c2e65",
                    text: "#1c2e65",
                  },
                }}
                underlineColor="#1c2e65"
                underlineColorAndroid="#1c2e65"
              />
              <View style={styles.space} />

              <TextInput
                ref={inputFour}
                maxLength={1}
                placeholder="-"
                onChangeText={(e) => {
                  if (e.length === 1) inputFive.current.focus();
                  setOTPInput({ ...otpInput, pin4: e });
                }}
                keyboardType="number-pad"
                style={styles.OTP_text}
                theme={{
                  colors: {
                    primary: "#1c2e65",
                    placeholder: "#1c2e65",
                    text: "#1c2e65",
                  },
                }}
                underlineColor="#1c2e65"
                underlineColorAndroid="#1c2e65"
              />
              <View style={styles.space} />

              <TextInput
                ref={inputFive}
                maxLength={1}
                placeholder="-"
                keyboardType="number-pad"
                onChangeText={(e) => {
                  if (e.length === 1) inputSix.current.focus();
                  setOTPInput({ ...otpInput, pin5: e });
                }}
                style={styles.OTP_text}
                theme={{
                  colors: {
                    primary: "#1c2e65",
                    placeholder: "#1c2e65",
                    text: "#1c2e65",
                  },
                }}
                underlineColor="#1c2e65"
                underlineColorAndroid="#1c2e65"
              />
              <View style={styles.space} />

              <TextInput
                ref={inputSix}
                maxLength={1}
                placeholder="-"
                keyboardType="number-pad"
                onChangeText={(e) => setOTPInput({ ...otpInput, pin6: e })}
                style={styles.OTP_text}
                theme={{
                  colors: {
                    primary: "#1c2e65",
                    placeholder: "#1c2e65",
                    text: "#1c2e65",
                  },
                }}
                underlineColor="#1c2e65"
                underlineColorAndroid="#1c2e65"
              />
            </View>
            <View style={styles.distance}></View>

            <Button
              style={styles.background}
              title="Verify"
              onPressHandler={confirmCode}
            />
            <View style={styles.distance}></View>
            <TouchableOpacity
              onPress={() => {
                setConfirm(null), setModalVisible(false);
              }}
              style={{ justifyContent: "center" }}
            >
              <Text
                style={{
                  color: "#333",
                  alignSelf: "center",
                  fontSize: 24,
                  fontWeight: "600",
                }}
              >
                Resend Code
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <View style={styles.signupContainer}>
          <Text
            style={styles.signupText}
            onPress={() => navigation.navigate("LoginScreen")}
          >
            Already have a account ?
          </Text>
        </View>
      </ScrollView>
    </DismissKeyboard>
  );
};
const styles = StyleSheet.create({
  OTP_text: {
    fontWeight: "bold",
    fontSize: 25,
  },
  nav: {
    backgroundColor: "#fff",
    flexDirection: "row",
    width: "100%",
    justifyContent: "flex-start",
    height: 49,
  },
  back: { width: 30, height: 20, top: 14, resizeMode: "contain" },

  space: {
    width: screenWidth * 0.04,
  },

  underlineStyleHighLighted: {
    borderColor: "#03DAC6",
  },
  distance: {
    height: screenHeight * 0.02,
  },
  background: {
    alignSelf: "center",
    backgroundColor: "#1c2e65",
    width: buttonWidth,
    height: buttonHeight,
    justifyContent: "center",
  },
  titleText: {
    color: "#000000",
    fontSize: 25,
    fontWeight: "700",
    textAlign: "center",
  },
  form_container: {
    height: screenHeight,
    backgroundColor: "#fff",
  },
  textInput: {
    borderBottomColor: "#000000",
    color: "#000000",
    borderBottomWidth: 1,
  },
  imageBackground: {
    flex: 1,
    height: null,
    width: null,
    // opacity: 0.7,
  },
  inputContainer: {
    width: screenWidth * 0.7,
    alignSelf: "center",
  },
  forgotpassContainer: {
    flexDirection: "row",
    flex: 0.1,
    top: 15,
    alignSelf: "flex-end",
  },
  forgotpassText: {
    color: "#000000",
    fontWeight: "700",
    fontSize: 14,
  },
  signupContainer: {
    paddingBottom: 50,
    flexDirection: "row",
    top: "10%",
    alignSelf: "center",
  },
  signupText: {
    color: "#000000",
    fontWeight: "700",
    fontSize: 14,
  },
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  buttonContainer: {
    top: "5%",
    flexDirection: "row",
    justifyContent: "center",
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
    height: titleHeight * 0.6,
    width: titleWidth,
    justifyContent: "center",
    flexDirection: "column",
  },
});
