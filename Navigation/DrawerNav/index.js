import React, { useEffect, useState } from "react";
import {
  createDrawerNavigator,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";

import HomeStack from "../HomeStack/HomeStack";
import { Image, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/core";

import { screenHeight, screenWidth } from "../../Global/Dimension";
import ProfileStack from "../HomeStack/ProfileStack";
import AddShowroom from "../../Screens/Forms/AddShowroom";
import AddCar from "../../Screens/Forms/AddCar";
import { clearStorage, getData } from "../../Data/FetchData";

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  const [status, setStatus] = useState();
  const navigation = useNavigation();
  useEffect(() => {
    getData().then((data) => {
      setStatus(data);
    });
  });

  const onPressHandler = async () => {
    clearStorage();
    navigation.replace("Login");
  };
  return (
    <>
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "black",
          justifyContent: "space-around",
          alignItems: "center",
          height: screenHeight * 0.2,
        }}
      >
        <Image
          source={require("../../Assets/AppLogo.png")}
          style={styles.image}
        />
        {/* <View>
          <Title style={styles.title}> Ijaz Hussain</Title>
          <Caption style={styles.caption}> @ijazhussain</Caption>
        </View> */}
      </View>
      <DrawerItemList {...props} />
      {status != undefined ? (
        <DrawerItem label="Sign Out" onPress={onPressHandler} />
      ) : (
        <DrawerItem
          label="Sign In"
          onPress={() => {
            navigation.navigate("Login");
          }}
        />
      )}
    </>
  );
}

const DrawerNav = () => {
  return (
    <Drawer.Navigator
      drawerStyle={styles.drawe}
      drawerPosition="right"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Home" component={HomeStack} />
      <Drawer.Screen name="Profile" component={ProfileStack} />
      <Drawer.Screen name="Add Showroom" component={AddShowroom} />
      <Drawer.Screen name="Add Car" component={AddCar} />
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
