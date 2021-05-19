import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { Component, useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";

import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-paper";
import { Button } from "../../Component/Button/Index";
import { updateProfile } from "../../Data/FetchData";
import { ScrollView } from "react-native-gesture-handler";

const EditProfile = ({ navigation, route }) => {
  const [userinfo, setUserInfo] = useState(null);
  const [userData, setUserData] = useState({
    email: "",
    username: "",
    name: "",
    phone: "",
  });
  const item = route.params.userinfo;

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
              onChangeText={(e) => setUserData({ ...userData, email: e })}
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
              defaultValue={userinfo && userinfo.email}
              style={styles.inputContainer}
            />

            <TextInput
              onChangeText={(e) => setUserData({ ...userData, name: e })}
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
              defaultValue={userinfo && userinfo.name}
              style={styles.inputContainer}
            />
            <TextInput
              onChangeText={(e) => setUserData({ ...userData, username: e })}
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
              defaultValue={userinfo && userinfo.username}
              style={styles.inputContainer}
            />

            <TextInput
              onChangeText={(e) => setUserData({ ...userData, phone: e })}
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
              defaultValue={userinfo && userinfo.phone}
              style={styles.inputContainer}
            />

            <Button
              onPressHandler={() => updateProfile(userinfo, userData)}
              style={styles.buttonContainer}
              title="Update Profile"
            />
          </ScrollView>
        </View>
      </View>
    </View>
  );
};
export default EditProfile;
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
    width: 250,
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