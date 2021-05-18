import React from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import DrawerNav from "../DrawerNav";
import {Image} from "react-native";

import ProfileStack from "../HomeStack/ProfileStack";

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
        component={ProfileStack}
        options={{
          tabBarIcon: ({color}) => (
            <Image
              style={{height: 25, width: 25}}
              source={require("../../Assets/userprofile.png")}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
export default MyTabs;
