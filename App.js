import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useState } from "react";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import HomeStack from "./Navigation/HomeStack/Home";
import LoginStack from "./Navigation/LoginStack/Login";
import firebase from "firebase";
const MainStack = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Login"
    >
      <Stack.Screen name="Login" component={LoginStack} />
      <Stack.Screen name="Home" component={HomeStack} />
    </Stack.Navigator>
  );
};

export default function App() {
  var firebaseConfig = {
    apiKey: "AIzaSyBNXgxKzRo4EUHHHRNiyPyQTC5kbt6_BHw",
    authDomain: "cardealer-41e38.firebaseapp.com",
    databaseURL: "https://cardealer-41e38-default-rtdb.firebaseio.com",
    projectId: "cardealer-41e38",
    storageBucket: "cardealer-41e38.appspot.com",
    messagingSenderId: "161859702626",
    appId: "1:161859702626:web:6450930824e4b62a52e63b",
    measurementId: "G-E240F5VSHS",
  };
  let user;
  useEffect(() => {
    getUser();
  });
  const getUser = async () => {
    user = await AsyncStorage.getItem("user");
    console.log(user);
  };
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
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
