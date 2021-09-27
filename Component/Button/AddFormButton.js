import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import Feather from "react-native-vector-icons/Fontisto";

const AddFormButton = ({ children, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.parent}>
      <Feather name="car" size={28} color="#fff" />
      <Text style={{color:'white',marginTop:-5,fontWeight:'bold'}}>Sell</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  parent: {
    flexDirection: "column",
    borderWidth: 1,
    borderColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: 65,
    height: 65,
    backgroundColor: "#be0e07",
    borderRadius: 50,
    bottom: 18,
  },
  child: {
    fontWeight: "bold",
    color: "#fff",
    fontSize: 16,
    top: 5,
  },
});
export default AddFormButton;
