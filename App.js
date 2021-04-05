import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useState } from "react";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import HomeStack from "./Navigation/HomeStack/Home";
import LoginStack from "./Navigation/LoginStack/Login";

import HomeScreen from "./Screens/HomeScreen/Index";
import { LoginScreen } from "./Screens/LoginScreen/Index";

const MainStack = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginStack} />
      <Stack.Screen name="Home" component={HomeStack} />
    </Stack.Navigator>
  );
};

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
      <MainStack />
    </NavigationContainer>
  );
  // user ? (
  //   <NavigationContainer>
  //     <LoginScreen />
  //   </NavigationContainer>
  // ) : (
  //   <NavigationContainer>
  //     <HomeScreen />
  //   </NavigationContainer>
  // );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
