import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { HelperText, TextInput } from "react-native-paper";
import { Button } from "../../Component/Button/Index";
import { getUserId, passwordReset } from "../../Data/FetchData";
import { screenHeight, screenWidth } from "../../Global/Dimension";

const buttonWidth = screenWidth * 0.7;
const buttonHeight = screenWidth * 0.11;

const logoHeight = screenHeight * 0.2;
const titleHeight = screenHeight * 0.1;

const titleWidth = screenWidth * 0.6;
const logoWidth = screenWidth * 0.5;
const ChangePassword = ({ route, navigation }) => {
  const [match, setMatch] = useState(false);
  const [pass, setPass] = useState();
  const [emptyFieldError, setEmptyFieldError] = useState(false);

  const [secure, setSecure] = useState(true);
  const [id, setId] = useState();
  const value = route.params;
  const onChangeConfirmPassword = (e) => {
    setEmptyFieldError(false);
    if (e != pass) {
      setMatch(true);
    }
    if (e == pass) {
      setMatch(false);
    }
  };

  return (
    <View
      style={{
        flexDirection: "column",
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      <View style={styles.logoContainer}>
        <Text style={styles.headText}>Change Password</Text>
      </View>
      <View style={styles.inputContainer}>
        <View></View>
        <View style={styles.distance}></View>
        <TextInput
          // right={<TextInput.Icon name="eye" onPress={() => setSecure(false)} />}
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
            setEmptyFieldError(false), setPass(e);
          }}
        />
        <TextInput
          // right={<TextInput.Icon name="eye" onPress={() => setSecure(false)} />}
          secureTextEntry={secure}
          placeholderTextColor="#000000"
          placeholder="Confirm Password"
          label="Confirm Password:"
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
            onChangeConfirmPassword(e);
          }}
        />
      </View>
      {match ? (
        <HelperText
          type="error"
          style={{
            top: 20,
            color: "#000000",
            fontWeight: "500",
            fontSize: 15,
            textAlign: "center",
          }}
        >
          Passwords Do Not Match
        </HelperText>
      ) : null}
      {emptyFieldError ? (
        <HelperText
          type="error"
          style={{ color: "#000000", fontWeight: "500", textAlign: "center" }}
        >
          Field can not be empty!
        </HelperText>
      ) : null}
      <Button
        title="Change Password"
        onPressHandler={() => passwordReset(value, pass, navigation)}
        style={styles.background}
      />
    </View>
  );
};
export default ChangePassword;

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
    backgroundColor: "#1c2e65",
  },
  headText: {
    fontSize: 20,
    fontWeight: "900",
    color: "#000000",
    textAlign: "center",
  },
  logoContainer: {
    margin: 20,
  },
  titleContainer: {
    alignSelf: "center",
    height: titleHeight * 0.6,
    width: titleWidth,
    justifyContent: "center",
    flexDirection: "column",
  },
});
