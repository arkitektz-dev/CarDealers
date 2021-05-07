import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../../Screens/HomeScreen/Index";
import CarStack from "./CarStack";
import ShowroomStack from "./ShowroomStack";
import DealerStack from "./DealerStack";
import DetailCarScreen from "../../Screens/Car/Details";
import ShowroomDetailScreen from "../../Screens/Showroom/Details";
import DealerDetailScreen from "../../Screens/Dealer/Detail";
import ListingDealer from "../../Screens/Dealer/Listing";
import CarScreen from "../../Screens/Car";
import ProfileStack from "./ProfileStack";

const HomeStack = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CarStack"
        component={CarStack}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="ShowroomDetailScreen"
        component={ShowroomDetailScreen}
      />
      <Stack.Screen
        name="ShowroomStack"
        component={ShowroomStack}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DealerStack"
        component={DealerStack}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DetailCarScreen"
        component={DetailCarScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DealerDetailScreen"
        component={DealerDetailScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ListingDealer"
        component={ListingDealer}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ListCarScreen"
        component={CarScreen}
        options={{ headerTitleAlign: "center", title: "Car" }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileStack}
        options={{ headerShown: false }}
        />
    </Stack.Navigator>
  );
};
export default HomeStack;
