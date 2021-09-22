import React, { memo, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
} from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import { Button } from "../../Component/Button/Index";
import { imageChecker, screenWidth } from "../../Global/Dimension";
import AppTextInput from "../../Component/TextInput/Index";
import { AddShowroomData } from "../../Data/FetchData";
import IonIcon from "react-native-vector-icons/Ionicons";
import { useToast } from "native-base";
import AppPicker from "../../Component/Pickers/Index";
import CategoryPickerItem from "../../Component/Picker/CategoryPickerItem";

import EvilIcons from "react-native-vector-icons/EvilIcons";
import storage from "@react-native-firebase/storage";
import * as ImagePicker from "expo-image-picker";
import ErrorHandle from "../../Component/HelperText";
import { Alert } from "react-native";
import { backgroundColor } from "styled-system";
import { ActivityIndicator } from "react-native-paper";

const AddShowroom = ({ navigation }) => {
  const [showroomData, setShowroomData] = useState({
    name: "",
    website: "",
    city: "",
    contactInformation: "",
    email: "",
    address: "",
    images: [],
  });
  const [uploading, setUploading] = useState(false);

  const [errorState, setErrorState] = useState({
    name: false,
    nameError: false,
    contactInformation: false,
    contactInformationType: false,
    email: false,
  });
  const city = [
    { label: "Karachi", value: "Karachi" },
    { label: "Lahore", value: "Lahore" },
    { label: "Islamabad", value: "Islamabad" },
  ];

  const [image, setImage] = useState(undefined);

  const toast = useToast();
  const showToaster = () => {
    toast.show({
      title: "Showroom",
      status: "success",
      description: "Your Showroom has been added",
      duration: 2000,
      minWidth: "90%",
      isClosable: false,
    });
    navigation.goBack();
  };

  const imageURI = async () => {
    console.log(image);
    if (
      showroomData.name != "" &&
      showroomData.address != "" &&
      showroomData.contactInformation != "" &&
      image != undefined
    ) {
      setUploading(true);
      const uploadImage = image.substring(image.lastIndexOf("/") + 1);

      // setTransferred(0);
      const storageRef = storage().ref(`photos/${uploadImage}`);
      const task = storageRef.putFile(image);
      task.on("state_changed", (taskSnapshot) => {
        console.log(
          `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`
        );
        // setTransferred(
        //   Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
        //     100
        // );
      });
      try {
        await task;
        const url = await storageRef.getDownloadURL();

        console.log(url);
        // setImage(null);
        onSubmitHandler(url);
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.show({
        title: "Error",
        status: "error",
        description: "Fill the required fields",
        duration: 2000,
        minWidth: "90%",
        isClosable: false,
      });
    }
  };

  const onSubmitHandler = (url) => {
    if (
      errorState.name != true ||
      errorState.contactInformationType != true ||
      errorState.contactInformation != true
    ) {
      AddShowroomData({
        showroomData: { ...showroomData, images: [url] },
        showToaster: showToaster,
      });
      setUploading(false);
      setShowroomData({
        name: "",
        website: "",
        city: "",
        contactInformation: "",
        email: "",
        address: "",
        images: [],
      });
      setImage(undefined);
    } else {
      Alert("Fields are invalid");
    }
  };
  const onChangeNameHandeler = (e) => {
    if (e == "") {
      setErrorState({ name: true });
    } else {
      setErrorState({ name: false });
      setShowroomData({ ...showroomData, name: e });
    }
  };
  const onChangeContactInformation = (e) => {
    const re = /^[0-9\b]/;
    if (e == "") {
      setErrorState({ contactInformation: true });
    } else {
      setErrorState({ contactInformation: false });
    }
    if (re.test(e) == false) {
      setErrorState({ contactInformationType: true });
    } else {
      setErrorState({ contactInformationType: false });
      setShowroomData({ ...showroomData, contactInformation: e });
    }
  };
  const onChangeEmailHandeler = (e) => {
    setShowroomData({ ...showroomData, email: e });
  };

  const selectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.5,
      });
      if (!result.cancelled) {
        setImage(result.uri);
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
    <ScrollView contentContainerStyle={styles.container}>
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
              Add Showroom
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
        <View
          style={{
            flexDirection: "column",
            width: "100%",
            flex: 1,
            paddingHorizontal: 20,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 60,
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
          <AppTextInput
            onChangeHandler={(e) => onChangeNameHandeler(e)}
            label="Name of Showroom *"
            returnKeyType="next"
          />
          {errorState.name ? (
            <ErrorHandle text="Field Can Not be empty" />
          ) : null}
          {errorState.nameError ? (
            <ErrorHandle text="Numbers can not be used in name" />
          ) : null}

          <AppTextInput
            onChangeHandler={(e) =>
              setShowroomData({ ...showroomData, address: e })
            }
            label="Address *"
            returnKeyType="next"
          />
          <AppPicker
            title="City"
            items={city}
            name="category"
            onSelectItem={(item) => {
              setShowroomData({ ...showroomData, city: item.label });
            }}
            PickerItemComponent={CategoryPickerItem}
            placeholder=" City *"
            selectedItem={showroomData.city}
            width="100%"
            style={styles.dropdown}
          />
          <AppTextInput
            onChangeHandler={(e) => onChangeEmailHandeler(e)}
            label="Email"
            returnKeyType="next"
          />
          {errorState.email ? <ErrorHandle text="Email not valid" /> : null}
          <AppTextInput
            maxLength={14}
            onChangeHandler={(e) => onChangeContactInformation(e)}
            label="Contact Number"
            returnKeyType="next"
          />
          {errorState.contactInformation ? (
            <ErrorHandle text="Field Can Not be empty" />
          ) : null}

          {errorState.contactInformationType ? (
            <ErrorHandle text="Phone Number is not valid" />
          ) : null}
          <AppTextInput
            onChangeHandler={(e) =>
              setShowroomData({ ...showroomData, website: e })
            }
            label="Website"
            returnKeyType="done"
          />
          <View style={styles.distance}></View>
          <Button
            title={
              uploading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                "Submit"
              )
            }
            onPressHandler={!uploading ? imageURI : console.log("ring")}
            style={styles.buttonContainer}
          />
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};
export default memo(AddShowroom);
const styles = StyleSheet.create({
  parent: {
    backgroundColor: "white",
    flexDirection: "column",
    flex: 1,
  },
  container: {
    flex: 1,
    flexDirection: "column",
  },
  form: {
    width: "100%",
    alignSelf: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  buttonContainer: {
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: "#1e2d64",
    alignSelf: "center",
  },

  distance: {
    width: screenWidth * 0.09,
  },
  header: {
    backgroundColor: "#1c2e65",
    height: 55,
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 100,
  },
  dropdown: {
    backgroundColor: "white",
    borderRadius: 4,
    borderColor: "grey",
    borderWidth: 1,
    marginBottom: -2,
    borderBottomWidth: 1,
    paddingLeft:10,
    
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
});
