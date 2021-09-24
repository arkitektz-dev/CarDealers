import firestore from "@react-native-firebase/firestore";
import React, { memo, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import IonIcon from "react-native-vector-icons/Ionicons";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import storage from "@react-native-firebase/storage";
import { launchImageLibrary } from "react-native-image-picker";
import { Button } from "../../Component/Button/Index";
import { getData } from "../../Data/FetchData";
import { imageChecker, screenHeight } from "../../Global/Dimension";
import Feather from "react-native-vector-icons/Fontisto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const Profile = ({ navigation }) => {
  const [userinfo, setUserInfo] = useState(null);
  const [update, setUpdate] = useState(false);

  const [uploading, setUploading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [image, setImage] = useState(undefined);
  useEffect(() => {
    getData().then((data) => {
      setUserInfo(data);
      setImage(data.image);
    });
  }, []);
  const functionBack = () => {
    console.log("testfing");
    getData().then((data) => {
      setUserInfo(data);
      setImage(data.image);
    });
  };

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
      mediaType: "photo",
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
        <View>
          <Text style={{ fontSize: 16, fontWeight: "700", color: "white" }}>
            User Profile
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
      <ScrollView style={{ paddingHorizontal: 20 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 18,
            marginBottom: 18,
            borderBottomColor: "grey",
            borderBottomWidth: 0.5,
            paddingBottom: 10,
          }}
        >
           <Image
          style={[styles.avatar,{display:'none'}]}
          accessibilityLabel="Pic"
          source={{
            uri: imageChecker(image),
          }}
          onLoadStart={() => setImageLoading(true)}
          onLoadEnd={() => setImageLoading(false)}
        />
          {imageLoading ? (
            <SkeletonPlaceholder >
              <SkeletonPlaceholder.Item
                width={80}
                height={80}
                borderRadius={63}
                
              />
            </SkeletonPlaceholder>
          ) : <Image
          style={styles.avatar}
          accessibilityLabel="Pic"
          source={{
            uri: imageChecker(image),
          }}
        />}

          <View style={{ marginTop: -15, marginLeft: 10 }}>
            <Text>{userinfo && userinfo.name.toUpperCase()}</Text>
            <Text>{userinfo && userinfo.email}</Text>
          </View>
        </View>
        <Text style={{ fontSize: 13 }}>Settings</Text>
        <TouchableOpacity
          style={{
            width: "100%",
            // height: 50,
            flexDirection: "row",
            justifyContent: "space-between",
            // alignItems: "center",
            paddingHorizontal: 2,
            borderBottomColor: "grey",
            borderBottomWidth: 0.5,
            marginTop: 18,
            paddingBottom: 18,
          }}
          onPress={() =>
            navigation.navigate("EditProfile", {
              userinfo,
              functionBack: functionBack,
            })
          }
        >
          <Text style={{ color: "black", fontSize: 17 }}>Edit Profile</Text>
          <Feather name="arrow-right" size={18} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: "100%",
            // height: 50,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 2,
            borderBottomColor: "grey",
            borderBottomWidth: 0.5,
            marginTop: 18,
            paddingBottom: 18,
          }}
          onPress={() => navigation.navigate("UpdatePassword", { userinfo })}
        >
          <Text style={{ color: "black", fontSize: 17 }}>Change Password</Text>
          <Feather name="arrow-right" size={18} color="black" />
        </TouchableOpacity>

        {/* <View
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
              onPress={() =>
                navigation.navigate("UpdatePassword", { userinfo })
              }
            />
          </View>
        </View> */}
      </ScrollView>
    </View>
  );
};
export default memo(Profile);
const styles = StyleSheet.create({
  header: {
    backgroundColor: "#1c2e65",
    height: 55,
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
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
    width: 80,
    height: 80,
    borderRadius: 63,
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
