import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DealerScreen from "../../Screens/Dealer";
import ListingDealer from "../../Screens/Dealer/Listing";
import GeneralAdScreen from "../../Screens/GeneralAdScreen/index";
import ShowroomScreen from "../../Screens/GeneralShowroomScreen/index";

const DealerStack = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ListingDealer"
        component={ListingDealer}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="GeneralAdScreen"
        component={GeneralAdScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ShowroomScreen"
        component={ShowroomScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen name="DealerScreen" component={DealerScreen} />
    </Stack.Navigator>
  );
};
export default DealerStack;
