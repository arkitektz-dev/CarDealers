import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { StyleSheet, Platform, StatusBar, Text, View } from "react-native";
import LoginStack from "./Navigation/LoginStack/Login";
import firebase from "firebase";
import { SafeAreaProvider } from "react-native-safe-area-context";
import MyTabs from "./Navigation/BottomTab/Index";
import AuthContext from "./Component/Authcontext";
import { SignupScreen } from "./Screens/SignUp";
import ImageScreen from "./Screens/ImageScreen";

import { NativeBaseProvider, extendTheme } from 'native-base';
const theme = extendTheme({
  components: {
      Toast: {
          baseStyle: {},
          defaultProps: {},
          variants: {},
          sizes: {},
          
      }
  } 
});
console.disableYellowBox = true;
const MainStack = () => {
  const Stack = createStackNavigator();

  return (
    <NativeBaseProvider theme={theme}>
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Home"
    >
      <Stack.Screen name="Login" component={LoginStack} />
      <Stack.Screen name="Home" component={MyTabs} />
    </Stack.Navigator>
    </NativeBaseProvider>
  );
};

function App() {
  const [connectionStatus, setConnectionStatus] = useState(true);
  const [user, setUser] = useState();

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
    <SafeAreaProvider>
      <AuthContext.Provider value={{ user, setUser }}>
        <StatusBar hidden />
        <NavigationContainer>
          <MainStack />
        </NavigationContainer>
      </AuthContext.Provider>
    </SafeAreaProvider>
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
export default App;
