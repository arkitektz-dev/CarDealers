import React from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import About from "../../Screens/AboutScreen";
import DrawerNav from "../DrawerNav";
import {Image} from "react-native";
import {StyleSheet} from "react-native";
import ListingDealer from "../../Screens/Dealer/Listing";
import DealerDetailScreen from "../../Screens/Dealer/Detail";
import BottomDealerDetailScreen from "../../Screens/ListingsScreen";

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
        component={BottomDealerDetailScreen}
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
