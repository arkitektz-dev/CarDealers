import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "../../Screens/HomeScreen/Index";
import About from "../../Screens/AboutScreen";
import HomeStack from "../HomeStack/HomeStack";

const Drawer = createDrawerNavigator();

const DrawerNav = () => {
  return (
    <Drawer.Navigator drawerPosition="right">
      <Drawer.Screen name="Home" component={HomeStack} />
      <Drawer.Screen name="Notifications" component={About} />
    </Drawer.Navigator>
  );
};
export default DrawerNav;
