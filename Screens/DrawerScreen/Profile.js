import firestore from "@react-native-firebase/firestore";
import React, { memo, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import storage from "@react-native-firebase/storage";

import { launchImageLibrary } from "react-native-image-picker";
import { Button } from "../../Component/Button/Index";
import { getData } from "../../Data/FetchData";

const Profile = ({ navigation }) => {
  const [userinfo, setUserInfo] = useState(null);
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);

  useEffect(() => {
    getData().then((data) => {
      setUserInfo(data);

      firestore()
        .collection("Users")
        .doc(data.id)
        .get()
        .then((data) => setImage(data.data().image));
    });
  }, []);

  const imageURI = async () => {
    const uploadImage = image.substring(image.lastIndexOf("/") + 1);
    setUploading(true);
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
      setUploading(false);
      setImage(null);
      alert("Picture Added");
      return url;
    } catch (error) {
      console.log(error);
    }
  };

  const submitPost = async () => {
    const url = await imageURI();
    const { id } = userinfo;

    firestore()
      .collection("Users")
      .doc(id)
      .update({ image: url })
      .then(() => {
        setImage(url);
      });
  };

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
      if (response.error) {
        alert("Error");
      } else {
        setImage(response.uri);
      }
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
          uri: image,
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
          {/* <Button
            onPressHandler={setUploadImage}
            style={styles.buttonContainer}
            title="Upload Picture"
          />
          {uploading ? (
            <>
              <Text>{transferred} % Completed</Text>
              <ActivityIndicator size="small" color="red" />
            </>
          ) : (
            <Text>Done</Text>
          )}
          <Button
            onPressHandler={submitPost}
            style={styles.buttonContainer}
            title="Submit"
          /> */}
        </View>
      </View>
    </View>
  );
};
export default memo(Profile);
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
