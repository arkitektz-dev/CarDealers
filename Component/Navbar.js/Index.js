import React from "react";
import { Text, View, TouchableOpacity } from "react-native";

const Navbar = ({ Title, goBack }) => {
  return (
    <View
      style={{
        backgroundColor: "red",
        flexDirection: "row",
        justifyContent: "space-between",
        height: 49,
      }}
    >
      <TouchableOpacity
        onPress={goBack}
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
          {Title}
        </Text>
      </View>
    </View>
  );
};
export default Navbar;
