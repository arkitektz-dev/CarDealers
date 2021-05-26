import React, { memo, useState } from "react";
import { Text } from "react-native";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { launchImageLibrary } from "react-native-image-picker";
import { Button } from "../../Component/Button/Index";
import { screenWidth } from "../../Global/Dimension";
import AppTextInput from "../../Component/TextInput/Index";
import { AddShowroomData } from "../../Data/FetchData";

const AddShowroom = ({ navigation }) => {
  const [showroomData, setShowroomData] = useState({
    name: "",
    website: "",
    city: "",
    contactInformation: "",
    email: "",
    Location: "",
    address: "",
    image: [],
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
    AddShowroomData(showroomData);
  };
  return (
    <View style={styles.parent}>
      <View
        style={{ backgroundColor: "red", flexDirection: "row", height: 49 }}
      >
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
          onChangeHandler={(e) => setShowroomData({ ...showroomData, name: e })}
          label="Name of Showroom:"
          returnKeyType="next"
        />
        <AppTextInput
          onChangeHandler={(e) =>
            setShowroomData({ ...showroomData, Location: e })
          }
          label="Location:"
          returnKeyType="next"
        />
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
          onChangeHandler={(e) =>
            setShowroomData({ ...showroomData, email: e })
          }
          label="Email:"
          returnKeyType="next"
        />
        <AppTextInput
          onChangeHandler={(e) =>
            setShowroomData({ ...showroomData, contactInformation: e })
          }
          label="Contact information:"
          returnKeyType="next"
        />
        <AppTextInput
          onChangeHandler={(e) =>
            setShowroomData({ ...showroomData, website: e })
          }
          label="Website:"
          returnKeyType="done"
        />

        <Button
          title={"Upload Images"}
          onPressHandler={setUploadImage}
          style={styles.buttonContainer}
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
    flex: 1,
    flexDirection: "column",
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
    backgroundColor: "red",
  },

  distance: {
    width: screenWidth * 0.09,
  },
});
