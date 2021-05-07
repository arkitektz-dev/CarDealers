import * as React from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import HomeScreen from "../../Screens/HomeScreen/Index";
import About from "../../Screens/AboutScreen";
import HomeStack from "../HomeStack/HomeStack";
import {Header} from "@react-navigation/stack";
import {Dimensions, Image, StyleSheet, View} from "react-native";
import {Avatar, Caption, Title} from "react-native-paper";
import {useNavigation} from "@react-navigation/core";
import Profile from "../../Screens/DrawerScreen/Profile";
import ProfileStack from "../HomeStack/ProfileStack";

const Drawer = createDrawerNavigator();

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

function CustomDrawerContent(props) {
  const navigation = useNavigation();
  return (
    <>
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "red",
          justifyContent: "space-around",
          alignItems: "center",
          height: screenHeight * 0.3,
        }}
      >
        <Image
          source={require("../../Assets/RedProfileLogo.png")}
          style={styles.image}
        />
        <View>
          <Title style={styles.title}> Ijaz Hussain</Title>
          <Caption style={styles.caption}> @ijazhussain</Caption>
        </View>
      </View>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Sign Out"
        onPress={() => navigation.navigate("Login")}
      />
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
    </Drawer.Navigator>
  );
};
export default DrawerNav;

const styles = StyleSheet.create({
  image: {
    width: screenWidth * 0.3,
    resizeMode: "contain",
    left: "10%",
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
