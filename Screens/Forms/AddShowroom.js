import React, { memo, useState } from "react";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { TextInput } from "react-native-paper";
import { Button } from "../../Component/Button/Index";
import { screenWidth } from "../../Global/Dimension";
const AddShowroom = () => {
  const [showroomData, setShowroomData] = useState({
    name: "",
    Location: "",
  });
  return (
    <View style={styles.parent}>
      <View style={styles.searchHolder}>
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
        <View style={styles.distance}></View>

        <TouchableOpacity
          onPress={() => navigation.navigate("AddCar")}
          style={{
            right: 75,
            top: 10,
            backgroundColor: "#fff",
            width: 35,
            height: 35,
            borderRadius: 35 / 2,
          }}
        ></TouchableOpacity>
      </View>
      <View style={styles.form}>
        <TextInput
          renderToHardwareTextureAndroid
          returnKeyType="next"
          placeholderTextColor="#000"
          mode="flat"
          label="Username:"
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

        <Button
          title={"Upload Images"}
          onPressHandler={() => alert("Okat")}
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
    alignItems: "center",
  },
  form: {
    justifyContent: "center",
    width: screenWidth * 0.7,
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
  searchHolder: {
    backgroundColor: "red",
    flexDirection: "row",
    flex: 1,
  },
  distance: {
    width: screenWidth * 0.09,
  },
});
