import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { StyleSheet, Platform, StatusBar, Text, View } from "react-native";
import LoginStack from "./Navigation/LoginStack/Login";
import firebase from "firebase";
import NetInfo from "@react-native-community/netinfo";
import { SafeAreaProvider } from "react-native-safe-area-context";
import MyTabs from "./Navigation/BottomTab/Index";
import { Alert } from "react-native";
import OfflineNotice from "./Component/Offline";

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

function App() {
  const [connectionStatus, setConnectionStatus] = useState(true);
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

  const CheckConnectivity = () => {
    if (Platform.OS === "android") {
      NetInfo.fetch().then((isConnected) => {
        setConnectionStatus(isConnected.isConnected);
      });
    } else {
      NetInfo.isConnected.addEventListener(
        "connectionChange",
        handleFirstConnectivityChange
      );
    }
  };
  useEffect(() => {
    CheckConnectivity();
  }, []);

  // const handleFirstConnectivityChange = (isConnected) => {
  //   NetInfo.isConnected.removeEventListener(
  //     "connectionChange",
  //     this.handleFirstConnectivityChange
  //   );

  //   if (isConnected === false) {
  //     Alert.alert("You are offline!");
  //   } else {
  //     Alert.alert("You are online!");
  //   }
  // };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  return (
    <SafeAreaProvider>
      <StatusBar hidden />

      <NavigationContainer>
        <Text
          style={{
            fontSize: 18,
            textAlign: "center",
            fontWeight: "bold",
            color: "white",
          }}
        >
          {connectionStatus ? null : "Offline"}
        </Text>

        <MainStack />
      </NavigationContainer>
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
