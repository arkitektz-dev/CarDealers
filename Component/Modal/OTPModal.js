import React, { createRef, useEffect, useRef, useState } from "react";
import { Dimensions, Modal, StyleSheet, View } from "react-native";
import { TextInput } from "react-native-paper";
import auth from "@react-native-firebase/auth";
import { Button } from "../Button/Index";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
export const OTPModal = ({ status }) => {
  const a = createRef();
  const b = createRef();
  const c = createRef();
  const [otpInput, setOTPInput] = useState({
    pin1: "",
    pin2: "",
    pin3: "",
    pin4: "",
    pin5: "",
    pin6: "",
  });

  async function confirmCode() {
    try {
      await confirm.confirm(code);
    } catch (error) {
      console.log("Invalid code.");
    }
  }
  return (
    <Modal visible={status} animationType={"slide"}>
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
            ref={a}
            autoFocus={true}
            blurOnSubmit={false}
            onSubmitEditing={() => b.current.focus()}
            onChangeText={(e) => setOTPInput({ ...otpInput, first: e })}
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
            ref={b}
            onSubmitEditing={() => c.current.focus()}
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
            ref={c}
            maxLength={1}
            placeholder="-"
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
      </View>
      <Button title="Verify" onLogin={confirmCode} />
    </Modal>
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
});
