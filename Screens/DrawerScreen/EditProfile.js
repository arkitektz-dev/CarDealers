import React, { memo, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import AppTextInput from "../../Component/TextInput/Index";
import { Button } from "../../Component/Button/Index";
import { updateProfile } from "../../Data/FetchData";
import IonIcon from "react-native-vector-icons/Ionicons";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import storage from "@react-native-firebase/storage";
import * as ImagePicker from "expo-image-picker";

import { imageChecker, screenHeight } from "../../Global/Dimension";
import { HelperText } from "react-native-paper";

const EditProfile = ({ navigation, route }) => {
  const [userinfo, setUserInfo] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);

  const [image, setImage] = useState(route.params.userinfo?.image);
  const [url, setUrl] = useState(false);
  const [userData, setUserData] = useState({
    email: route.params.userinfo.email,
    name: route.params.userinfo.name,
    image: route.params.userinfo.image,
  });
  const [error, setError] = useState({
    name: false,
    email: false,
  });

  const onChangeEmail = (e) => {
    setUserData({ ...userData, email: e });
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(e) === false) {
      setError({ ...error, email: true });
    } else {
      setError({ ...error, email: false });
    }
  };
  const onChangeName = (e) => {
    setUserData({ ...userData, name: e });
    if (e == "") {
      setError({ ...error, name: true });
    } else {
      setError({ ...error, name: false });
      
    }
  };
  const onSubmitHandler = async(url) => {
    if (error.email) {
      alert("Format is not Correct");
    }
    if (userData == {}) {
      alert("Fields Can Not be Empty");
    }
    if (!error.email && userData != {}) {
      if (url !== undefined) {
        updateProfile(userinfo, { ...userData, image: url });
      } else {
        console.log(userinfo)
       const res = await updateProfile(userinfo, userData);
       console.log(res)
      }
      setTimeout(() => {
        setUploading(false);
        navigation.goBack();
        route.params.functionBack();
      }, 1500);
    }
  };
  useEffect(() => {
    console.log(route.params.userinfo);
    setUserInfo(route.params.userinfo);
  }, []);

  const imageURI = async () => {
    setUploading(true);
    if (url == true) {
      console.log(image);
      const uploadImage = image.substring(image.lastIndexOf("/") + 1);

      setTransferred(0);
      const storageRef = storage().ref(`photos/${uploadImage}`);
      const task = storageRef.putFile(image);
      task.on("state_changed", (taskSnapshot) => {
        console.log(
          `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`
        );
        setTransferred(
          Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
            100
        );
      });
      try {
        await task;
        const url = await storageRef.getDownloadURL();

        console.log(url);
        // setImage(null);
        onSubmitHandler(url);

        return url;
      } catch (error) {
        console.log(error);
      }
    } else {
      onSubmitHandler();
    }
  };

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const selectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.5,
      });
      if (!result.cancelled) {
        setImage(result.uri);
        setUrl(true);
      }
    } catch (error) {
      console.log("Error reading an image", error);
    }
  };

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
              Edit Profile
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
            justifyContent: "center",
            paddingHorizontal: 20,
          }}
        >
          <View>
            <View
              style={{
                margin: 10,
                position: "absolute",
                zIndex: 10,
                top: -55,
                right: -12,
                borderRadius: 50,
                backgroundColor: "white",
                width: 25,
                height: 25,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <EvilIcons
                name="pencil"
                color="black"
                size={24}
                onPress={() => selectImage()}
              />
            </View>
            <Image
              style={styles.avatar}
              accessibilityLabel="Pic"
              source={{
                uri: imageChecker(image),
              }}
            />
          </View>
          <View
            style={{
              width: "100%",
              alignSelf: "center",
            }}
          >
            <AppTextInput
              label="Full Name"
              returnKeyType="next"
              value={userData.name}
              onChangeHandler={(e) => onChangeName(e)}
            />
          </View>
          <View
            style={{
              width: "100%",
              alignSelf: "center",
            }}
          >
            <AppTextInput
              label="Email"
              returnKeyType="done"
              value={userData.email}
              onChangeHandler={(e) => onChangeEmail(e)}
            />
          </View>
          {error.email ? (
            <HelperText
              type="error"
              style={{
                color: "red",
                fontWeight: "500",
                textAlign: "center",
              }}
            >
              Email is not valid!
            </HelperText>
          ) : null}
          <View
            style={{
              margin: 10,
              alignSelf: "center",
            }}
          >
            <Button
              onPressHandler={!uploading ? imageURI : console.log("ring")}
              style={styles.buttonContainer}
              title={
                uploading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  "Update"
                )
              }
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};
export default memo(EditProfile);
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
    borderWidth: 2,
    borderColor: "white",
    marginBottom: 10,
    alignSelf: "center",
    marginTop: -50,
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
