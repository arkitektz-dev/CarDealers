import React, { memo, useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import AppTextInput from "../../Component/TextInput/Index";
import { Button } from "../../Component/Button/Index";
import { updateProfile } from "../../Data/FetchData";
import { ScrollView } from "react-native-gesture-handler";
import IonIcon from "react-native-vector-icons/Ionicons";
import EvilIcons from "react-native-vector-icons/EvilIcons";

import { screenHeight } from "../../Global/Dimension";

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
    setUserInfo(route.params.userinfo);
    setUserData({});
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
        source={{
          uri: userinfo && userinfo.image,
        }}
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
          <AppTextInput
            label="Full Name"
            returnKeyType="next"
            onChangeHandler={(e) => onChangeName(e)}
          />
        </View>
        <View
          style={{
            width: "80%",
            alignSelf: "center",
          }}
        >
          <AppTextInput
            label="Email"
            returnKeyType="done"
            onChangeHandler={(e) => onChangeEmail(e)}
          />
        </View>
        <View
          style={{
            margin: 10,
            alignSelf: "center",
          }}
        >
          <Button
            onPressHandler={() => updateProfile(userinfo, userData)}
            style={styles.buttonContainer}
            title="Update Profile"
          />
        </View>
      </View>
    </View>
  );
};
export default memo(EditProfile);
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
    backgroundColor: "#1c2e65",
  },
});
