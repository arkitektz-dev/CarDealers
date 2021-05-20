import React, { useEffect, useState } from "react";
import { updatePassword } from "../../Data/FetchData";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { HelperText, TextInput } from "react-native-paper";
import { Button } from "../../Component/Button/Index";
import { ScrollView } from "react-native-gesture-handler";

const UpdatePassword = ({ navigation, route }) => {
  const [userinfo, setUserInfo] = useState(null);
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [confirmMatch, setConfirmMatch] = useState(false);
  const [userData, setUserData] = useState({
    password: "",
  });
  const item = route.params.userinfo;
  const onChangeHandeler = (text) => {
    if (text.length >= 4 && text != userinfo.password) {
      setPasswordMatch(true);
    } else {
      setPasswordMatch(false);
    }
  };
  const onConfirmPassword = (text) => {
    if (text.length >= 4 && text != userData.password) {
      setConfirmMatch(true);
    } else {
      setConfirmMatch(false);
    }
  };
  useEffect(() => {
    setUserInfo(item);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            left: 10,
            top: 10,
            backgroundColor: "#fff",
            width: 35,
            height: 35,
            borderRadius: 35 / 2,
          }}
        ></TouchableOpacity>
      </View>
      <Image
        style={styles.avatar}
        source={{ uri: "https://bootdey.com/img/Content/avatar/avatar6.png" }}
      />
      <View style={styles.body}>
        <View style={styles.bodyContent}>
          <ScrollView>
            <TextInput
              placeholder="Old Password"
              onChangeText={onChangeHandeler}
              underlineColor="#696969"
              underlineColorAndroid="#696969"
              theme={{
                colors: {
                  primary: "#696969",
                  placeholder: "#696969",
                  text: "#696969",
                },
              }}
              renderToHardwareTextureAndroid
              returnKeyType="next"
              style={styles.inputContainer}
            />
            {passwordMatch ? (
              <HelperText
                type="error"
                style={{
                  color: "#333",
                  fontWeight: "500",
                  textAlign: "center",
                }}
              >
                Password Does Not Match!
              </HelperText>
            ) : null}
            <TextInput
              onChangeText={(e) => setUserData({ ...userData, password: e })}
              underlineColor="#696969"
              underlineColorAndroid="#696969"
              theme={{
                colors: {
                  primary: "#696969",
                  placeholder: "#696969",
                  text: "#696969",
                },
              }}
              renderToHardwareTextureAndroid
              returnKeyType="next"
              placeholder="New Password"
              style={styles.inputContainer}
            />
            <TextInput
              placeholder="Confirm Password"
              onChangeText={onConfirmPassword}
              underlineColor="#696969"
              underlineColorAndroid="#696969"
              theme={{
                colors: {
                  primary: "#696969",
                  placeholder: "#696969",
                  text: "#696969",
                },
              }}
              renderToHardwareTextureAndroid
              returnKeyType="next"
              style={styles.inputContainer}
            />
            {confirmMatch ? (
              <HelperText
                type="error"
                style={{
                  color: "#333",
                  fontWeight: "500",
                  textAlign: "center",
                }}
              >
                Password Does Not Match!
              </HelperText>
            ) : null}
            <Button
              onPressHandler={() => updatePassword(userinfo, userData)}
              style={styles.buttonContainer}
              title="Update Profile"
            />
          </ScrollView>
        </View>
      </View>
    </View>
  );
};
export default UpdatePassword;
const styles = StyleSheet.create({
  header: {
    backgroundColor: "red",
    height: 200,
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
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: "red",
  },
});
