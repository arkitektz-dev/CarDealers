import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DrawerNav from "../DrawerNav";
import { Image } from "react-native";

import ProfileStack from "../HomeStack/ProfileStack";
import LottieLoader from "../../Component/Lottie";
import { getData } from "../../Data/FetchData";

const Tab = createBottomTabNavigator();

function MyTabs() {
  const [status, setStatus] = useState();
  useEffect(() => {
    getData().then((data) => {
      setStatus(data);
    });
  });
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{ activeTintColor: "red", showLabel: false }}
    >
      <Tab.Screen
        name="Home"
        component={DrawerNav}
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              style={{ height: 25, width: 25 }}
              source={require("../../Assets/Home.png")}
            />
          ),
        }}
      />
      {status != undefined ? (
        <Tab.Screen
          name="About"
          component={ProfileStack}
          options={{
            tabBarIcon: ({ color }) => (
              <Image
                style={{ height: 25, width: 25 }}
                source={require("../../Assets/userprofile.png")}
              />
            ),
          }}
        />
      ) : (
        <Tab.Screen
          name="About"
          component={LottieLoader}
          options={{
            tabBarIcon: ({ color }) => (
              <Image
                style={{ height: 25, width: 25 }}
                source={require("../../Assets/userprofile.png")}
              />
            ),
          }}
        />
      )}
    </Tab.Navigator>
  );
}
export default MyTabs;
