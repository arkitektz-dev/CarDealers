import React from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import About from "../../Screens/AboutScreen";
import DrawerNav from "../DrawerNav";
import {Image} from "react-native";
import {StyleSheet} from "react-native";

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{activeTintColor: "red", showLabel: false}}
    >
      <Tab.Screen
        name="Home"
        component={DrawerNav}
        options={{
          tabBarIcon: ({color}) => (
            <Image
              style={{height: 25, width: 25}}
              source={require("../../Assets/Home.png")}
            />
          ),
        }}
      />
      <Tab.Screen
        name="About"
        component={About}
        options={{
          tabBarIcon: ({color}) => (
            <Image
              style={{height: 25, width: 25}}
              source={require("../../Assets/Compass.png")}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
export default MyTabs;
