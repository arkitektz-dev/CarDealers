import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import React, { useState } from "react";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import IndexStack from "./Navigation/HomeStack/Index";
import LoginIndexStack from "./Navigation/LoginStack/Index";

export default function App() {
  let user;
  useEffect(() => {
    getUser();
  });
  const getUser = async () => {
    user = await AsyncStorage.getItem("user");
    console.log(user);
  };
  return (
    <NavigationContainer>
      {user == null ? <LoginIndexStack /> : <IndexStack />}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
