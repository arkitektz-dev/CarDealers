import firestore from "@react-native-firebase/firestore";
import React, { memo, useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import IonIcon from "react-native-vector-icons/Ionicons";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import storage from "@react-native-firebase/storage";
import { launchImageLibrary } from "react-native-image-picker";
import { Button } from "../../Component/Button/Index";
import { getData } from "../../Data/FetchData";
import { screenHeight } from "../../Global/Dimension";

const Profile = ({ navigation }) => {
  const [userinfo, setUserInfo] = useState(null);
  const [image, setImage] = useState(
    "https://cdn5.vectorstock.com/i/1000x1000/93/09/car-salesman-cartoon-vector-17209309.jpg"
  );
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
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <IonIcon
            name="chevron-back-circle-sharp"
            color="white"
            size={35}
            style={{ margin: 10 }}
            onPress={() => navigation.goBack()}
          />
        </TouchableOpacity>
      </View>
      <Image
        style={styles.avatar}
        accessibilityLabel="Pic"
        source={{
          uri:
            "https://cdn5.vectorstock.com/i/1000x1000/93/09/car-salesman-cartoon-vector-17209309.jpg",
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
          <EvilIcons
            name="pencil"
            size={30}
            onPress={() => navigation.navigate("EditProfile", { userinfo })}
          />
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.info}>Name</Text>
          <Text style={styles.value}>{userinfo && userinfo.name}</Text>
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.info}>Username</Text>
          <Text style={styles.value}>{userinfo && userinfo.username}</Text>
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.info}>Phone</Text>
          <Text style={styles.value}>{userinfo && userinfo.phone}</Text>
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.info}>Email</Text>
          <Text style={styles.value}>{userinfo && userinfo.email}</Text>
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.info}>Password</Text>
          <EvilIcons
            name="pencil"
            size={30}
            onPress={() => navigation.navigate("UpdatePassword", { userinfo })}
          />
        </View>
      </View>
    </View>
  );
};
export default memo(Profile);
const styles = StyleSheet.create({
  header: {
    backgroundColor: "#1c2e65",
    height: 200,
  },
  rowContainer: {
    flexDirection: "row",
    margin: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#808080",
    justifyContent: "space-between",
  },
  distance: { height: screenHeight * 0.09 },
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
    flexDirection: "column",
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
    color: "#000000",
    fontWeight: "bold",
    marginTop: 10,
  },
  container: {
    flex: 1,
    flexDirection: "column",
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
