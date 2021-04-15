import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import firebase from "firebase";
import auth from "@react-native-firebase/auth";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  StatusBar,
  Text,
  TextInput,
  View,
  Button,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Searchbar } from "react-native-paper";
// import { Button } from "../../Component/Button/Index";
import Card from "../../Component/CardComponent/Card";
import CategoryCard from "../../Component/CardComponent/CategoryCard";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [confirm, setConfirm] = useState(null);

  const [code, setCode] = useState("");
  //const Logout = async () => {
  // try {
  //   const val = await AsyncStorage.removeItem("user");
  //   navigation.navigate("LoginScreen");
  // } catch (error) {
  //   console.log(error);
  // }
  async function signInWithPhoneNumber(phoneNumber) {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    setConfirm(confirmation);
  }
  async function confirmCode() {
    try {
      await confirm.confirm(code);
    } catch (error) {
      console.log("Invalid code.");
    }
  }
  if (!confirm) {
    return (
      <View>
        <Button
          title="Phone Number Sign In"
          onPress={() => signInWithPhoneNumber("+923070211892")}
        />
      </View>
    );
  }

  return (
    // <View
    //   style={{
    //     justifyContent: "center",
    //     flexDirection: "column",
    //   }}
    // >
    //   <View
    //     style={{
    //       flexDirection: "row",
    //       justifyContent: "center",
    //     }}
    //   >
    //     <Searchbar style={{ width: "80%", borderRadius: 20 }} />
    //   </View>
    //   <View
    //     style={{
    //       flexDirection: "row",
    //       justifyContent: "center",
    //       backgroundColor: "black",
    //     }}
    //   >
    //     <CategoryCard />
    //   </View>
    //   <Card />

    //   <Button title="Logout" onLogin={Logout} />
    // </View>
    <View>
      <TextInput value={code} onChangeText={(text) => setCode(text)} />
      <Button title="Confirm Code" onPress={() => confirmCode()} />
    </View>
  );
};
export default HomeScreen;
