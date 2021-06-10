import React from "react";
import { View } from "react-native";
import { Header } from "react-native-elements";
const NavHome = ({ leftComponent, centerComponent }) => {
  return (
    <View style={{ flexDirection: "column", backgroundColor: "white" }}>
      <Header
        containerStyle={{ backgroundColor: "#1c2e65", height: 80 }}
        leftComponent={leftComponent}
        centerComponent={centerComponent}
      />
    </View>
  );
};
export default NavHome;
