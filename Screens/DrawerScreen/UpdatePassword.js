import React, { memo, useEffect, useState } from "react";
import { updatePassword } from "../../Data/FetchData";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { HelperText, TextInput } from "react-native-paper";
import { Button } from "../../Component/Button/Index";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import IonIcon from "react-native-vector-icons/Ionicons";

import { screenHeight } from "../../Global/Dimension";
import { ActivityIndicator } from "react-native";

const UpdatePassword = ({ navigation, route }) => {
  const [loader, setLoader] = useState(false);
  const [userinfo, setUserInfo] = useState(null);
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [confirmMatch, setConfirmMatch] = useState(false);
  const [userData, setUserData] = useState({
    password: "",
    confirmPassword: "",
  });
  const item = route.params.userinfo;
  const onChangeHandeler = (text) => {
    if (text != userinfo.password) {
      setPasswordMatch(true);
    } else {
      setPasswordMatch(false);
    }
  };
  const onConfirmPassword = (text) => {
    setUserData({ ...userData, confirmPassword: text });
    if (text != userData.password) {
      setConfirmMatch(true);
    } else {
      setConfirmMatch(false);
    }
  };
  const onSubmitHandler = async () => {
    setLoader(true);

    if (!passwordMatch && !confirmMatch) {
      await updatePassword(userinfo, userData);
      setLoader(false);

      setLoader(false);
    }
    setLoader(false);
  };
  useEffect(() => {
    setUserInfo(item);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <IonIcon
          name="chevron-back-circle-sharp"
          color="white"
          size={35}
          style={{ margin: 10 }}
          onPress={() => navigation.goBack()}
        />
      </View>
      <Image
        style={styles.avatar}
        source={{ uri: userinfo && userinfo.image }}
      />

      <View style={styles.distance}></View>
      <View
        style={{
          flexDirection: "column",
          flex: 0.8,
          width: "90%",
          alignSelf: "center",
          borderRadius: 12,
          borderWidth: 1,
          borderColor: "#333",
          backgroundColor: "#fff",
        }}
      >
        <View
          style={{ flexDirection: "row", margin: 5, alignSelf: "flex-end" }}
        >
          <EvilIcons name="pencil" size={30} />
        </View>
        <View
          style={{
            width: "80%",
            alignSelf: "center",
          }}
        >
          <TextInput
            placeholder="Old Password"
            label="Old Password"
            placeholderTextColor="#000000"
            mode="flat"
            renderToHardwareTextureAndroid
            onChangeText={onChangeHandeler}
            returnKeyType="next"
            underlineColor="#000000"
            underlineColorAndroid="#000000"
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
          />
          {passwordMatch ? (
            <HelperText
              type="error"
              style={{
                color: "red",
                fontWeight: "500",
                textAlign: "center",
              }}
            >
              Does not match old password!
            </HelperText>
          ) : null}
        </View>
        <View
          style={{
            width: "80%",
            alignSelf: "center",
          }}
        >
          <TextInput
            onChangeText={(e) => setUserData({ ...userData, password: e })}
            returnKeyType="next"
            placeholder="New Password"
            placeholderTextColor="#000000"
            mode="flat"
            label="New Password"
            renderToHardwareTextureAndroid
            returnKeyType="next"
            underlineColor="#000000"
            underlineColorAndroid="#000000"
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
          />
        </View>
        <View
          style={{
            width: "80%",
            alignSelf: "center",
          }}
        >
          <TextInput
            onChangeText={onConfirmPassword}
            returnKeyType="done"
            placeholder="Confirm Password"
            placeholderTextColor="#000000"
            mode="flat"
            label="Confirm Password"
            renderToHardwareTextureAndroid
            underlineColor="#000000"
            underlineColorAndroid="#000000"
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
          />
          {confirmMatch ? (
            <HelperText
              type="error"
              style={{
                color: "red",
                fontWeight: "500",
                textAlign: "center",
              }}
            >
              Password Does Not Match!
            </HelperText>
          ) : null}
        </View>
        <View
          style={{
            margin: 10,
            alignSelf: "center",
          }}
        >
          <Button
            onPressHandler={onSubmitHandler}
            style={styles.buttonContainer}
            title={
              loader ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                "Update Password"
              )
            }
          />
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
    backgroundColor: "#1c2e65",
    height: 200,
  },
  distance: { height: screenHeight * 0.09 },

  container: {
    flex: 1,
    flexDirection: "column",
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
    alignSelf: "center",
    position: "absolute",
    marginTop: 130,
  },
  name: {
    fontSize: 22,
    color: "#FFFFFF",
    fontWeight: "600",
  },
  body: {
    marginTop: 40,
  },
  bodyContent: {
    alignItems: "center",
    padding: 30,
  },
  name: {
    fontSize: 28,
    color: "#696969",
    fontWeight: "600",
  },
  info: {
    fontSize: 16,
    color: "#696969",
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    color: "#696969",
    marginTop: 10,
    textAlign: "center",
  },
  inputContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  info: {
    fontSize: 16,
    color: "#000000",
    fontWeight: "bold",
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    color: "#818589",
    fontWeight: "bold",
    marginTop: 10,
  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: "#1c2e65",
  },
});
export default memo(UpdatePassword);
