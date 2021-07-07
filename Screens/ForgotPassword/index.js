import React, { useRef, useState } from "react";
import { StyleSheet, Text, View, Modal, TouchableOpacity } from "react-native";
import auth from "@react-native-firebase/auth";

import Back from "../../Assets/NewAsset/backButton.png";
import { Button } from "../../Component/Button/Index";
import { useNavigation } from "@react-navigation/core";
import { HelperText, TextInput } from "react-native-paper";
import { screenHeight, screenWidth } from "../../Global/Dimension";
import Navbar from "../../Component/Navbar.js/Index";

const buttonWidth = screenWidth * 0.7;
const buttonHeight = screenWidth * 0.11;

const logoHeight = screenHeight * 0.2;
const titleHeight = screenHeight * 0.1;

const titleWidth = screenWidth * 0.6;
const logoWidth = screenWidth * 0.5;
const ForgotPassword = () => {
  const [otpInput, setOTPInput] = useState({
    pin1: "",
    pin2: "",
    pin3: "",
    pin4: "",
    pin5: "",
    pin6: "",
  });
  const inputTwo = useRef();
  const inputThree = useRef();
  const inputFour = useRef();
  const inputFive = useRef();
  const inputSix = useRef();
  const [phone, setPhone] = useState();
  const [confirm, setConfirm] = useState(null);
  const [id, setID] = useState();
  const [emptyFieldError, setEmptyFieldError] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation();

  const onPressForgotPassword = async () => {
    try {
      const confirmation = await auth().signInWithPhoneNumber(phone);
      setModalVisible(true);
      setConfirm(confirmation);
    } catch (error) {
      alert("Invalid Number");
    }
  };
  async function confirmCode() {
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
        navigation.replace("ChangePassword", phone);
      } catch (error) {
        alert(error);
      }
    } catch (error) {
      alert("Invalid code.");
    }
  }

  return (
    <View style={styles.imageBackground}>
      <Navbar
        style={styles.nav}
        Title="Forgot Password"
        source={Back}
        backStyle={styles.back}
        goBack={() => navigation.goBack()}
      />
      <View style={styles.logoContainer}>
        <Text style={styles.headText}>Enter Phone Number</Text>
      </View>

      <View style={styles.inputContainer}>
        <View>
          <TextInput
            renderToHardwareTextureAndroid
            returnKeyType="next"
            placeholderTextColor="#000000"
            mode="flat"
            label="Phone Number:"
            underlineColor="#000000"
            underlineColorAndroid="#000000"
            placeholder="Phone Number"
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
              setEmptyFieldError(false), setPhone(e);
            }}
          />
        </View>
      </View>

      {emptyFieldError ? (
        <HelperText
          type="error"
          style={{ color: "#fff", fontWeight: "500", textAlign: "center" }}
        >
          Field can not be empty!
        </HelperText>
      ) : null}

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
      <View style={styles.buttonContainer}>
        <Button
          title="Verify"
          onPressHandler={onPressForgotPassword}
          style={styles.background}
        />
      </View>
    </View>
  );
};
export default ForgotPassword;

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
