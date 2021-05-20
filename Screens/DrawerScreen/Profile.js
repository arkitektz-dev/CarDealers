import firestore from "@react-native-firebase/firestore";
import React, { Component, useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import { Button } from "../../Component/Button/Index";
import { getData, uploadImage } from "../../Data/FetchData";

const Profile = ({ navigation }) => {
  const [userinfo, setUserInfo] = useState(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    getData().then((data) => setUserInfo(data));
  }, []);
  const setUploadImage = async () => {
    const options = {
      maxWidth: 2000,
      maxHeight: 2000,
      storageOptions: {
        skipBackup: true,
        path: "images",
      },
    };
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        const source = { uri: response.uri };
        setImage(source);
      }
    });
    const { uri } = image;
    const filename = uri.substring(uri.lastIndexOf("/") + 1);
    const uploadUri = Platform.OS === "ios" ? uri.replace("file://", "") : uri;

    firestore()
      .collection("Users")
      .doc("Image")
      .set(uploadUri)
      .then(() => {
        console.log("User added!");
      });
  };
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
        accessibilityLabel="Pic"
        source={{
          uri: image && image.uri,
        }}
      />
      <View style={styles.body}>
        <View style={styles.bodyContent}>
          <Text style={styles.name}>{userinfo && userinfo.name}</Text>
          <Text style={styles.info}>Email: {userinfo && userinfo.email}</Text>

          <Button
            onPressHandler={() =>
              navigation.navigate("EditProfile", { userinfo })
            }
            style={styles.buttonContainer}
            title="Edit Profile"
          />
          <Button
            onPressHandler={() =>
              navigation.navigate("UpdatePassword", { userinfo })
            }
            style={styles.buttonContainer}
            title="Update Password"
          />
          <Button
            onPressHandler={setUploadImage}
            style={styles.buttonContainer}
            title="Upload Picture"
          />
        </View>
      </View>
    </View>
  );
};
export default Profile;
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
    flex: 1,
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
