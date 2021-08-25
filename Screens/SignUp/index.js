import React, { useEffect, useRef, useState } from "react";
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
import { Tooltip } from "react-native-elements";
import { useNavigation } from "@react-navigation/core";

import { Button } from "../../Component/Button/Index";
import { DismissKeyboard } from "../../Component/KeyboardDismiss";
import { screenHeight, screenWidth } from "../../Global/Dimension";
import Back from "../../Assets/NewAsset/backButton.png";
import Navbar from "../../Component/Navbar.js/Index";
import AppCheckBox from "../../Component/AppCheckbox/index";
import defaultStyles from "../../config/styles";
import {
  AddDealer,
  AddUser,
  clearStorage,
  storeData,
} from "../../Data/FetchData";

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
    phone: "",
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
  const [showroom, setShowroom] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [visible, setVisible] = useState(false);
  const [emptyFieldError, setEmptyFieldError] = useState(false);
  const [showroomData, setShowroomData] = useState([]);
  const [emaiError, setEmailError] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [alreadyExit, setAlreadyExit] = useState(false);
  const [checkbox, setCheckbox] = useState([]);

  const [otpInput, setOTPInput] = useState({
    pin1: "",
    pin2: "",
    pin3: "",
    pin4: "",
    pin5: "",
    pin6: "",
  });
  const showrooms = [];

  const showroomArr = [];

  useEffect(() => {
    clearStorage();

    firestore()
      .collection("Showrooms")
      .get()
      .then((res) => {
        res.docs.forEach((item) =>
          showroomArr.push({
            value: item.id,
            label: item.data().name,
          })
        );
      });
    setShowroomData(showroomArr);
  }, []);

  const Signup = async () => {
    var num = "";
    if (
      user.name == "" ||
      user.password == "" ||
      user.phone == "" ||
      user.username == ""
    ) {
      alert("Fields Can not be empty");
      setEmptyFieldError(true);
    } else {
      if (!emaiError && !usernameError) {
        const data = user.phone.split("");
        const num = user.phone;
        // if (data[0] == 0) {
        //   data.splice(0, 1);
        //   num = data.join("");
        // } else {
        //   num = user.phone;
        // }
        setModalVisible(true);

        try {
          console.log(`+92${num}`);

          const confirmation = await auth().signInWithPhoneNumber(`+92${num}`);
          setConfirm(confirmation);
        } catch (error) {
          console.log(`+92${num}`);
          alert("Invalid Number");
        }
      }
    }
  };
  const navigation = useNavigation();
  const ref = firestore().collection("Users");

  const confirmCode = async () => {
    checkbox.forEach((item) => {
      const id = firestore()
        .collection("Showrooms")
        .doc(item.value);
      showrooms.push({ id, name: item.label });
    });
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
        const obj = { ...user, showrooms };
        await AddDealer(obj)
          .then((res) =>
            AddUser(obj, res.id).then((res) => {
              res.get().then((querySnapshot) => {
                var b = {
                  id: res.id,
                  email: querySnapshot.data().email,
                  image: querySnapshot.data().image,
                  name: querySnapshot.data().name,
                  isSignedIn: true,
                  password: querySnapshot.data().password,
                  phone: querySnapshot.data().phone,
                  username: querySnapshot.data().username,
                  DealerId: `${
                    querySnapshot.data().DealerId._documentPath._parts[1]
                  }`,
                };
                storeData(b);
              });
            })
          )

          .catch((err) => console.log(err));

        navigation.replace("Home");
      } catch (error) {
        alert(error);
      }
    } catch (error) {
      alert("Invalid code.");
    }
  };
  const onChangePhoneNumber = (e) => {
    const data = e.split("");
    if (data[1] == 0) {
      data.splice(1, 1);
      const num = data.join("");
      setUser({ ...user, phone: num });
    } else {
      setUser({ ...user, phone: e });
    }
  };
  const handleChangeConfirmPassowrd = (e) => {
    const lower = e.toLowerCase();
    setUser({ ...user, confirmPassowrd: lower });
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
    const lower = e.toLowerCase();
    setUser({ ...user, username: lower });

    let reg = /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/;

    if (reg.test(e) === true) {
      setUsernameError(false);
    } else {
      setUsernameError(true);
    }
    await ref
      .where("username", "==", user.username)
      .get()
      .then((querySnapshot) => {
        console.log(querySnapshot.size);
        if (querySnapshot.size > 0) {
          setAlreadyExit(true);
        }
        if (querySnapshot.size == 0) {
          setAlreadyExit(false);
        }
      });
  };
  const handleChangePassword = async (e) => {
    const lower = e.toLowerCase();
    setUser({ ...user, password: lower });
  };
  const handleChangeName = async (e) => {
    const lower = e.toLowerCase();
    setUser({ ...user, name: lower });
  };
  const onModalHandler = () => {
    if (visible == false) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };
  const onChangeHandler = (e) => {
    setCheckbox([...checkbox, e]);
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
            onChangeText={handleChangeName}
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
          <View style={{ flexDirection: "row", width: "100%" }}>
            <TextInput
              value={"+92"}
              editable={false}
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
            />
            <TextInput
              autoCapitalize="none"
              keyboardType="phone-pad"
              maxLength={13}
              theme={{
                colors: {
                  primary: "#000000",
                  placeholder: "#000000",
                  text: "#000000",
                },
              }}
              underlineColor="#000000"
              underlineColorAndroid="#000000"
              style={{ backgroundColor: "transparent", width: "80%" }}
              onChangeText={onChangePhoneNumber}
            />
          </View>
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
            onChangeText={handleChangePassword}
          />

          <View style={styles.distance}></View>
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
          <View style={{ alignSelf: "center" }}>
            <TouchableOpacity
              style={{
                backgroundColor: defaultStyles.colors.light,
                borderRadius: 25,
                flexDirection: "row",
                padding: 15,
                margin: 10,
                width: screenWidth * 0.71,
                justifyContent: "center",
              }}
              onPress={() => setVisible(true)}
            >
              <Text
                style={{ color: "#333", fontSize: 17 }}
                onPress={onModalHandler}
              >
                Select Showroom
              </Text>
            </TouchableOpacity>
            <Modal
              onRequestClose={() => setVisible(false)}
              visible={visible}
              animationType="slide"
            >
              <Button
                title="Close"
                style={styles.buttonContainer}
                onPressHandler={onModalHandler}
              />
              {showroomData.map((item) => {
                return (
                  <View style={{ flexDirection: "row" }}>
                    <AppCheckBox
                      status={checkbox.includes(item) ? "checked" : "unchecked"}
                      onPress={() => onChangeHandler(item)}
                    />
                    <Text
                      style={{
                        color: "#000",
                        fontSize: 18,
                        fontWeight: "800",
                      }}
                      key={(item, index) => index.toString()}
                    >
                      {item.label}
                    </Text>
                  </View>
                );
              })}
            </Modal>
          </View>
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
                  fontSize: 20,
                  fontWeight: "600",
                }}
              >
                Change Number ?
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={async () => {
                const confirmation = await auth().signInWithPhoneNumber(
                  `+92${user.phone}`
                );
                setConfirm(confirmation);
              }}
              style={{ justifyContent: "center" }}
            >
              <Text
                style={{
                  color: "#1c2e65",
                  alignSelf: "center",
                  top: 10,
                  fontSize: 16,
                  fontWeight: "800",
                }}
              >
                Resend Code ?
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
    paddingBottom: "20%",
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
    marginTop: 10,
    height: 35,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: "#1c2e65",
    alignSelf: "center",
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
