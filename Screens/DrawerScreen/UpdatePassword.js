import React, { memo, useEffect, useState,useContext } from "react";
import { clearStorage, updatePassword } from "../../Data/FetchData";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { HelperText, TextInput } from "react-native-paper";
import { Button } from "../../Component/Button/Index";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import IonIcon from "react-native-vector-icons/Ionicons";

import { screenHeight } from "../../Global/Dimension";
import { ActivityIndicator } from "react-native";
import AuthContext from "../../Component/Authcontext";

const UpdatePassword = ({ navigation, route }) => {
  const authContext = useContext(AuthContext);

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

  const onPressHandler = async () => {
    clearStorage();
    authContext.setUser(undefined);
    navigation.replace("Login");
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
    console.log(passwordMatch, confirmMatch);
    if (!passwordMatch && !confirmMatch) {
      await updatePassword(userinfo, userData);
      setLoader(false);
      onPressHandler();
    } else {
      setLoader(false);
      console.log("not done");
    }
  };
  useEffect(() => {
    setUserInfo(item);
  }, []);
  const offsetKeyboard = Platform.select({
    ios: 0,
    android: 20,
  });
  return (
    <ScrollView
      // style={styles.container}
      contentContainerStyle={styles.container}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "android" ? "height" : "padding"}
        keyboardVerticalOffset={offsetKeyboard}
        style={{ flex: 1 }}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <IonIcon
              name="chevron-back-circle-sharp"
              color="white"
              size={35}
              style={{ margin: 10 }}
              onPress={() => navigation.goBack()}
            />
          </TouchableOpacity>
          <View>
            <Text style={{ fontSize: 16, fontWeight: "700", color: "white" }}>
              Change Password
            </Text>
          </View>
          <View style={{ opacity: 0 }}>
            <IonIcon
              name="chevron-back-circle-sharp"
              color="white"
              size={35}
              style={{ margin: 10 }}
              onPress={() => navigation.goBack()}
            />
          </View>
        </View>

        <View style={styles.distance}></View>
        <View
          style={{
            flexDirection: "column",
            width: "100%",
            flex: 1,
            alignItems: "center",
            // justifyContent: "center",
            paddingHorizontal: 20,
          }}
        >
          <View
            style={{
              width: "100%",
              alignSelf: "center",
              marginTop: 10,
            }}
          >
            <TextInput
              // placeholder="Old Password"
              label="Old Password"
              renderToHardwareTextureAndroid
              onChangeText={onChangeHandeler}
              returnKeyType="next"
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
              style={{ backgroundColor: "white", marginTop: 10 }}
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
              width: "100%",
              alignSelf: "center",
              marginTop: 10,
            }}
          >
            <TextInput
              onChangeText={(e) => setUserData({ ...userData, password: e })}
              returnKeyType="next"
              returnKeyType="next"
              // placeholder="New Password"
              label="New Password"
              renderToHardwareTextureAndroid
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
              style={{ backgroundColor: "white", marginTop: 10 }}
            />
          </View>
          <View
            style={{
              width: "100%",
              alignSelf: "center",
              marginTop: 10,
            }}
          >
            <TextInput
              onChangeText={onConfirmPassword}
              returnKeyType="done"
              label="Confirm Password"
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
              style={{ backgroundColor: "white", marginTop: 10 }}
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
                  "Change Password"
                )
              }
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  header: {
    backgroundColor: "#1c2e65",
    height: 55,
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 100,
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
