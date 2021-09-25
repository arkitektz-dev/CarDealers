import React, { useContext, useEffect, useState } from "react";
import {
  createDrawerNavigator,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import FontAwsome5 from "react-native-vector-icons/FontAwesome5";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

import HomeStack from "../HomeStack/HomeStack";
import { Image, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/core";

import { screenHeight, screenWidth } from "../../Global/Dimension";
import ProfileStack from "../HomeStack/ProfileStack";
import AddShowroom from "../../Screens/Forms/AddShowroom";
import AddCar from "../../Screens/Forms/AddCar";
import { clearStorage, getData } from "../../Data/FetchData";
import LottieLoader from "../../Component/Lottie";
import Listing from "../../Screens/MyAd/Listing";
import MyDemand from "../../Screens/MyDemands/index";
import AuthContext from "../../Component/Authcontext";
const Drawer = createDrawerNavigator();
var status = [];
function CustomDrawerContent(props) {
  const navigation = useNavigation();
  const authContext = useContext(AuthContext);
  useEffect(() => {
    getData().then((data) => {
      status = data;
    });
  });

  const onPressHandler = async () => {
    clearStorage();
    authContext.setUser(undefined);
    navigation.replace("Login");
  };
  return (
    <>
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "white",
          justifyContent: "space-around",
          alignItems: "center",
          height: screenHeight * 0.2,
        }}
      >
        <Image
          source={require("../../Assets/NewAsset/DrawerLogo.png")}
          style={styles.image}
        />
      </View>
      <DrawerItemList {...props} />
      {status != undefined ? (
        <DrawerItem
          label="Sign Out"
          onPress={onPressHandler}
          icon={({ color, focused }) => (
            <MaterialIcons name="login" color={color} size={29} />
          )}
        />
      ) : (
        <DrawerItem
          icon={({ color, focused }) => (
            <MaterialIcons name="login" color={color} size={29} />
          )}
          label="Sign In"
          onPress={() => {
            navigation.navigate("Login");
          }}
        />
      )}
    </>
  );
}

const DrawerNav = ({ route }) => {
  return (
    <Drawer.Navigator
      drawerStyle={styles.drawe}
      drawerPosition="left"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      {status != undefined ? (
        <>
          <Drawer.Screen
            name="Home"
            component={HomeStack}
            options={{
              drawerIcon: ({ color, focused }) => (
                <FontAwsome5 name="car" color={color} size={29} />
              ),
            }}
          />
          <Drawer.Screen
            name="Profile"
            component={ProfileStack}
            options={{
              drawerIcon: ({ color, focused }) => (
                <FontAwsome5 name="user-alt" color={color} size={29} />
              ),
            }}
          />
          <Drawer.Screen
            name="Add Showroom"
            component={AddShowroom}
            options={{
              drawerIcon: ({ color, focused }) => (
                <FontAwsome5 name="building" color={color} size={29} />
              ),
            }}
          />
          {/* <Drawer.Screen
            name="Post An Add"
            component={AddCar}
            options={{
              drawerIcon: ({ color, focused }) => (
                <MaterialIcons name="post-add" color={color} size={29} />
              ),
            }}
          /> */}
          <Drawer.Screen
            name="My Ads"
            component={Listing}
            options={{
              drawerIcon: ({ color, focused }) => (
                <FontAwesome5 name="ad" color={color} size={29} />
              ),
            }}
          />
          <Drawer.Screen
            name="My Demands"
            component={MyDemand}
            options={{
              drawerIcon: ({ color, focused }) => (
                <FontAwesome5 name="cubes" color={color} size={29} />
              ),
            }}
          />
        </>
      ) : (
        <>
          <Drawer.Screen
            name="Home"
            component={HomeStack}
            options={{
              drawerIcon: ({ color, focused }) => (
                <FontAwsome5 name="car" color={color} size={29} />
              ),
            }}
          />
          <Drawer.Screen
            name="Profile"
            component={LottieLoader}
            options={{
              drawerIcon: ({ color, focused }) => (
                <FontAwsome5 name="user-alt" color={color} size={29} />
              ),
            }}
          />
          <Drawer.Screen
            name="Add Showroom"
            component={LottieLoader}
            options={{
              drawerIcon: ({ color, focused }) => (
                <FontAwsome5 name="building" color={color} size={29} />
              ),
            }}
          />
          <Drawer.Screen
            name="Add Car"
            component={LottieLoader}
            options={{
              drawerIcon: ({ color, focused }) => (
                <MaterialIcons name="post-add" color={color} size={29} />
              ),
            }}
          />
        </>
      )}
    </Drawer.Navigator>
  );
};
export default DrawerNav;

const styles = StyleSheet.create({
  image: {
    width: 250,
    resizeMode: "contain",
  },

  userInfoSection: {
    margin: 0,
    paddingTop: 80,
    paddingLeft: 20,
    alignItems: "center",
    backgroundColor: "red",
  },
  title: {
    color: "#fff",
    fontWeight: "bold",
  },
  caption: {
    color: "#fff",
    fontSize: 14,
    lineHeight: 14,
    paddingBottom: 20,
  },
  row: {
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  icon: { width: 25, height: 25, resizeMode: "contain" },

  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
