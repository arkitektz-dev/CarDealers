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
import IonIcon from "react-native-vector-icons/Ionicons";
import { useToast } from "native-base";

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
import Feather from "react-native-vector-icons/Fontisto";

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
  const toast = useToast();

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

        navigation.replace("LoginScreen");
        alert("Account Created");
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
            label="Name *"
            mode="outlined"
            theme={{
              colors: {
                primary: "#1B3661",
                placeholder: "grey",
                text: "black",
              },
            }}
            dense="20"
            outlineColor="#CCCCCC"
            style={{ backgroundColor: "white" }}
            onChangeText={handleChangeName}
          />

          <View style={styles.distance}></View>

          <TextInput
            autoCapitalize="none"
            placeholderTextColor="#000000"
            mode="outlined"
            theme={{
              colors: {
                primary: "#1B3661",
                placeholder: "grey",
                text: "black",
              },
            }}
            dense="20"
            outlineColor="#CCCCCC"
            style={{ backgroundColor: "white" }}
            label="Username *"
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
              mode="outlined"
              dense="20"
              value={"+92"}
              editable={false}
              theme={{
                colors: {
                  primary: "#1B3661",
                  placeholder: "grey",
                  text: "black",
                },
              }}
              outlineColor="#CCCCCC"
              style={{ backgroundColor: "transparent", width: "15%" }}
            />
            <TextInput
              autoCapitalize="none"
              placeholderTextColor="#000000"
              label="Ph No *"
              mode="outlined"
              dense="20"
              theme={{
                colors: {
                  primary: "#1B3661",
                  placeholder: "grey",
                  text: "black",
                },
              }}
              outlineColor="#CCCCCC"
              style={{ backgroundColor: "white", width: "85%" }}
              keyboardType="phone-pad"
              maxLength={13}
              onChangeText={onChangePhoneNumber}
            />
          </View>
          <View style={styles.distance}></View>

          <TextInput
            autoCapitalize="none"
            placeholderTextColor="#000000"
            mode="outlined"
            outlineColor="#CCCCCC"
            dense="20"
            theme={{
              colors: {
                primary: "#1B3661",
                placeholder: "grey",
                text: "black",
              },
            }}
            style={{ backgroundColor: "white" }}
            maxLength={40}
            keyboardType="email-address"
            label="Email *"
            onChangeText={handleChangeEmail}
          />
          {emaiError ? (
            <Text style={{ color: "#000000" }}>Email is Not Correct</Text>
          ) : null}

          <View style={styles.distance}></View>
          <TextInput
            autoCapitalize="none"
            mode="outlined"
            maxLength={20}
            dense="20"
            outlineColor="#CCCCCC"
            secureTextEntry
            theme={{
              colors: {
                primary: "#1B3661",
                placeholder: "grey",
                text: "black",
              },
            }}
            style={{ backgroundColor: "white" }}
            label="Password *"
            onChangeText={handleChangePassword}
          />

          <View style={styles.distance}></View>
          <TextInput
            autoCapitalize="none"
            maxLength={20}
            outlineColor="#CCCCCC"
            dense="20"
            secureTextEntry
            mode="outlined"
            theme={{
              colors: {
                primary: "#1B3661",
                placeholder: "grey",
                text: "black",
              },
            }}
            style={{ backgroundColor: "white" }}
            label="Confirm Password *"
            onChangeText={handleChangeConfirmPassowrd}
          />
          <View style={styles.distance}></View>
          <View style={{ alignSelf: "center", width: "100%" }}>
            <TouchableOpacity
              style={{
                backgroundColor: "#F5F5F5",
                borderRadius: 5,
                width: "100%",
                height: 44,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingHorizontal: 8,
              }}
              onPress={() => setVisible(true)}
            >
              <Text
                style={{ color: "#9B9B9B", fontSize: 17 }}
                onPress={onModalHandler}
              >
                {checkbox.length == 0 ? 'Select Showrooms' : `Selected Showrooms:  ${checkbox?.length}`}
                
              </Text>
              <Feather name="arrow-down" size={14} color="#9B9B9B" />
            </TouchableOpacity>
            {/* <Modal
              onRequestClose={() => setVisible(false)}
              visible={visible}
              animationType="slide"
            >
              <Button
                title="Close"
                style={styles.buttonContainer}
                onPressHandler={onModalHandler}
              />
              <ScrollView style={styles.form_container}>
                {showroomData.map((item) => {
                  return (
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <AppCheckBox
                        status={
                          checkbox.includes(item) ? "checked" : "unchecked"
                        }
                        onPress={() => onChangeHandler(item)}
                      />
                      <Text
                        style={{
                          color: "#000",
                          fontSize: 18,
                          fontWeight: "800",
                          marginTop: -2,
                        }}
                        key={(item, index) => index.toString()}
                      >
                        {item.label}
                      </Text>
                    </View>
                  );
                })}
              </ScrollView>
            </Modal> */}
            <Modal
              visible={visible}
              animationType="fade"
              transparent={true}
              onRequestClose={() => setVisible(false)}
            >
              <View
                style={{
                  flex: 1,
                  //backgroundColor: 'transparent',
                  backgroundColor: "rgba(0,0,0,0.7)",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <View style={styles.dropdownHeader}>
                  <Text
                    style={{
                      color: "#000000",
                      fontSize: 16,
                    }}
                  >
                    Select Showroom
                  </Text>
                  <TouchableOpacity onPress={() => setVisible(false)}>
                    <Text
                      style={{
                        color: "#1e2d64",
                        fontSize: 16,
                      }}
                    >
                      Close
                    </Text>
                  </TouchableOpacity>
                </View>
                <ScrollView style={styles.form_container_modal}>
                  {showroomData.map((item) => {
                    return (
                      <TouchableOpacity
                        style={styles.checkerItem}
                        activeOpacity={0.8}
                        onPress={() => onChangeHandler(item)}
                      >
                        <Text
                          style={{
                            color: checkbox.includes(item) ? "black" : "grey",
                            fontSize: 18,
                            fontWeight: "800",
                            marginTop: 5,
                          }}
                          key={(item, index) => index.toString()}
                        >
                          {item.label}
                        </Text>
                        {checkbox.includes(item) ? (
                          <AppCheckBox
                            status={
                              checkbox.includes(item) ? "checked" : "unchecked"
                            }
                          />
                        ) : null}
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
              </View>
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
              color: "#F63D40",
              fontWeight: "700",
              textAlign: "left",
              marginLeft: 10,
              fontSize: 14,
            }}
          >
            Please fill the required fields!
          </HelperText>
        ) : null}
        <View style={styles.distance}></View>
        <View style={styles.buttonContainer}>
          <Button
            title="Register"
            style={[
              styles.background,
              {
                borderRadius: 15,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 0.22,
                shadowRadius: 2.22,

                elevation: 3,
              },
            ]}
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
            <TouchableOpacity
              onPress={() => {
                setConfirm(null), setModalVisible(false);
              }}
              style={{
                position: "absolute",
                top: 15,
                left: 10,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <IonIcon
                name="chevron-back-sharp"
                color="black"
                size={24}
                onPress={() => navigation.goBack()}
              />
              <Text
                style={{
                  color: "#333",
                  fontSize: 18,
                  fontWeight: "600",
                }}
              >
                Back
              </Text>
            </TouchableOpacity>
            <Text
              style={{
                color: "#1c2e65",
                alignSelf: "center",

                fontSize: 22,
                fontWeight: "800",
                marginBottom: 20,
                padding: 22,
                textAlign: "center",
              }}
            >
              Please enter the 6 digit code sent to your phone number{" "}
            </Text>
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
                    placeholder: "grey",
                    text: "black",
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
                    placeholder: "grey",
                    text: "black",
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
                    placeholder: "grey",
                    text: "black",
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
                    placeholder: "grey",
                    text: "black",
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
                    placeholder: "grey",
                    text: "black",
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
                    placeholder: "grey",
                    text: "black",
                  },
                }}
                underlineColor="#1c2e65"
                underlineColorAndroid="#1c2e65"
              />
            </View>
            <View style={styles.distance}></View>

            <Button
              style={[
                styles.background,
                {
                  borderRadius: 15,
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                  shadowOpacity: 0.22,
                  shadowRadius: 2.22,

                  elevation: 3,
                },
              ]}
              title="Verify"
              onPressHandler={confirmCode}
            />

            <View
              style={{
                flexDirection: "row",
                width: "76%",
                alignSelf: "center",
                justifyContent: "space-around",
              }}
            >
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
                    fontSize: 16,
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
                  toast.show({
                    title: "Code Sent!",
                    status: "success",
                    description: "Code has been sent to your number",
                    duration: 1500,
                    minWidth: "90%",
                    isClosable: false,
                  });
                }}
                style={{ justifyContent: "center" }}
              >
                <Text
                  style={{
                    color: "#1c2e65",
                    alignSelf: "center",
                    fontSize: 16,
                    fontWeight: "800",
                  }}
                >
                  Resend Code ?
                </Text>
              </TouchableOpacity>
            </View>
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
    fontWeight: "600",
    fontSize: 25,
    textAlign: "center",
    backgroundColor: "#E4E5E6",
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
    height: 16,
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
    width: "100%",
    alignSelf: "center",
    paddingHorizontal: 20,
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
  form_container_modal: {
    backgroundColor: "#fff",
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 20,

  },
  dropdownHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: "#000000",
    borderBottomWidth: 0.5,
    height: 55,
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    width: "100%",
    marginTop: 80,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  checkerItem: {
    flexDirection: "row",
    // marginTop: 9,
    borderBottomColor: "grey",
    borderBottomWidth: 0.5,
    justifyContent: "space-between",
    paddingVertical: 7,
    minHeight: 52,
    marginBottom:10
  },
});
