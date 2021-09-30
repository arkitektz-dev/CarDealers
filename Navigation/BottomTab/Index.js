import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DrawerNav from "../DrawerNav";

import ProfileStack from "../HomeStack/ProfileStack";
import LottieLoader from "../../Component/Lottie";
import { getData } from "../../Data/FetchData";
import DealerStack from "../HomeStack/DealerStack";
import IonIcon from "react-native-vector-icons/Ionicons";
import Newcar from "../../Assets/NewAsset/newcar.png";
import AddCar from "../../Screens/Forms/AddCar";
import Fontisto from "react-native-vector-icons/Fontisto";
import Entypo from "react-native-vector-icons/Entypo";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import AddFormButton from "../../Component/Button/AddFormButton";
import Showroom from "../../Screens/Showroom";
import { Image } from "react-native";
import { StyleSheet } from "react-native";
import ShowroomStack from "../HomeStack/ShowroomStack";
import BottomProfileScreenStack from "../ProfileStack/ProfileStack";
import MyAdStack from "../MyAdStack/MyAdStack";
import DemandTabs from "../TopTab";
import AddTabs from "../../Component/AddTabs";

const Tab = createBottomTabNavigator();

function MyTabs() {
  const [status, setStatus] = useState();
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    getData().then((data) => {
      setStatus(data);
    });
  });
  return (
    <Tab.Navigator
      initialRouteName="Home"
      detachInactiveScreens={true}
      screenOptions={{ unmountOnBlur: true }}
      // tabBarOptions={{
      //   elevation: 2,
      //   activeTintColor: "#1c2e65",
      //   inactiveTintColor: "grey",
      //   showLabel: true,
      // }}
      tabBarOptions={{
        tabBarBadgeStyle: {
          backgroundColor: "white",
          height: 12,
          minWidth: 12,
          borderRadius: 6,
        },
        showIcon: true,
        showLabel: true,
        activeTintColor: "#1c2e65",
        inactiveTintColor: "grey",
        style: {
          backgroundColor: "white",
          bottom: 0,

          width: "100%",
          height: 60,
          zIndex: 8,
          borderTopColor: "#35832D",
          borderTopWidth: 0,
        },
        labelStyle: {
          fontSize: 13,
          marginTop: -10,
          marginBottom: 5,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={DrawerNav}
        options={{
          tabBarIcon: ({ color }) => (
            <IonIcon name="home-outline" color={color} size={28} />
          ),
        }}
      />

      <Tab.Screen
        name="Showroom"
        component={ShowroomStack}
        options={{
          tabBarIcon: ({ color }) => (
            <Fontisto name="shopping-store" size={24} color={color} />
          ),
        }}
      />

      {status != undefined ? (
        <Tab.Screen
          name="AddCarButton"
          component={AddTabs}
          options={{
            tabBarButton: (props) => <AddFormButton {...props} />,
          }}
        />
      ) : (
        <Tab.Screen
          name="AddCarButton"
          component={LottieLoader}
          options={{
            tabBarButton: (props) => <AddFormButton {...props} />,
          }}
        />
      )}
      {status != undefined ? (
        <Tab.Screen
          name="My Ads."
          component={MyAdStack}
          options={{
            tabBarIcon: ({ color }) => (
              <Entypo name="news" size={28} color={color} />
            ),
          }}
        />
      ) : (
        <Tab.Screen
          name="My Ads."
          component={LottieLoader}
          options={{
            tabBarIcon: ({ color }) => (
              <Entypo name="news" size={28} color={color} />
            ),
          }}
        />
      )}
      {status != undefined ? (
        <Tab.Screen
          name="Profile"
          component={BottomProfileScreenStack}
          options={{
            tabBarIcon: ({ color }) => (
              <FontAwesome5 name="user-circle" size={26} color={color} />
            ),
          }}
        />
      ) : (
        <Tab.Screen
          name="Profile"
          component={LottieLoader}
          options={{
            tabBarIcon: ({ color }) => (
              <FontAwesome5 name="user-circle" size={26} color={color} />
            ),
          }}
        />
      )}
    </Tab.Navigator>
  );
}
export default MyTabs;
const styles = StyleSheet.create({
  image: { width: 28, height: 28, resizeMode: "contain" },
});
