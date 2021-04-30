import React, {useEffect, useRef, useState} from "react";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import {HelperText, TextInput} from "react-native-paper";
import {
  Dimensions,
  ImageBackground,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {Button} from "../../Component/Button/Index";
import {DismissKeyboard} from "../../Component/KeyboardDismiss";
import {useNavigation} from "@react-navigation/core";

import BackgroundImage from "../../Assets/loginBackground.png";
import {Tooltip} from "react-native-elements";

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
    phone: "+92",
    email: "",
    password: "",
    confirmPassowrd: "",
  });
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
        } catch (error) {
          alert("Invalid Number");
        }
      }
    }
  };

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setTimeoutButton;
  //   }, 30000);
  //   return () => clearTimeout(timer);
  // }, []);

  const navigation = useNavigation();
  const ref = firestore().collection("Users");

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
        await ref
          .add(user)
          .then(() => {
            alert("User added!");
          })
          .catch((err) => console.log(err));
        alert("Registered Succesfully !");
        navigation.replace("Home");
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log("Invalid code.");
    }
  }
  const handleChangeConfirmPassowrd = (e) => {
    setUser({...user, confirmPassowrd: e});
    if (e != user.password) {
      setConfirmPasswordError(true);
    } else {
      setConfirmPasswordError(false);
    }
  };
  const handleChangeEmail = (e) => {
    setUser({...user, email: e});
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(e) === false) {
      setEmailError(true);
      console.log("Email is Not Correct");
    } else {
      setEmailError(false);
    }
  };

  const handleChangeUsername = async (e) => {
    setUser({...user, username: e});

    let reg = /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/;

    if (reg.test(e) === true) {
      setUsernameError(false);
    } else {
      setUsernameError(true);
      console.log("Username is Not Correct");
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
      <ImageBackground
        blurRadius={2}
        source={BackgroundImage}
        style={styles.imageBackground}
      >
        <View style={styles.form_container}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>Register User</Text>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              autoCapitalize="none"
              placeholderTextColor="white"
              label="Name"
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
              style={{backgroundColor: "transparent"}}
              onChangeText={(e) => setUser({...user, name: e})}
            />
            <View style={styles.distance}></View>

            <TextInput
              autoCapitalize="none"
              placeholderTextColor="white"
              label="Username"
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
              style={{backgroundColor: "transparent"}}
              onChangeText={handleChangeUsername}
            />
            {usernameError ? (
              <Text style={{color: "#fff"}}>Username is Not Correct</Text>
            ) : null}
            {alreadyExit ? (
              <Text style={{color: "#fff"}}>Username Already Exist</Text>
            ) : null}
            <View style={styles.distance}></View>

            <TextInput
              autoCapitalize="none"
              keyboardType="number-pad"
              maxLength={14}
              label="Phone"
              theme={{
                colors: {
                  primary: "white",
                  placeholder: "#ffffff",
                  text: "white",
                },
              }}
              underlineColor="#fff"
              underlineColorAndroid="#fff"
              style={{backgroundColor: "transparent"}}
              onChangeText={(e) => setUser({...user, phone: e})}
            />
            {/* <TextInputMask
              // type={"cel-phone"}
              // options={{
              //   maskType: "BRL",
              //   withDDD: true,
              //   dddMask: "(99) ",
              // }}
              type={"datetime"}
              options={{
                format: "YYYY/MM/DD",
              }}
              style={{
                color: "white",
                borderBottomColor: "#fff",
                borderBottomWidth: 1,
              }}
              placeholder="Phone"
              placeholderTextColor="#fff"
              onChangeText={(text) => {
              }}
            /> */}

            <View style={styles.distance}></View>

            <TextInput
              autoCapitalize="none"
              placeholderTextColor="white"
              maxLength={40}
              // style={styles.textInput}
              keyboardType="email-address"
              mode="flat"
              label="Email"
              underlineColor="#fff"
              underlineColorAndroid="#fff"
              theme={{
                colors: {
                  primary: "white",
                  placeholder: "#ffffff",
                  text: "white",
                },
              }}
              style={{backgroundColor: "transparent", color: "#fff"}}
              onChangeText={handleChangeEmail}
            />
            {emaiError ? (
              <Text style={{color: "#fff"}}>Email is Not Correct</Text>
            ) : null}

            <View style={styles.distance}></View>
            <TextInput
              autoCapitalize="none"
              maxLength={20}
              secureTextEntry
              placeholderTextColor="white"
              label="Password"
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
              style={{backgroundColor: "transparent"}}
              onChangeText={(e) => setUser({...user, password: e})}
            />
            <Tooltip popover={<Text>Info here</Text>}>
              <Text style={{color: "white"}}>Press me</Text>
            </Tooltip>
            {/* <View style={styles.distance}></View> */}
            <TextInput
              autoCapitalize="none"
              maxLength={20}
              secureTextEntry
              placeholderTextColor="white"
              label="Confirm Password"
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
              style={{backgroundColor: "transparent"}}
              onChangeText={handleChangeConfirmPassowrd}
            />
            {confirmPasswordError ? (
              <HelperText
                type="error"
                style={{
                  color: "#fff",
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
              style={{color: "#fff", fontWeight: "500", textAlign: "center"}}
            >
              Field can not be empty!
            </HelperText>
          ) : null}
          <View style={styles.distance}></View>

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
                  onChangeText={(e) => setOTPInput({...otpInput, pin1: e})}
                  returnKeyType={"next"}
                  maxLength={1}
                  placeholder="-"
                  keyboardType="number-pad"
                  textAlign="center"
                  style={styles.OTP_text}
                  value={otpInput.first}
                  theme={{
                    colors: {
                      primary: "red",
                      placeholder: "red",
                      text: "red",
                    },
                  }}
                  underlineColor="red"
                  underlineColorAndroid="red"
                />
                <View style={styles.space} />
                <TextInput
                  returnKeyType="next"
                  blurOnSubmit={false}
                  onChangeText={(e) => setOTPInput({...otpInput, pin2: e})}
                  maxLength={1}
                  placeholder="-"
                  keyboardType="number-pad"
                  style={styles.OTP_text}
                  value={otpInput.second}
                  theme={{
                    colors: {
                      primary: "red",
                      placeholder: "red",
                      text: "red",
                    },
                  }}
                  underlineColor="red"
                  underlineColorAndroid="red"
                  theme={{
                    colors: {
                      primary: "red",
                      placeholder: "red",
                      text: "red",
                    },
                  }}
                  underlineColor="red"
                  underlineColorAndroid="red"
                />
                <View style={styles.space} />

                <TextInput
                  maxLength={1}
                  placeholder="-"
                  keyboardType="number-pad"
                  onChangeText={(e) => setOTPInput({...otpInput, pin3: e})}
                  style={styles.OTP_text}
                  theme={{
                    colors: {
                      primary: "red",
                      placeholder: "red",
                      text: "red",
                    },
                  }}
                  underlineColor="red"
                  underlineColorAndroid="red"
                />
                <View style={styles.space} />

                <TextInput
                  maxLength={1}
                  placeholder="-"
                  onChangeText={(e) => setOTPInput({...otpInput, pin4: e})}
                  keyboardType="number-pad"
                  style={styles.OTP_text}
                  theme={{
                    colors: {
                      primary: "red",
                      placeholder: "red",
                      text: "red",
                    },
                  }}
                  underlineColor="red"
                  underlineColorAndroid="red"
                />
                <View style={styles.space} />

                <TextInput
                  maxLength={1}
                  placeholder="-"
                  keyboardType="number-pad"
                  onChangeText={(e) => setOTPInput({...otpInput, pin5: e})}
                  style={styles.OTP_text}
                  theme={{
                    colors: {
                      primary: "red",
                      placeholder: "red",
                      text: "red",
                    },
                  }}
                  underlineColor="red"
                  underlineColorAndroid="red"
                />
                <View style={styles.space} />

                <TextInput
                  maxLength={1}
                  placeholder="-"
                  keyboardType="number-pad"
                  onChangeText={(e) => setOTPInput({...otpInput, pin6: e})}
                  style={styles.OTP_text}
                  theme={{
                    colors: {
                      primary: "red",
                      placeholder: "red",
                      text: "red",
                    },
                  }}
                  underlineColor="red"
                  underlineColorAndroid="red"
                />
              </View>
              <View style={styles.distance}></View>

              <Button title="Verify" onLogin={confirmCode} />
              <View style={styles.distance}></View>
              <TouchableOpacity
                onPress={() => {
                  setConfirm(null), setModalVisible(false);
                }}
                style={{justifyContent: "center"}}
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
        </View>
      </ImageBackground>
    </DismissKeyboard>
  );
};
const styles = StyleSheet.create({
  OTP_text: {
    fontWeight: "bold",
    fontSize: 25,
  },
  space: {
    width: screenWidth * 0.04,
  },

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
  form_container: {
    height: screenHeight * 0.7,
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
    height: titleHeight * 0.6,
    width: titleWidth,
    justifyContent: "center",
    flexDirection: "column",
  },
});
