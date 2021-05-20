import AsyncStorage from "@react-native-async-storage/async-storage";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import IndexReducer from "./Redux/Reducer/Index";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
// import HomeStack from "./Navigation/HomeStack/Home";
import LoginStack from "./Navigation/LoginStack/Login";
import firebase from "firebase";
import { SafeAreaProvider } from "react-native-safe-area-context";
import MyTabs from "./Navigation/BottomTab/Index";
import LottieLoader from "./Screens/Lottie";
import AppPicker from "./Component/Picker/Index";

const MainStack = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Home"
    >
      <Stack.Screen name="Login" component={LoginStack} />
      <Stack.Screen name="Home" component={MyTabs} />
    </Stack.Navigator>
  );
};

export default function App() {
  const store = createStore(IndexReducer, compose(applyMiddleware(thunk)));

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

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        {/* <NavigationContainer>
          <MainStack />
        </NavigationContainer> */}
        <AppPicker />
      </SafeAreaProvider>
    </Provider>
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
