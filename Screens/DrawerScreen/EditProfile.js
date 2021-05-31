import React, { memo, useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import AppTextInput from "../../Component/TextInput/Index";
import { Button } from "../../Component/Button/Index";
import { updateProfile } from "../../Data/FetchData";
import { ScrollView } from "react-native-gesture-handler";

const EditProfile = ({ navigation, route }) => {
  const [userinfo, setUserInfo] = useState(null);
  const [userData, setUserData] = useState({
    email: "",

    name: "",
  });
  const [error, setError] = useState({
    name: false,
    email: false,
  });
  const item = route.params.userinfo;

  const onChangeEmail = (e) => {
    if (e == "") {
      setError({ ...error, email: true });
    } else {
      setError({ ...error, email: false });
      setUserData({ ...userData, email: e });
    }
  };
  const onChangeName = (e) => {
    if (e == "") {
      setError({ ...error, name: true });
    } else {
      setError({ ...error, name: false });
      setUserData({ ...userData, name: e });
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
        source={{
          uri: userinfo && userinfo.image,
        }}
      />
      <View style={styles.body}>
        <View style={styles.bodyContent}>
          <ScrollView>
            <View
              style={{
                flexDirection: "column",
                alignSelf: "center",
              }}
            >
              <Text style={styles.name}>{userinfo && userinfo.username}</Text>
              <Text style={styles.info}>
                Email: {userinfo && userinfo.email}
              </Text>
            </View>

            <AppTextInput
              label="Full Name"
              returnKeyType="next"
              onChangeHandler={(e) => onChangeName(e)}
            />
            <AppTextInput
              label="Email"
              returnKeyType="done"
              onChangeHandler={(e) => onChangeEmail(e)}
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
export default memo(EditProfile);
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
