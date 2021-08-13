import React, { memo, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import { Button } from "../../Component/Button/Index";
import { screenWidth } from "../../Global/Dimension";
import AppTextInput from "../../Component/TextInput/Index";
import { AddShowroomData } from "../../Data/FetchData";
import IonIcon from "react-native-vector-icons/Ionicons";

import ErrorHandle from "../../Component/HelperText";
import { Alert } from "react-native";

const AddShowroom = ({ navigation }) => {
  const [showroomData, setShowroomData] = useState({
    name: "",
    website: "",
    city: "",
    contactInformation: "",
    email: "",
    location: "",
    address: "",
    images: [
      "https://www.homelandtransportcompany.com/wp-content/uploads/2021/03/haggle-free.jpg",
    ],
  });
  const [errorState, setErrorState] = useState({
    name: false,
    nameError: false,
    contactInformation: false,
    contactInformationType: false,
    location: false,
    email: false,
  });
  const setUploadImage = () => {
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
        const images = [];
        images.push(response.uri);
        setShowroomData({ ...showroomData, images: images });
      }
    });
  };

  const onSubmitHandler = () => {
    if (
      errorState.name != true ||
      errorState.location != true ||
      errorState.contactInformationType != true ||
      errorState.contactInformation != true
    ) {
      AddShowroomData(showroomData);
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
  const onChangelocation = (e) => {
    if (e == "") {
      setErrorState({ location: true });
    } else {
      setErrorState({ location: false });
      setShowroomData({ ...showroomData, location: e });
    }
  };
  const onChangeEmailHandeler = (e) => {
    setShowroomData({ ...showroomData, email: e });
  };

  return (
    <View style={styles.parent}>
      <View
        style={{ backgroundColor: "#1e2d64", flexDirection: "row", height: 50 }}
      >
        <IonIcon
          name="chevron-back-circle-sharp"
          color="white"
          size={35}
          style={{ margin: 5 }}
          onPress={() => navigation.goBack()}
        />

        <View
          style={{
            flexDirection: "row",
            flex: 1,
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: 18,
              fontWeight: "bold",
              textAlignVertical: "center",
            }}
          >
            Add your Showroom
          </Text>
        </View>
      </View>
      <View style={styles.form}>
        <AppTextInput
          onChangeHandler={(e) => onChangeNameHandeler(e)}
          label="Name of Showroom:"
          returnKeyType="next"
        />
        {errorState.name ? <ErrorHandle text="Field Can Not be empty" /> : null}
        {errorState.nameError ? (
          <ErrorHandle text="Numbers can not be used in name" />
        ) : null}
        <AppTextInput
          onChangeHandler={(e) => onChangelocation(e)}
          label="Location:"
          returnKeyType="next"
        />
        {errorState.location ? (
          <ErrorHandle text="Field Can Not be empty" />
        ) : null}

        <AppTextInput
          onChangeHandler={(e) =>
            setShowroomData({ ...showroomData, address: e })
          }
          label="Address:"
          returnKeyType="next"
        />
        <AppTextInput
          onChangeHandler={(e) => setShowroomData({ ...showroomData, city: e })}
          label="City:"
          returnKeyType="next"
        />
        <AppTextInput
          onChangeHandler={(e) => onChangeEmailHandeler(e)}
          label="Email:"
          returnKeyType="next"
        />
        {errorState.email ? <ErrorHandle text="Email not valid" /> : null}
        <AppTextInput
          maxLength={14}
          onChangeHandler={(e) => onChangeContactInformation(e)}
          label="Contact information:"
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
          label="Website:"
          returnKeyType="done"
        />

        <Button
          title={"Submit"}
          onPressHandler={onSubmitHandler}
          style={styles.buttonContainer}
        />
      </View>
    </View>
  );
};
export default memo(AddShowroom);
const styles = StyleSheet.create({
  parent: {
    backgroundColor: "white",
    flexDirection: "column",
    flex: 1,
  },
  form: {
    width: screenWidth * 0.7,
    alignSelf: "center",
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
    backgroundColor: "#1e2d64",
  },

  distance: {
    width: screenWidth * 0.09,
  },
});
