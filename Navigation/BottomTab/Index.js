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
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Entypo from "react-native-vector-icons/Entypo";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import AddFormButton from "../../Component/Button/AddFormButton";
import Showroom from "../../Screens/Showroom";
import { Image } from "react-native";
import { StyleSheet } from "react-native";
import ShowroomStack from "../HomeStack/ShowroomStack";
import Dealer from "../../Screens/Dealer";
import DemandCarlisting from "../../Screens/DemandCarlisting";

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
      tabBarOptions={{
        elevation: 2,
        activeTintColor: "#1c2e65",
        inactiveTintColor: "grey",
        showLabel: false,
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
            <IonIcon name="search-outline" size={26} color={color} />
          ),
        }}
      />

      {status != undefined ? (
        <Tab.Screen
          name="AddCarButton"
          component={DemandCarlisting}
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

      <Tab.Screen
        name="Dealer"
        component={Dealer}
        options={{
          tabBarIcon: ({ color }) => (
            <Entypo name="news" size={28} color={color} />
          ),
        }}
      />
      {status != undefined ? (
        <Tab.Screen
          name="About"
          component={ProfileStack}
          options={{
            tabBarIcon: ({ color }) => (
              <FontAwesome5 name="user-circle" size={26} color={color} />
            ),
          }}
        />
      ) : (
        <Tab.Screen
          name="About"
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
