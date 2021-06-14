import React from "react";
import { Image } from "react-native";
import { Text, View, TouchableOpacity } from "react-native";

const Navbar = ({ Title, goBack, style, source, backStyle }) => {
  return (
    <View style={style}>
      <TouchableOpacity onPress={goBack}>
        <Image source={source} style={backStyle} />
      </TouchableOpacity>

      <Text
        style={{
          color: "#000000",
          fontSize: 15,
          fontWeight: "900",
          textAlignVertical: "center",
        }}
      >
        {Title}
      </Text>
    </View>
  );
};
export default Navbar;
