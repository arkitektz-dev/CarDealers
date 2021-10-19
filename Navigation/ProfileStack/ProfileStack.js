import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MyAds from "../../Screens/MyAd/Listing";
import DetailCarScreen from "../../Screens/MyAd/Details";
import ShowroomDetailScreen from "../../Screens/Showroom/Details";
import ShowroomDealerProfile from "../../Screens/Showroom/DealerProfile";
import GeneralAdScreen from "../../Screens/GeneralAdScreen/index";
import BottomProfileScreen from "../../Screens/BottomProfileScreen";
import ShowroomScreen from "../../Screens/GeneralShowroomScreen/index";
import GeneralDealerScreen from "../../Screens/GeneralDealerScreen/index";
import DealerDetailScreen from "../../Screens/Dealer/Detail";

const BottomProfileScreenStack = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="BottomProfileScreen"
        component={BottomProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MyAds"
        component={MyAds}
        options={{
          headerShown: false,
          headerTitleAlign: "center",
          title: "Car",
        }}
      />

      <Stack.Screen
        name="DetailCarScreen"
        component={DetailCarScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ShowroomDetailScreen"
        component={ShowroomDetailScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ShowroomDealerProfile"
        component={ShowroomDealerProfile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ShowroomScreen"
        component={ShowroomScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="GeneralAdScreen"
        component={GeneralAdScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="GeneralDealerScreen"
        component={GeneralDealerScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DealerDetailScreen"
        component={DealerDetailScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
export default BottomProfileScreenStack;
