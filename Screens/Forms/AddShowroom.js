import React, { memo, useState } from "react";
import { Text } from "react-native";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { launchImageLibrary } from "react-native-image-picker";
import { TextInput } from "react-native-paper";
import { Button } from "../../Component/Button/Index";
import { screenWidth } from "../../Global/Dimension";
import firestore from "@react-native-firebase/firestore";

const AddShowroom = ({ navigation }) => {
  const [showroomData, setShowroomData] = useState({
    name: "",
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
    firestore()
      .collection("Showrooms")
      .add(showroomData)
      .then(() => {
        alert("Showroom Added");
      });
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
        <TextInput
          renderToHardwareTextureAndroid
          returnKeyType="next"
          placeholderTextColor="#000"
          mode="flat"
          label="Name of Showroom:"
          underlineColor="#000"
          underlineColorAndroid="$000"
          theme={{
            colors: {
              primary: "#000",
              placeholder: "#000",
              text: "#000",
            },
          }}
          style={{
            backgroundColor: "transparent",
            color: "#000",
          }}
          onChangeText={(e) => setShowroomData({ ...showroomData, name: e })}
        />
        <TextInput
          renderToHardwareTextureAndroid
          returnKeyType="next"
          placeholderTextColor="#000"
          mode="flat"
          label="Location:"
          underlineColor="#000"
          underlineColorAndroid="$000"
          theme={{
            colors: {
              primary: "#000",
              placeholder: "#000",
              text: "#000",
            },
          }}
          style={{
            backgroundColor: "transparent",
            color: "#000",
          }}
          onChangeText={(e) =>
            setShowroomData({ ...showroomData, Location: e })
          }
        />
        <TextInput
          renderToHardwareTextureAndroid
          returnKeyType="next"
          placeholderTextColor="#000"
          mode="flat"
          label="Address:"
          underlineColor="#000"
          underlineColorAndroid="$000"
          theme={{
            colors: {
              primary: "#000",
              placeholder: "#000",
              text: "#000",
            },
          }}
          style={{
            backgroundColor: "transparent",
            color: "#000",
          }}
          onChangeText={(e) => setShowroomData({ ...showroomData, address: e })}
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
